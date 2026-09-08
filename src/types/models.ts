import type { FirestoreTimestamp } from "@/utils/date";

export type { FirestoreTimestamp };

export interface Contact {
  uid: string;
  id?: string | number;
  email?: string;
  username?: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  initials: string;
  color: string;
  timestampMs?: number;
}

export interface Message {
  id: string;
  text: string;
  sent: boolean;
  time: string;
  read: boolean;
  timestampMs?: number;
}

export interface FirestoreMessage {
  id?: string;
  text: string;
  senderId: string;
  read: boolean;
  createdAt: FirestoreTimestamp;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  username: string;
  photoURL?: string;
  bio?: string;
  status?: string;
  createdAt?: FirestoreTimestamp | string;
  updatedAt?: FirestoreTimestamp | string;
}

export interface UsernameDoc {
  uid: string;
  username: string;
  createdAt: FirestoreTimestamp;
}

export interface ConversationDoc {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastMessageSenderId?: string;
  lastMessageTimestamp?: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
  unreadCounts?: Record<string, number>;
  totalMessages?: number;
}
