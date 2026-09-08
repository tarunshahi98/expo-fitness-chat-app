import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { getAdditionalUserInfo, type User, type UserCredential } from "firebase/auth";
import type { Unsubscribe } from "firebase/firestore";
import type { UserProfile, AuthContextType } from "@/types";
import { devLog } from "@/utils/platform";
import { authRepo } from "@/repository/authRepository";
import { userRepo } from "@/repository/userRepository";
import { chatRepo } from "@/repository/chatRepository";

/* --- 1. Module-Level Stateless Helpers (Permanently Stable References) --- */

async function signUpWithEmail(
  email: string,
  pass: string,
  name: string,
  username: string,
): Promise<UserCredential> {
  const cred = await authRepo.signUpWithEmail(email, pass, name);
  try {
    await userRepo.initUserProfileDoc(cred.user, {
      displayName: name.trim(),
      username: username.trim().toLowerCase(),
    });
    return cred;
  } catch (error) {
    await cred.user.delete().catch((e) => devLog("Rollback failed:", e));
    throw error;
  }
}

async function signInOAuth(
  authMethod: () => Promise<UserCredential>,
): Promise<UserCredential> {
  const cred = await authMethod();
  if (getAdditionalUserInfo(cred)?.isNewUser === false) return cred;

  try {
    const email = cred.user.email || "";
    const base = email
      ? email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "")
      : `user_${cred.user.uid.slice(0, 5)}`;

    const isTaken = await userRepo.isUsernameTaken(base, cred.user.uid);
    const username = isTaken
      ? `${base.slice(0, 24)}_${cred.user.uid.slice(0, 4)}`.toLowerCase()
      : base;

    await userRepo.initUserProfileDoc(cred.user, {
      displayName: cred.user.displayName || undefined,
      username,
    });
    return cred;
  } catch (error) {
    await cred.user.delete().catch((e) => devLog("OAuth Rollback failed:", e));
    throw error;
  }
}

const signInWithGoogle = () => signInOAuth(authRepo.signInWithGoogle);
const signInWithApple = () => signInOAuth(authRepo.signInWithApple);

/* --- 2. Context & Provider --- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Real-time auth & Firestore profile synchronization
  useEffect(() => {
    let unsubProfile: Unsubscribe | null = null;

    const unsubAuth = authRepo.onAuthStateChanged((firebaseUser) => {
      unsubProfile?.();
      setUser(firebaseUser);

      if (!firebaseUser) {
        setUserProfile(null);
        setIsLoading(false);
        return;
      }

      unsubProfile = userRepo.subscribeToProfile(
        firebaseUser.uid,
        (profile) => {
          setUserProfile(profile || userRepo.buildDefaultProfile(firebaseUser));
          setIsLoading(false);
        },
        (err) => {
          console.error("Profile subscription error:", err);
          setUserProfile((prev) => prev || userRepo.buildDefaultProfile(firebaseUser));
          setIsLoading(false);
        },
      );
    });

    return () => {
      unsubAuth();
      unsubProfile?.();
    };
  }, []);

  // Stateful account deletion (concurrent Firestore cleanup + Auth deletion)
  const deleteAccount = useCallback(async (): Promise<void> => {
    if (!user) throw new Error("No active authenticated user to delete.");
    await Promise.allSettled([
      userRepo.deleteUserProfileDoc(user.uid),
      chatRepo.deleteUserConversations(user.uid),
    ]);
    await authRepo.deleteCurrentUser();
  }, [user]);

  // Shared authenticated user runtime assertion
  const requireAuthUser = useCallback(() => {
    if (!user) throw new Error("No authenticated user.");
    return user;
  }, [user]);

  const updateUserProfileData = useCallback(
    (data: Partial<UserProfile>) =>
      userRepo.updateUserProfile(requireAuthUser(), data),
    [requireAuthUser],
  );

  const uploadAvatar = useCallback(
    (uri: string) => userRepo.uploadUserAvatar(requireAuthUser(), uri),
    [requireAuthUser],
  );

  const contextValue = useMemo(
    () => ({
      user,
      userProfile,
      isAuthenticated: !!user,
      isLoading,
      signInWithEmail: authRepo.signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithApple,
      signOutUser: authRepo.signOut,
      deleteAccount,
      resetPassword: authRepo.resetPassword,
      updateUserProfileData,
      uploadAvatar,
    }),
    [
      user,
      userProfile,
      isLoading,
      deleteAccount,
      updateUserProfileData,
      uploadAvatar,
    ],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

/* --- 3. Consumer Hook --- */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
