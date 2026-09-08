import {
  collection,
  query,
  where,
  orderBy,
  limitToLast,
  onSnapshot,
  doc,
  setDoc,
  getDocs,
  writeBatch,
  serverTimestamp,
  increment,
  type FieldValue,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { devLog } from "@/utils/platform";
import type { Message, ConversationDoc, FirestoreMessage } from "@/types";
import { formatTime, getTimestampMs } from "@/utils/date";

function toAppMessage(
  id: string,
  data: FirestoreMessage,
  currentUserId: string,
): Message {
  const timestampMs = getTimestampMs(data.createdAt);
  return {
    id,
    text: data.text,
    sent: data.senderId === currentUserId,
    time: formatTime(timestampMs),
    read: data.read,
    timestampMs,
  };
}

export const chatRepo = {
  subscribe(
    conversationId: string,
    currentUserId: string,
    onUpdate: (messages: Message[]) => void,
    onError: (err: Error) => void,
    limitCount = 50,
  ): () => void {
    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt", "asc"),
      limitToLast(limitCount),
    );

    return onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const messages = snapshot.docs.map((d) =>
          toAppMessage(d.id, d.data() as FirestoreMessage, currentUserId),
        );
        onUpdate(messages);
      },
      (err) => {
        console.error("chatRepo snapshot error:", err);
        onError(err);
      },
    );
  },

  /**
   * Subscribes to all conversations where the given user is a participant.
   */
  subscribeToUserConversations(
    userId: string,
    onUpdate: (conversations: ConversationDoc[]) => void,
    onError?: (err: Error) => void,
  ): () => void {
    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", userId),
    );

    return onSnapshot(
      q,
      (snapshot) => {
        onUpdate(
          snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...(docSnap.data() as Omit<ConversationDoc, "id">),
          })),
        );
      },
      (err) => {
        console.error("subscribeToUserConversations error:", err);
        onError?.(err);
      },
    );
  },

  /**
   * Resets the unread count for the current user on the specified conversation document.
   */
  async markConversationAsRead(
    conversationId: string,
    currentUserId: string,
  ): Promise<void> {
    if (!conversationId || !currentUserId) return;
    try {
      const convRef = doc(db, "conversations", conversationId);
      await setDoc(
        convRef,
        { unreadCounts: { [currentUserId]: 0 } },
        { merge: true },
      );
    } catch (error) {
      devLog("markConversationAsRead notice:", error);
    }
  },

  async sendMessage(
    conversationId: string,
    currentUserId: string,
    text: string,
  ): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed) throw new Error("Cannot send an empty message.");
    if (!conversationId || !currentUserId) {
      throw new Error("Invalid conversation or user state.");
    }

    const batch = writeBatch(db);
    const convRef = doc(db, "conversations", conversationId);
    const newMessageDoc = doc(
      collection(db, "conversations", conversationId, "messages"),
    );

    batch.set(newMessageDoc, {
      text: trimmed,
      senderId: currentUserId,
      read: false,
      createdAt: serverTimestamp(),
    });

    const participants = conversationId.split("_");
    const otherParticipants = participants.filter((p) => p !== currentUserId);
    const unreadMap: Record<string, FieldValue | number> = {
      [currentUserId]: 0,
    };
    otherParticipants.forEach((id) => {
      unreadMap[id] = increment(1);
    });

    batch.set(
      convRef,
      {
        participants,
        lastMessage: trimmed,
        lastMessageSenderId: currentUserId,
        lastMessageTimestamp: serverTimestamp(),
        updatedAt: serverTimestamp(),
        totalMessages: increment(1),
        unreadCounts: unreadMap,
      },
      { merge: true },
    );

    await batch.commit();
  },

  async deleteUserConversations(userId: string): Promise<void> {
    try {
      const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", userId),
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) return;

      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
    } catch (e) {
      devLog("Delete user conversations notice:", e);
    }
  },

  /**
   * Deterministically generates a symmetric conversation ID for two user IDs.
   */
  getConversationId(userIdA?: string, userIdB?: string): string {
    if (!userIdA || !userIdB) return "";
    return [String(userIdA).trim(), String(userIdB).trim()]
      .sort((a, b) => a.localeCompare(b))
      .join("_");
  },

  /**
   * Deletes a single message from a conversation subcollection and decrements total count.
   */
  async deleteMessage(
    conversationId: string,
    messageId: string,
  ): Promise<void> {
    if (!conversationId || !messageId)
      throw new Error(
        "Both conversationId and messageId are required to delete a message.",
      );

    const batch = writeBatch(db);
    batch.delete(
      doc(db, "conversations", conversationId, "messages", messageId),
    );
    batch.set(
      doc(db, "conversations", conversationId),
      { totalMessages: increment(-1), updatedAt: serverTimestamp() },
      { merge: true },
    );
    await batch.commit();
  },
};


