import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Web-specific Google Sign In implementation using Firebase Auth popup.
 * Metro bundler resolves this file exclusively for web builds, keeping web popup DOM dependencies out of native mobile bundles.
 */
export async function performGoogleSignIn(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}
