import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "@/components/common";
import { useAppTheme } from "@/contexts/ThemeContext";
import type { OptionPillGroupProps, OptionPillItem } from "@/types";

export function OptionPillGroup({
  options,
  value,
  onChange,
  variant = "primary",
  size = "md",
  disabled = false,
  style,
  testID,
}: OptionPillGroupProps) {
  const { theme } = useAppTheme();
  const normalizedOptions: OptionPillItem[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const activeBgColor =
    variant === "destructive"
      ? theme.destructive
      : variant === "secondary"
        ? theme.foreground
        : theme.primary;

  const isSmall = size === "sm";

  return (
    <View
      style={[
        pillStyles.container,
        isSmall
          ? [pillStyles.containerSm, { backgroundColor: theme.secondary }]
          : pillStyles.containerMd,
        style,
      ]}
      testID={testID}
    >
      {normalizedOptions.map((opt) => {
        const isActive = value === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive, disabled }}
            style={[
              pillStyles.btnBase,
              isSmall ? pillStyles.btnSm : pillStyles.btnMd,
              {
                backgroundColor: isActive
                  ? activeBgColor
                  : isSmall
                    ? "transparent"
                    : theme.secondary,
              },
              disabled && { opacity: 0.5 },
            ]}
          >
            <AppText
              variant={isSmall ? "badge" : "caption"}
              weight={isSmall ? "bold" : "semibold"}
              color={isActive ? theme.white : theme.mutedForeground}
            >
              {opt.label}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const pillStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerMd: {
    gap: 8,
  },
  containerSm: {
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },
  btnBase: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnMd: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  btnSm: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
