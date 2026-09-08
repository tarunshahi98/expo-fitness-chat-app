import type { BannerType, ThemeColors } from "@/types";

// ─── Core Theme Definitions ──────────────────────────────────────────────────

export const LIGHT_THEME: ThemeColors = {
  mode: "light",
  background: "#f8fafc",
  surface: "#ffffff",
  card: "#ffffff",
  foreground: "#0f172a",
  primary: "#3b82f6",
  primaryGradient: ["#3b82f6", "#2563eb"],
  greenGradient: ["#2dd4bf", "#3b82f6"],
  redGradient: ["#ef4444", "#f43f5e"],
  secondary: "#eff6ff",
  secondaryForeground: "#1d4ed8",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#2dd4bf",
  accentForeground: "#134e4a",
  accentSurface: "#f0fdfa",
  destructive: "#ef4444",
  destructiveForeground: "#ffffff",
  destructiveSurface: "#fef2f2",
  destructiveBorder: "#fecaca",
  border: "rgba(15, 23, 42, 0.08)",
  borderSubtle: "rgba(15, 23, 42, 0.04)",
  inputBackground: "#f1f5f9",
  white: "#ffffff",
  black: "#000000",
  statusBarStyle: "dark",
};

export const DARK_THEME: ThemeColors = {
  mode: "dark",
  background: "#0b1120",
  surface: "#111c30",
  card: "#162238",
  foreground: "#f8fafc",
  primary: "#3b82f6",
  primaryGradient: ["#60a5fa", "#4f46e5"],
  greenGradient: ["#2dd4bf", "#3b82f6"],
  redGradient: ["#f87171", "#ef4444"],
  secondary: "#172554",
  secondaryForeground: "#93c5fd",
  muted: "#1e293b",
  mutedForeground: "#94a3b8",
  accent: "#2dd4bf",
  accentForeground: "#134e4a",
  accentSurface: "rgba(45, 212, 191, 0.15)",
  destructive: "#ef4444",
  destructiveForeground: "#ffffff",
  destructiveSurface: "rgba(239, 68, 68, 0.12)",
  destructiveBorder: "rgba(239, 68, 68, 0.28)",
  border: "rgba(147, 197, 253, 0.14)",
  borderSubtle: "rgba(147, 197, 253, 0.07)",
  inputBackground: "#162238",
  white: "#ffffff",
  black: "#000000",
  statusBarStyle: "light",
};

// ─── Standardized Overlays & Brand Constants ─────────────────────────────────

export const OVERLAY_COLORS = {
  whiteSubtle: "rgba(255, 255, 255, 0.20)",
  whiteBorder: "rgba(255, 255, 255, 0.40)",
  whiteMuted: "rgba(255, 255, 255, 0.70)",
  whiteEmphasis: "rgba(255, 255, 255, 0.90)",
  scrim: "rgba(0, 0, 0, 0.45)",
  blueShadowSubtle: "rgba(59, 130, 246, 0.15)",
  blueShadowMedium: "rgba(59, 130, 246, 0.25)",
} as const;

export const BRAND_COLORS = {
  google: "#ea4335",
  star: "#f59e0b",
} as const;

export const BANNER_PRESET_COLORS: Record<
  BannerType,
  { bg: string; text: string }
> = {
  success: { bg: "#10b981", text: "#ffffff" },
  error: { bg: "#ef4444", text: "#ffffff" },
  warning: { bg: "#f59e0b", text: "#ffffff" },
  info: { bg: "#3b82f6", text: "#ffffff" },
  offline: { bg: "#ef4444", text: "#ffffff" },
  custom: { bg: "#162238", text: "#ffffff" },
};

export * from "./typography";
