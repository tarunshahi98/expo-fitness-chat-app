import {
  chatRepo,
  contactRepo,
  userRepo,
} from "@/repository";
import { compareContactsByRecentMessage } from "@/repository/contactRepository";
import type {
  Contact,
  ConversationDoc,
  UseContactsListResult,
  UserProfile,
} from "@/types";
import { formatTime, getTimestampMs } from "@/utils/date";
import { devLog } from "@/utils/platform";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function useContactsList(): UseContactsListResult {
  const { user } = useAuth();
  const [firestoreProfiles, setFirestoreProfiles] = useState<UserProfile[]>([]);
  const [conversationsMap, setConversationsMap] = useState<
    Record<string, ConversationDoc>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  // 1. Subscribe to real-time Firestore users collection
  useEffect(() => {
    if (!user?.uid) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const unsub = userRepo.subscribeToAllUsers(
      (profiles) => {
        setFirestoreProfiles(profiles);
        setIsLoading(false);
      },
      (err) => {
        devLog("Firestore users subscription notice:", err);
        setIsLoading(false);
      },
    );

    return () => {
      unsub();
      setFirestoreProfiles([]);
    };
  }, [user?.uid]);

  // 2. Subscribe to real-time user conversations
  useEffect(() => {
    if (!user?.uid) return;

    const unsub = chatRepo.subscribeToUserConversations(
      user.uid,
      (conversations) => {
        const map: Record<string, ConversationDoc> = {};
        conversations.forEach((conv) => {
          map[conv.id] = conv;
          const otherUid = conv.participants?.find((p) => p !== user.uid);
          if (otherUid) map[otherUid] = conv;
        });
        setConversationsMap(map);
      },
      (err) => console.error("User conversations subscription error:", err),
    );

    return () => {
      unsub();
      setConversationsMap({});
    };
  }, [user?.uid]);

  // 3. Filter out self and convert UserProfiles into Contacts
  const rawMergedContacts = useMemo(() => {
    return contactRepo.filterAndMergeContacts(
      firestoreProfiles,
      user?.uid,
    );
  }, [firestoreProfiles, user?.uid]);

  // 5. Decorate a single contact with conversation metadata
  const decorateContact = useCallback(
    (contact: Contact, currentUid: string): Contact => {
      const targetUid = contact.uid;
      const conversationId =
        targetUid && currentUid
          ? chatRepo.getConversationId(currentUid, targetUid)
          : "";
      const conv =
        (conversationId ? conversationsMap[conversationId] : undefined) ||
        (contact.uid ? conversationsMap[contact.uid] : undefined);

      const timestampMs = conv?.updatedAt
        ? getTimestampMs(conv.updatedAt)
        : conv?.lastMessageTimestamp
          ? getTimestampMs(conv.lastMessageTimestamp)
          : 0;

      return {
        ...contact,
        lastMessage: conv?.lastMessage || contact.lastMessage,
        time:
          timestampMs > 0
            ? formatTime(timestampMs, contact.time)
            : contact.time,
        unread:
          currentUid && conv?.unreadCounts?.[currentUid]
            ? conv.unreadCounts[currentUid]
            : 0,
        timestampMs,
      };
    },
    [conversationsMap],
  );

  // 6. All contacts decorated with conversation metadata
  const allContacts = useMemo(() => {
    const currentUid = user?.uid || "user-active";
    return rawMergedContacts.map((c) => decorateContact(c, currentUid));
  }, [rawMergedContacts, decorateContact, user?.uid]);

  // 7. Active conversations (only contacts with at least 1 message exchanged), sorted desc
  const activeConversations = useMemo(() => {
    const currentUid = user?.uid || "user-active";

    return rawMergedContacts
      .filter((contact) => {
        const targetUid = contact.uid;
        if (!targetUid) return false;
        const conversationId = chatRepo.getConversationId(
          currentUid,
          targetUid,
        );
        const conv =
          (conversationId ? conversationsMap[conversationId] : undefined) ||
          conversationsMap[targetUid];
        return Boolean(conv && conv.lastMessage);
      })
      .map((c) => decorateContact(c, currentUid))
      .sort(compareContactsByRecentMessage);
  }, [rawMergedContacts, conversationsMap, decorateContact, user?.uid]);

  // 8. Search contacts function
  const searchContacts = useCallback(
    (query: string): Contact[] => {
      if (!query.trim()) return [];
      const matches = contactRepo.searchContacts(rawMergedContacts, query);
      const currentUid = user?.uid || "user-active";
      return matches
        .map((c) => decorateContact(c, currentUid))
        .sort(compareContactsByRecentMessage);
    },
    [rawMergedContacts, decorateContact, user?.uid],
  );

  const unreadConversationsCount = useMemo(
    () => activeConversations.filter((c) => c.unread > 0).length,
    [activeConversations],
  );

  return {
    allContacts,
    activeConversations,
    searchContacts,
    unreadConversationsCount,
    conversationsMap,
    isLoading,
  };
}
