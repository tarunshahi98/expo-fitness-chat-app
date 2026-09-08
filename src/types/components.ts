import type React from "react";
import type {
  ReturnKeyTypeOptions,
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import type { ThemeColors } from "./app";
import type { Contact, Message } from "./models";

// --- COMMON TYPOGRAPHY & LAYOUT PROPS ---

export interface AppTextProps extends TextProps {
  variant?: "display" | "heading" | "subheading" | "body" | "caption" | "badge";
  weight?: TextStyle["fontWeight"];
  color?: string;
  center?: boolean;
  inline?: boolean;
  children?: React.ReactNode;
}

export interface HeaderInsetOptions {
  webPadding?: number;
  nativeOffset?: number;
}

export interface SectionLabelProps {
  label: string;
}

export interface ToggleProps {
  on: boolean;
  onToggle: () => void;
}

// --- AUTH & FORM PROPS ---

export interface AuthHeroHeaderProps {
  title: string;
  subtitle?: string;
  gradientColors: readonly [string, string, ...string[]];
  icon?: React.ReactNode;
  showBackButton?: boolean;
  disabled?: boolean;
  testID?: string;
}

export interface SubmitButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface InputFieldProps extends Omit<TextInputProps, "style"> {
  label?: string;
  error?: string | null;
  helperText?: string;
  disabled?: boolean;
  showReadOnlyBadge?: boolean;
  required?: boolean;
  showCharCount?: boolean;
  leftIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
}

export interface PasswordFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string | null;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// --- PROFILE & SETTINGS PROPS ---

export interface SubScreenShellProps {
  title: string;
  headerRight?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export interface SettingRowBaseProps {
  icon?: React.ComponentType<{ size: number; color: string }> | React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  iconWrapperStyle?: StyleProp<ViewStyle>;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  subtitleStyle?: StyleProp<TextStyle>;
  borderTop?: boolean;
  destructive?: boolean;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  testID?: string;
}

export type SettingRowProps = SettingRowBaseProps & (
  | {
      type: "toggle";
      value: boolean;
      onToggle: (val: boolean) => void;
      onPress?: never;
      rightElement?: never;
    }
  | {
      type: "link";
      onPress: () => void;
      rightText?: string;
      rightTextStyle?: StyleProp<TextStyle>;
      showChevron?: boolean;
      chevronColor?: string;
      value?: never;
      onToggle?: never;
      rightElement?: never;
    }
  | {
      type: "custom";
      rightElement: React.ReactNode;
      onPress?: () => void;
      value?: never;
      onToggle?: never;
    }
);

export interface OptionPillItem {
  label: string;
  value: string;
  testID?: string;
}

export interface OptionPillGroupProps {
  options: (string | OptionPillItem)[];
  value: string;
  onChange: (value: string) => void;
  variant?: "primary" | "destructive" | "secondary";
  size?: "sm" | "md";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// --- CHAT COMPONENT PROPS ---

export interface AvatarProps {
  initials?: string;
  name?: string;
  color?: string;
  gradient?: readonly [string, string, ...string[]];
  size?: number;
  online?: boolean;
  uri?: string | null;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export interface ContactRowProps {
  contact: Contact;
  theme: ThemeColors;
}

export interface MessageItemProps {
  msg: Message;
  contactInitials: string;
  contactColor: string;
}
