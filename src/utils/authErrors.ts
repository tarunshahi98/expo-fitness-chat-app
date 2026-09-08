/**
 * Centralized Firebase Auth error translator.
 * Maps standard error codes and network outage states into friendly user messages.
 */

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "custom/username-already-in-use": "This username is already in use. Please try another one.",
  "auth/network-request-failed": "Network connection failed. Please check your internet connection and try again.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/invalid-login-credentials": "Invalid email or password.",
  "auth/user-not-found": "Invalid email or password.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/email-already-in-use": "This email is already in use. Please try another one.",
  "auth/email-already-exists": "This email is already in use. Please try another one.",
  "auth/account-exists-with-different-credential": "An account already exists with the same email address using a different sign-in method.",
  "auth/credential-already-in-use": "An account already exists with the same email address using a different sign-in method.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "New password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.",
  "auth/user-disabled": "This account has been disabled. Please contact support.",
  "auth/too-many-requests": "Too many failed attempts. Please try again later.",
  "auth/requires-recent-login": "For security reasons, please log in again before completing this action.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled before completing.",
  "auth/popup-blocked": "Sign-in popup was blocked by your browser. Please allow popups for this site.",
  "auth/cancelled-popup-request": "Only one sign-in popup can be active at a time.",
  "auth/expired-action-code": "The password reset link has expired or is invalid. Please request a new one.",
  "auth/invalid-action-code": "The password reset link has expired or is invalid. Please request a new one.",
  "permission-denied": "Database permission denied. Please verify you have access.",
  "unavailable": "Service temporarily unavailable. Please check your internet connection.",
};

export function getAuthErrorMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred. Please try again.";
  if (typeof error === "object" && error !== null) {
    const code =
      "code" in error && typeof error.code === "string"
        ? error.code
        : undefined;
    const message =
      "message" in error && typeof error.message === "string"
        ? error.message
        : undefined;
    if (code && AUTH_ERROR_MESSAGES[code]) {
      return AUTH_ERROR_MESSAGES[code];
    }
    if (message) {
      return message;
    }
  }
  if (typeof error === "string") return error;
  return "Authentication failed. Please try again.";
}
