import type { Contact, ConversationDoc, Message } from "./models";

export interface UseContactsListResult {
  allContacts: Contact[];
  activeConversations: Contact[];
  searchContacts: (query: string) => Contact[];
  unreadConversationsCount: number;
  conversationsMap: Record<string, ConversationDoc>;
  isLoading: boolean;
}

export interface UseChatMessagesResult {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  sendMessage: (text: string) => Promise<void>;
}
