import type { UserCredential } from "firebase/auth";

/**
 * Base type declaration & fallback for Firebase Auth helpers.
 * Metro bundler automatically picks up `firebaseAuth.web.ts` on Web and `firebaseAuth.native.ts` on Native.
 */
export async function performGoogleSignIn(): Promise<UserCredential> {
  throw new Error("performGoogleSignIn interface stub called directly.");
}
