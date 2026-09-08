import type { Contact, UserProfile } from "@/types";

const AVATAR_PALETTE = [
  "#3b82f6",
  "#2563eb",
  "#0ea5e9",
  "#2dd4bf",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#6366f1",
];

/**
 * Deterministically derives an accessible avatar color from any seed string (UID, email, or name).
 */
export function getAvatarColor(seed: string): string {
  if (!seed) return AVATAR_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

/**
 * Extracts clean 2-letter uppercase initials from a name, email, or separate first & last names.
 */
export function extractInitials(
  nameOrEmail?: string,
  firstName?: string,
  lastName?: string,
): string {
  const fn = firstName?.trim() || "";
  const ln = lastName?.trim() || "";
  if (fn && ln) {
    return (fn[0] + ln[0]).toUpperCase();
  }
  if (fn && !ln) {
    return fn.length >= 2 ? fn.slice(0, 2).toUpperCase() : fn.toUpperCase();
  }

  const clean = (nameOrEmail || "").trim();
  if (!clean) return "U";

  // If email, extract portion before @ and handle period/hyphen/underscore delimiters
  const namePart = clean.includes("@") ? clean.split("@")[0] : clean;
  const parts = namePart.split(/[\s._-]+/).filter(Boolean);

  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return clean.slice(0, 1).toUpperCase() || "U";
}

/**
 * Shared contact sort comparator: sorts by recency (timestampMs desc), then alphabetically (name asc).
 */
export const compareContactsByRecentMessage = (
  a: Contact,
  b: Contact,
): number =>
  (b.timestampMs || 0) - (a.timestampMs || 0) || a.name.localeCompare(b.name);

export const contactRepo = {
  /**
   * Converts a Firestore UserProfile into a renderable Contact object.
   */
  mapProfileToContact(profile: UserProfile, index = 0): Contact {
    const rawName =
      profile.displayName?.trim() || profile.email?.split("@")[0] || "User";
    return {
      uid: profile.uid,
      id: profile.uid || 100 + index,
      email: profile.email,
      username: profile.username,
      name: rawName,
      avatar: profile.photoURL || "",
      initials: extractInitials(rawName),
      color: getAvatarColor(profile.uid || profile.email || rawName),
      lastMessage: profile.bio || "Available on ChatApp",
      time: "Just now",
      unread: 0,
      online: true,
    };
  },

  /**
   * Deduplicates, filters out self & deleted emails, and converts UserProfiles into Contacts.
   */
  filterAndMergeContacts(
    profiles: UserProfile[],
    currentUid?: string,
    deletedEmails: string[] = [],
  ): Contact[] {
    const deletedSet = new Set(deletedEmails.map((e) => e.toLowerCase()));
    const uniqueMap = new Map<string, UserProfile>();

    profiles.forEach((p) => {
      if (!p.uid || !p.email) return;
      if (currentUid && p.uid === currentUid) return;
      const emailLower = p.email.toLowerCase();
      const uidLower = p.uid.toLowerCase();
      if (deletedSet.has(emailLower) || deletedSet.has(uidLower)) return;
      uniqueMap.set(p.uid, p);
    });

    return Array.from(uniqueMap.values()).map((p, idx) =>
      this.mapProfileToContact(p, idx),
    );
  },

  /**
   * Performs an instantaneous case-insensitive search across name, email, and username.
   */
  searchContacts(contacts: Contact[], query: string): Contact[] {
    const q = (query || "").trim().toLowerCase();
    if (!q) return [];
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.email ? c.email.toLowerCase().includes(q) : false) ||
        (c.username ? c.username.toLowerCase().includes(q) : false),
    );
  },

  /**
   * Fallback resolution for dynamic contact cards or mock IDs.
   */
  getContactById(id: number | string): Contact {
    const strId = String(id);
    if (strId === "fitness-coach") {
      return {
        id: 888,
        uid: "fitness-coach",
        email: "alex.rivera@fitnesscoach.com",
        username: "coach_alex",
        name: "Alex Rivera (Coach)",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        initials: "AR",
        color: "#10b981",
        lastMessage: "Keep pushing! Today's session is key for your goals.",
        time: "Just now",
        unread: 0,
        online: true,
      };
    }
    const numId = Number(id);
    const rawName = strId.replace(/^user-/, "");
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    return {
      id: !isNaN(numId) && numId > 0 ? numId : 999,
      uid: strId,
      email: `${rawName.toLowerCase()}@chatapp.com`,
      username: rawName.toLowerCase(),
      name: formattedName.includes("Contact")
        ? formattedName
        : `${formattedName} Contact`,
      avatar: "",
      initials: extractInitials(rawName),
      color: getAvatarColor(strId),
      lastMessage: "Available on ChatApp",
      time: "Just now",
      unread: 0,
      online: true,
    };
  },
};
