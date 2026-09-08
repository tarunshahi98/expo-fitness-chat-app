import { AppText } from "@/components/common";
import { getTextInputTypography } from "@/constants/typography";
import { useAppTheme } from "@/contexts/ThemeContext";
import { sharedStyles } from "@/styles";
import type { InputFieldProps, PasswordFieldProps } from "@/types";
import { Eye, EyeOff, Lock } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function InputField({
  label,
  value = "",
  error,
  helperText,
  disabled,
  readOnly,
  showReadOnlyBadge,
  required,
  maxLength,
  showCharCount,
  multiline,
  numberOfLines = 1,
  leftIcon,
  leftAddon,
  rightIcon,
  style,
  inputStyle,
  inputWrapperStyle,
  placeholderTextColor,
  textAlignVertical,
  onFocus,
  onBlur,
  ...rest
}: InputFieldProps) {
  const { theme } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const isEditable = !disabled && !readOnly;
  const isOverLimit = maxLength !== undefined && value.length > maxLength;

  return (
    <View style={[{ gap: 6 }, style]}>
      {/* Label Row */}
      {(label || showReadOnlyBadge || showCharCount) && (
        <View style={styles.labelRow}>
          {label ? (
            <AppText
              variant="caption"
              weight="600"
              color={theme.mutedForeground}
            >
              {label}
              {required && (
                <AppText
                  inline
                  variant="caption"
                  weight="700"
                  color={theme.destructive}
                >
                  {" "}
                  *
                </AppText>
              )}
            </AppText>
          ) : (
            <View />
          )}

          {showReadOnlyBadge ? (
            <View
              style={[styles.readOnlyBadge, { backgroundColor: theme.muted }]}
            >
              <Lock size={11} color={theme.mutedForeground} />
              <AppText variant="badge" color={theme.mutedForeground}>
                Read only
              </AppText>
            </View>
          ) : (
            showCharCount &&
            maxLength !== undefined && (
              <AppText
                variant="badge"
                weight={isOverLimit ? "700" : "400"}
                color={isOverLimit ? theme.destructive : theme.mutedForeground}
              >
                {value.length}/{maxLength}
              </AppText>
            )
          )}
        </View>
      )}

      {/* Unified Input Container */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: readOnly ? theme.muted : theme.card,
            borderColor: error
              ? theme.destructive
              : isFocused
              ? theme.primary
              : theme.border,
            boxShadow:
              isFocused && !error
                ? `0px 0px 0px 3px ${theme.primary}26`
                : undefined,
          },
          multiline && [
            styles.multilineContainer,
            { minHeight: Math.max(80, numberOfLines * 24 + 16) },
          ],
          inputWrapperStyle,
        ]}
      >
        {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}
        {leftAddon && (
          <View style={styles.leftAddonWrapper}>
            {typeof leftAddon === "string" ? (
              <AppText variant="body" weight="700" color={theme.primary}>
                {leftAddon}
              </AppText>
            ) : (
              leftAddon
            )}
          </View>
        )}

        <TextInput
          value={value}
          editable={isEditable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholderTextColor={placeholderTextColor ?? theme.mutedForeground}
          textAlignVertical={
            textAlignVertical ?? (multiline ? "top" : "center")
          }
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          style={[
            styles.textInput,
            { color: readOnly ? theme.mutedForeground : theme.foreground },
            leftIcon || leftAddon ? { paddingLeft: 6 } : undefined,
            rightIcon ? { paddingRight: 40 } : undefined,
            multiline ? styles.multilineInput : undefined,
            inputStyle,
          ]}
          {...rest}
        />

        {rightIcon && <View style={styles.rightIconWrapper}>{rightIcon}</View>}
      </View>

      {/* Helper / Error Text */}
      {error ? (
        <AppText
          variant="caption"
          color={theme.destructive}
          style={{ color: theme.destructive }}
        >
          {error}
        </AppText>
      ) : (
        helperText && (
          <AppText
            variant="caption"
            color={theme.mutedForeground}
            style={styles.helperText}
          >
            {helperText}
          </AppText>
        )
      )}
    </View>
  );
}

export function PasswordField({
  placeholder = "Enter your password",
  disabled = false,
  ...rest
}: PasswordFieldProps) {
  const { theme } = useAppTheme();
  const [showPass, setShowPass] = useState(false);

  return (
    <InputField
      {...rest}
      placeholder={placeholder}
      disabled={disabled}
      secureTextEntry={!showPass}
      autoCapitalize={rest.autoCapitalize ?? "none"}
      autoCorrect={false}
      rightIcon={
        <TouchableOpacity
          style={sharedStyles.eyeIconTouch}
          onPress={() => setShowPass((v) => !v)}
          disabled={disabled}
          accessibilityLabel={showPass ? "Hide password" : "Show password"}
          activeOpacity={0.7}
        >
          {showPass ? (
            <EyeOff size={18} color={theme.mutedForeground} />
          ) : (
            <Eye size={18} color={theme.mutedForeground} />
          )}
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  readOnlyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    position: "relative",
  },
  textInput: {
    ...getTextInputTypography("body"),
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "transparent",
    outlineWidth: 0,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : {}),
  },
  multilineContainer: { alignItems: "flex-start" },
  multilineInput: {
    paddingTop: 12,
    paddingBottom: 12,
    textAlignVertical: "top",
  },
  leftAddonWrapper: {
    paddingLeft: 14,
    paddingRight: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  leftIconWrapper: {
    paddingLeft: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIconWrapper: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  helperText: {
    marginTop: 2,
    paddingLeft: 2,
  },
});
