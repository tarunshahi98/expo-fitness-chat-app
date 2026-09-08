/**
 * useChatMessages.ts
 *
 * Subscribes to a conversation's messages in real-time and provides
 * a sendMessage action using the decoupled repository layer.
 */

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { chatRepo } from "@/repository";
import type { Message, UseChatMessagesResult } from "@/types";


export function useChatMessages(
  conversationId: string | null,
): UseChatMessagesResult {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(conversationId && uid));
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setMessages([]);
    setError(null);

    if (!uid || !conversationId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsub = chatRepo.subscribe(
      conversationId,
      uid,
      (newMessages) => {
        setMessages(newMessages);
        setIsLoading(false);
      },
      (err) => {
        console.error("useChatMessages subscription error:", err);
        setError(err);
        setIsLoading(false);
      },
    );

    return () => {
      unsub();
      setMessages([]);
    };
  }, [conversationId, uid]);

  const sendMessage = useCallback(
    async (text: string): Promise<void> => {
      if (!uid)
        throw new Error("Cannot send message: User is not authenticated.");
      if (!conversationId)
        throw new Error("Cannot send message: Invalid conversation route.");
      const trimmed = text.trim();
      if (!trimmed) throw new Error("Message text cannot be empty.");

      await chatRepo.sendMessage(conversationId, uid, trimmed);
    },
    [conversationId, uid],
  );

  return { messages, isLoading, error, sendMessage };
}
