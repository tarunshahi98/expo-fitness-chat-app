import { IS_WEB } from "@/utils/platform";
import { Alert, AlertButton } from "react-native";

/**
 * Cross-platform alert / confirmation prompt helper.
 * React Native Web's `Alert.alert` is a no-op by default.
 * This helper falls back to `window.confirm` / `window.alert` on Web
 * while using standard `Alert.alert` on iOS and Android native.
 */
export function showAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[],
): void {
  if (IS_WEB) {
    const text = [title, message].filter(Boolean).join("\n\n");
    if (typeof window === "undefined") return;

    if (!buttons?.length || buttons.length === 1) {
      window.alert(text);
      buttons?.[0]?.onPress?.();
      return;
    }

    const confirmed = window.confirm(text);
    const actionBtn = confirmed
      ? buttons.find((b) => b.style === "destructive") ||
        buttons.find((b) => b.style !== "cancel") ||
        buttons[buttons.length - 1]
      : buttons.find((b) => b.style === "cancel") || buttons[0];
    actionBtn?.onPress?.();
  } else {
    Alert.alert(title, message, buttons);
  }
}
