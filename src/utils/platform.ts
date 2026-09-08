import { Keyboard, Platform } from "react-native";
import type { KeyboardAvoidingViewProps } from "react-native";

// 1. Single environment check evaluated once
export const IS_DEV =
  typeof __DEV__ !== "undefined"
    ? Boolean(__DEV__)
    : process.env.NODE_ENV !== "production";

// 2. DRY dev loggers
export const devLog = (...args: unknown[]): void => {
  if (IS_DEV) console.log(...args);
};
export const devWarn = (...args: unknown[]): void => {
  if (IS_DEV) console.warn(...args);
};
export const devError = (...args: unknown[]): void => {
  if (IS_DEV) console.error(...args);
};

// 3. Static platform constants for optimal tree-shaking & Hermes bytecode compilation
export const PLATFORM = Platform.OS;
export const IS_WEB = Platform.OS === "web";
export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const IS_APPLE_DEVICE =
  IS_IOS ||
  (IS_WEB &&
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.userAgent));

export const KEYBOARD_AVOIDING_BEHAVIOR: KeyboardAvoidingViewProps["behavior"] =
  IS_IOS ? "padding" : undefined;

/**
 * Validates whether an image URI can safely be loaded by <Image>
 * without triggering browser sandbox security violations (e.g. file:/// on Web)
 * while preserving native local file rendering on Android and iOS.
 */
export function isValidImageUri(uri?: string | null): boolean {
  if (!uri || typeof uri !== "string") return false;
  const trimmed = uri.trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") return false;
  if (IS_WEB && /^(file|content|ph|assets-library):/.test(trimmed)) return false;
  return true;
}

/**
 * Safely dismisses the keyboard across all platforms.
 * On Web, explicitly blurs the active DOM element to prevent ARIA hidden focus warnings.
 */
export function dismissKeyboard(): void {
  Keyboard.dismiss();
  if (
    IS_WEB &&
    typeof document !== "undefined" &&
    document.activeElement instanceof HTMLElement
  ) {
    document.activeElement.blur();
  }
}
