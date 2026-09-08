import type { FieldValue, Timestamp } from "firebase/firestore";

export type FirestoreTimestamp =
  | Timestamp
  | FieldValue
  | { seconds: number; nanoseconds: number }
  | number
  | string
  | null;

/**
 * Universal timestamp parser that handles Firestore Timestamps, FieldValues,
 * ISO date strings, milliseconds numbers, and null fallbacks.
 */
export function getTimestampMs(ts?: FirestoreTimestamp): number {
  if (!ts) return Date.now();
  if (typeof ts === "number") return ts;
  if (typeof ts === "string") {
    const parsed = Date.parse(ts);
    return isNaN(parsed) ? Date.now() : parsed;
  }
  if (typeof ts === "object") {
    if ("toMillis" in ts && typeof ts.toMillis === "function") {
      return ts.toMillis();
    }
    if ("toDate" in ts && typeof ts.toDate === "function") {
      return ts.toDate().getTime();
    }
    if ("seconds" in ts && typeof ts.seconds === "number") {
      return ts.seconds * 1000;
    }
  }
  return Date.now();
}

/**
 * Formats a timestamp (number, Firestore Timestamp, or string) into a locale time string (HH:MM).
 */
export function formatTime(
  ts?: FirestoreTimestamp,
  fallback = "Just now",
): string {
  const ms = getTimestampMs(ts);
  return ms <= 0
    ? fallback
    : new Date(ms).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
}
