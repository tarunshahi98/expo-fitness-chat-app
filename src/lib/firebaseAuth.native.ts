import type { UserCredential } from "firebase/auth";

/**
 * Native-specific Google Sign In fallback implementation.
 * Metro bundler resolves this file for iOS/Android native builds, preventing web DOM popup imports from bundling into native apps.
 */
export async function performGoogleSignIn(): Promise<UserCredential> {
  throw new Error("Native Google Sign-In requires native OAuth flow or fallback credentials.");
}
