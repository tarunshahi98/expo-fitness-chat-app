import type { HeaderInsetOptions } from "@/types";
import { IS_WEB } from "@/utils/platform";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Normalizes top padding for full-bleed gradient headers and exposes bottom safe-area insets.
 * - On Web: returns webPadding (defaults to 24px) so headers have breathing room against the browser viewport.
 * - On Mobile: returns insets.top + nativeOffset (defaults to insets.top + 12px) so background gradients
 *   can paint under the status bar while text/buttons sit comfortably below system icons.
 */
export function useHeaderInset(options?: HeaderInsetOptions) {
  const insets = useSafeAreaInsets();
  const webPadding = options?.webPadding ?? 24;
  const nativeOffset = options?.nativeOffset ?? 12;

  const headerTopPadding = IS_WEB ? webPadding : (insets?.top ?? 0) + nativeOffset;
  const bottomInset = insets?.bottom ?? 0;

  return {
    headerTopPadding,
    bottomInset,
    insets: {
      top: insets?.top ?? 0,
      bottom: insets?.bottom ?? 0,
      left: insets?.left ?? 0,
      right: insets?.right ?? 0,
    },
  };
}
