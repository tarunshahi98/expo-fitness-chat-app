import { TYPOGRAPHY } from "@/constants/typography";
import { useAppTheme } from "@/contexts/ThemeContext";
import { sectionLabelStyles, sharedStyles, toggleStyles } from "@/styles";
import type {
  AppTextProps,
  SectionLabelProps,
  SubmitButtonProps,
  ToggleProps,
} from "@/types";
import { IS_ANDROID } from "@/utils/platform";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function SubmitButton({
  onPress,
  title,
  loading = false,
  disabled = false,
  gradientColors,
}: SubmitButtonProps) {
  const { theme } = useAppTheme();
  const isDisabled = disabled || loading;
  const shadowColor = gradientColors ? gradientColors[0] : theme.primary;
  const shadowHex =
    shadowColor.startsWith("#") && shadowColor.length === 7
      ? `${shadowColor}40`
      : shadowColor;

  return (
    <TouchableOpacity
      style={[
        sharedStyles.submitBtnTouch,
        {
          opacity: loading ? 0.85 : disabled ? 0.45 : 1,
          boxShadow: isDisabled ? "none" : `0px 10px 25px -4px ${shadowHex}`,
          shadowColor: isDisabled ? "transparent" : shadowColor,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDisabled ? 0 : 0.25,
          shadowRadius: 14,
          elevation: isDisabled ? 0 : 6,
        },
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={gradientColors ?? theme.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={sharedStyles.submitBtnGradient}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <AppText
            variant="subheading"
            color="#ffffff"
          >
            {title}
          </AppText>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export const AppText = React.memo(function AppText({
  variant = "body",
  weight,
  color,
  center,
  inline,
  style,
  allowFontScaling = true,
  maxFontSizeMultiplier,
  children,
  ...restProps
}: AppTextProps) {
  const { theme } = useAppTheme();
  const config = TYPOGRAPHY[variant];
  const flatStyle = StyleSheet.flatten(style);

  // Resolution hierarchy:
  // 1. Explicit `color` prop passed by caller.
  // 2. Caller-provided style.color.
  // 3. Dynamic theme.foreground fallback.
  const resolvedColor =
    color ?? flatStyle?.color ?? (!inline ? theme.foreground : undefined);

  return (
    <Text
      allowFontScaling={allowFontScaling}
      maxFontSizeMultiplier={
        maxFontSizeMultiplier ?? config.maxFontSizeMultiplier
      }
      style={[
        IS_ANDROID ? { includeFontPadding: false } : undefined,
        {
          fontFamily: config.fontFamily,
          fontSize: config.fontSize,
          lineHeight: inline ? undefined : config.lineHeight,
          fontWeight: weight ?? config.fontWeight,
          letterSpacing:
            "letterSpacing" in config ? config.letterSpacing : undefined,
        },
        center ? { textAlign: "center" } : undefined,
        style,
        resolvedColor !== undefined ? { color: resolvedColor } : undefined,
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
});

export function SectionLabel({ label }: SectionLabelProps) {
  const { theme } = useAppTheme();
  return (
    <AppText
      variant="badge"
      color={theme.mutedForeground}
      style={sectionLabelStyles.sectionLabel}
    >
      {label.toUpperCase()}
    </AppText>
  );
}

export function Toggle({ on, onToggle }: ToggleProps) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[
        toggleStyles.toggleContainer,
        { backgroundColor: on ? theme.primary : theme.muted },
      ]}
    >
      <View
        style={[
          toggleStyles.toggleCircle,
          {
            backgroundColor: theme.white,
            alignSelf: on ? "flex-end" : "flex-start",
          },
        ]}
      />
    </TouchableOpacity>
  );
}
