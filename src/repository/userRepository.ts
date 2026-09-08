import { db } from "@/lib/firebase";
import type { UserProfile } from "@/types";
import { devLog } from "@/utils/platform";
import { updateProfile as firebaseUpdateProfile, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";

export const userRepo = {
  subscribeToProfile(
    uid: string,
    onUpdate: (profile: UserProfile | null) => void,
    onError: (err: Error) => void,
  ): Unsubscribe {
    return onSnapshot(
      doc(db, "users", uid),
      (snap) => onUpdate(snap.exists() ? (snap.data() as UserProfile) : null),
      (err) => {
        console.error("userRepo profile snapshot error:", err);
        onError(err);
      },
    );
  },

  subscribeToAllUsers(
    onUpdate: (profiles: UserProfile[]) => void,
    onError?: (err: Error) => void,
  ): Unsubscribe {
    return onSnapshot(
      collection(db, "users"),
      (snap) => {
        const profiles: UserProfile[] = [];
        snap.forEach((d) => d.exists() && profiles.push(d.data() as UserProfile));
        onUpdate(profiles);
      },
      (err) => {
        devLog("userRepo subscribeToAllUsers snapshot notice:", err);
        onError?.(err);
      },
    );
  },

  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const snap = await getDocs(collection(db, "users"));
      const profiles: UserProfile[] = [];
      snap.forEach((d) => d.exists() && profiles.push(d.data() as UserProfile));
      return profiles;
    } catch (e) {
      console.error("userRepo getAllUsers error:", e);
      return [];
    }
  },

  /**
   * Checks if a username is already taken by directly inspecting the /usernames collection.
   */
  async isUsernameTaken(
    username: string,
    excludeUid?: string,
  ): Promise<boolean> {
    const clean = username.trim().toLowerCase();
    if (!clean) return false;

    try {
      const usernameRef = doc(db, "usernames", clean);
      const snapshot = await getDoc(usernameRef);

      if (!snapshot.exists()) return false;
      const data = snapshot.data();
      if (excludeUid && data?.uid === excludeUid) return false;
      return true;
    } catch (err) {
      devLog("isUsernameTaken query check error:", err);
      return false;
    }
  },

  buildDefaultProfile(
    user: User,
    overrides?: Partial<UserProfile>,
  ): UserProfile {
    const fallbackName = user.email ? user.email.split("@")[0] : "User";
    const derivedUsername = user.email
      ? user.email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "")
      : `user_${user.uid.slice(0, 5)}`;
    return {
      uid: user.uid,
      displayName: user.displayName || fallbackName,
      email: user.email || "",
      username: overrides?.username
        ? overrides.username.trim().toLowerCase()
        : derivedUsername,
      photoURL: user.photoURL || "",
      bio: "",
      status: "Available",
      createdAt: user.metadata.creationTime || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides,
    };
  },

  /**
   * Atomically claims /usernames/{cleanUsername} and creates /users/{uid} in a Firestore transaction.
   * If the username is already taken by another user, throws an error with code 'custom/username-already-in-use'.
   */
  async initUserProfileDoc(
    user: User,
    overrides?: Partial<UserProfile>,
  ): Promise<UserProfile> {
    const profile = this.buildDefaultProfile(user, overrides);
    const cleanUsername = profile.username.trim().toLowerCase();

    const usernameRef = doc(db, "usernames", cleanUsername);
    const userRef = doc(db, "users", user.uid);

    await runTransaction(db, async (transaction) => {
      const usernameDoc = await transaction.get(usernameRef);
      const userDoc = await transaction.get(userRef);

      // If user profile document already exists and has a username, preserve existing data
      if (userDoc.exists()) {
        const existingData = userDoc.data() as UserProfile;
        if (existingData?.username) {
          return;
        }
      }

      if (usernameDoc.exists()) {
        const existingData = usernameDoc.data();
        if (existingData?.uid !== user.uid) {
          const error = Object.assign(
            new Error(
              "This username is already in use. Please try another one.",
            ),
            { code: "custom/username-already-in-use" },
          );
          throw error;
        }
      }

      // 1. Reserve username document
      transaction.set(usernameRef, {
        uid: user.uid,
        username: cleanUsername,
        createdAt: serverTimestamp(),
      });

      // 2. Write/merge user profile document
      const existingProfile = userDoc.exists()
        ? (userDoc.data() as UserProfile)
        : null;
      transaction.set(
        userRef,
        {
          ...profile,
          ...(existingProfile?.displayName &&
            !overrides?.displayName && {
              displayName: existingProfile.displayName,
            }),
          ...(existingProfile?.photoURL &&
            !overrides?.photoURL && { photoURL: existingProfile.photoURL }),
          username: cleanUsername,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
    });

    return profile;
  },

  /**
   * Atomically updates user profile data and handles username migration in /usernames collection.
   */
  async updateUserProfile(
    user: User,
    data: Partial<UserProfile>,
  ): Promise<void> {
    const isHttpPhotoUrl =
      typeof data.photoURL === "string" &&
      (data.photoURL.startsWith("http://") ||
        data.photoURL.startsWith("https://"));

    if (data.displayName !== undefined || isHttpPhotoUrl) {
      try {
        await firebaseUpdateProfile(user, {
          ...(data.displayName !== undefined && {
            displayName: data.displayName,
          }),
          ...(isHttpPhotoUrl && { photoURL: data.photoURL }),
        });
      } catch (authErr) {
        devLog("Firebase Auth profile update notice:", authErr);
      }
    }

    const userRef = doc(db, "users", user.uid);
    const newUsername = data.username
      ? data.username.trim().toLowerCase()
      : undefined;

    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const currentProfile = userDoc.exists()
        ? (userDoc.data() as UserProfile)
        : null;
      const oldUsername = currentProfile?.username
        ? currentProfile.username.toLowerCase()
        : null;

      if (newUsername && newUsername !== oldUsername) {
        const newUsernameRef = doc(db, "usernames", newUsername);
        const newUsernameDoc = await transaction.get(newUsernameRef);

        if (
          newUsernameDoc.exists() &&
          newUsernameDoc.data()?.uid !== user.uid
        ) {
          const error = Object.assign(
            new Error(
              "This username is already in use. Please try another one.",
            ),
            { code: "custom/username-already-in-use" },
          );
          throw error;
        }

        // Release old username reservation if it existed
        if (oldUsername) {
          const oldUsernameRef = doc(db, "usernames", oldUsername);
          transaction.delete(oldUsernameRef);
        }

        // Claim new username
        transaction.set(newUsernameRef, {
          uid: user.uid,
          username: newUsername,
          createdAt: serverTimestamp(),
        });
      }

      transaction.set(
        userRef,
        {
          ...data,
          ...(newUsername && { username: newUsername }),
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );
    });
  },

  async uploadUserAvatar(user: User, imageUri: string): Promise<string> {
    devLog(
      `[DEV MODE] Updating user avatar in Firestore document for ${user.uid}`,
    );
    await this.updateUserProfile(user, { photoURL: imageUri });
    return imageUri;
  },

  /**
   * Cleans up both the user document and their username reservation in a transaction.
   */
  async deleteUserProfileDoc(uid: string): Promise<void> {
    const userRef = doc(db, "users", uid);

    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data() as UserProfile;
        if (data?.username) {
          const usernameRef = doc(db, "usernames", data.username.toLowerCase());
          transaction.delete(usernameRef);
        }
      }
      transaction.delete(userRef);
    });
  },
};
