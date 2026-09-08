import {
  User,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  onIdTokenChanged as firebaseOnIdTokenChanged,
  Unsubscribe,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { performGoogleSignIn } from "@/lib/firebaseAuth";

export const authRepo = {
  getCurrentUser: (): User | null => auth.currentUser,

  onAuthStateChanged: (callback: (user: User | null) => void): Unsubscribe =>
    firebaseOnAuthStateChanged(auth, callback),

  onIdTokenChanged: (callback: (user: User | null) => void): Unsubscribe =>
    firebaseOnIdTokenChanged(auth, callback),

  signInWithEmail: (email: string, pass: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(auth, email.trim(), pass),

  async signUpWithEmail(
    email: string,
    pass: string,
    displayName?: string,
  ): Promise<UserCredential> {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (displayName && cred.user) {
      await firebaseUpdateProfile(cred.user, {
        displayName: displayName.trim(),
      });
    }
    return cred;
  },

  signInWithGoogle: (): Promise<UserCredential> => performGoogleSignIn(),

  signInWithApple: (): Promise<UserCredential> => {
    throw new Error("Apple Sign-In requires native iOS OAuth configuration.");
  },

  signOut: (): Promise<void> => firebaseSignOut(auth),

  async deleteCurrentUser(): Promise<void> {
    if (!auth.currentUser)
      throw new Error("No active authenticated user to delete.");
    await auth.currentUser.delete();
  },

  resetPassword: (email: string): Promise<void> =>
    sendPasswordResetEmail(auth, email.trim()),
};
