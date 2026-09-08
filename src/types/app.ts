import type { User, UserCredential } from "firebase/auth";
import type React from "react";
import type { UserProfile } from "./models";

// --- THEME ---
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  mode: "light" | "dark";
  background: string;
  surface: string;
  card: string;
  foreground: string;
  primary: string;
  primaryGradient: readonly [string, string, ...string[]];
  greenGradient: readonly [string, string, ...string[]];
  redGradient: readonly [string, string, ...string[]];
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  accentSurface: string;
  destructive: string;
  destructiveForeground: string;
  destructiveSurface: string;
  destructiveBorder: string;
  border: string;
  borderSubtle: string;
  inputBackground: string;
  white: string;
  black: string;
  statusBarStyle: "light" | "dark";
}

export interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  theme: ThemeColors;
  isDark: boolean;
}

// --- BANNER ---
export type BannerType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "offline"
  | "custom";

export interface BannerOptions {
  message: string;
  type?: BannerType;
  duration?: number | null;
  onPress?: () => void;
  actionLabel?: string;
  action?: { label: string; onPress: () => void };
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
}

export interface BannerContextType {
  banner: BannerOptions | null;
  showBanner: (
    input: BannerOptions | string,
    explicitType?: BannerType,
  ) => void;
  hideBanner: () => void;
}

// --- CONTEXTS ---
export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<UserCredential>;
  signUpWithEmail: (
    email: string,
    pass: string,
    name: string,
    username: string,
  ) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithApple: () => Promise<UserCredential>;
  signOutUser: () => Promise<void>;
  deleteAccount: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfileData: (data: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (imageUri: string) => Promise<string>;
}

export interface NetworkContextType {
  isOffline: boolean;
  checkConnection: (customMessage?: string) => Promise<boolean>;
}
