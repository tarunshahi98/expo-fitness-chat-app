import { Dimensions, PixelRatio, TextStyle } from "react-native";
import { IS_ANDROID, IS_WEB } from "@/utils/platform";

export const fonts = {
  header: IS_WEB ? "'Plus Jakarta Sans', sans-serif" : undefined,
  body: IS_WEB ? "Inter, sans-serif" : undefined,
};

const BASELINE_WIDTH = 375;

export function scaleFont(size: number, factor = 0.4): number {
  if (IS_WEB) return size;
  const { width, height } = Dimensions.get("window");
  const scale = Math.max(
    0.9,
    Math.min(Math.min(width, height) / BASELINE_WIDTH, 1.2),
  );
  return PixelRatio.roundToNearestPixel(size + (size * scale - size) * factor);
}

export type TypographyVariant =
  | "display"
  | "heading"
  | "subheading"
  | "body"
  | "caption"
  | "badge";

export const TYPOGRAPHY = {
  display: {
    fontFamily: fonts.header,
    fontSize: scaleFont(28, 0.4),
    lineHeight: scaleFont(34, 0.4),
    fontWeight: "800" as const,
    letterSpacing: -0.5,
    maxFontSizeMultiplier: 1.25,
  },
  heading: {
    fontFamily: fonts.header,
    fontSize: scaleFont(20, 0.4),
    lineHeight: scaleFont(26, 0.4),
    fontWeight: "700" as const,
    letterSpacing: -0.2,
    maxFontSizeMultiplier: 1.3,
  },
  subheading: {
    fontFamily: fonts.header,
    fontSize: scaleFont(16, 0.3),
    lineHeight: scaleFont(22, 0.3),
    fontWeight: "600" as const,
    maxFontSizeMultiplier: 1.35,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: scaleFont(14, 0.3),
    lineHeight: scaleFont(20, 0.3),
    fontWeight: "400" as const,
    maxFontSizeMultiplier: 1.5,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: scaleFont(12, 0.2),
    lineHeight: scaleFont(16, 0.2),
    fontWeight: "500" as const,
    maxFontSizeMultiplier: 1.5,
  },
  badge: {
    fontFamily: fonts.body,
    fontSize: scaleFont(11, 0.2),
    lineHeight: scaleFont(14, 0.2),
    fontWeight: "700" as const,
    maxFontSizeMultiplier: 1.2,
  },
} as const;

export function getTextInputTypography(
  variant: TypographyVariant = "body",
  weight?: TextStyle["fontWeight"],
): TextStyle {
  const config = TYPOGRAPHY[variant];
  return {
    fontFamily: config.fontFamily,
    fontSize: config.fontSize,
    fontWeight: weight ?? config.fontWeight,
    ...(IS_ANDROID ? { includeFontPadding: false } : {}),
  };
}
