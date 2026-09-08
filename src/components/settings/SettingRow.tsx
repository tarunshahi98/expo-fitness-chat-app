import { AppText, Toggle } from "@/components/common";
import { useAppTheme } from "@/contexts/ThemeContext";
import { settingsRowStyles } from "@/styles";
import type { SettingRowProps } from "@/types";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export function SettingRow(props: SettingRowProps) {
  const { theme } = useAppTheme();

  const {
    icon,
    iconColor: customIconColor,
    iconBg: customIconBg,
    iconWrapperStyle,
    label,
    labelStyle,
    subtitle,
    subtitleStyle,
    borderTop,
    destructive = false,
    style,
    disabled = false,
    testID,
  } = props;

  // Resolve destructive vs standard palettes
  const resolvedIconColor =
    customIconColor ?? (destructive ? theme.destructive : theme.primary);

  const resolvedIconBg =
    customIconBg ?? (destructive ? theme.destructiveBorder : theme.secondary);

  const resolvedContainerStyle = destructive
    ? {
        backgroundColor: theme.destructiveSurface,
        borderColor: theme.destructiveBorder,
      }
    : {
        backgroundColor: theme.card,
        borderColor: theme.borderSubtle,
      };

  // Resolve press handler & accessibility role
  const onPress =
    props.type === "toggle"
      ? () => !disabled && props.onToggle(!props.value)
      : props.onPress;

  const accessibilityRole =
    props.type === "toggle" ? "switch" : onPress ? "button" : undefined;
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      testID={testID}
      disabled={disabled}
      activeOpacity={onPress ? 0.7 : undefined}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={label}
      accessibilityHint={subtitle}
      accessibilityState={{
        disabled,
        ...(props.type === "toggle" ? { checked: props.value } : {}),
      }}
      style={[
        settingsRowStyles.rowItem,
        resolvedContainerStyle,
        borderTop && [
          settingsRowStyles.rowBorder,
          { borderTopColor: theme.borderSubtle },
        ],
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      {/* Icon with runtime safety check */}
      {icon && (
        <View
          style={[
            settingsRowStyles.iconWrapper,
            { backgroundColor: resolvedIconBg },
            iconWrapperStyle,
          ]}
        >
          {React.isValidElement(icon)
            ? icon
            : typeof icon === "function" ||
                (typeof icon === "object" && icon !== null)
              ? React.createElement(
                  icon as React.ComponentType<{ size: number; color: string }>,
                  { size: 18, color: resolvedIconColor },
                )
              : null}
        </View>
      )}

      {/* Text Labels */}
      <View style={settingsRowStyles.textContent}>
        <AppText
          variant="body"
          weight="semibold"
          color={destructive ? theme.destructive : theme.foreground}
          style={labelStyle}
        >
          {label}
        </AppText>
        {subtitle && (
          <AppText
            variant="caption"
            color={theme.mutedForeground}
            style={subtitleStyle}
          >
            {subtitle}
          </AppText>
        )}
      </View>

      {/* Right Content */}
      {props.type === "toggle" && (
        <View style={{ pointerEvents: "none" }}>
          <Toggle on={props.value} onToggle={() => {}} />
        </View>
      )}

      {props.type === "custom" && props.rightElement}

      {props.type === "link" && (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {props.rightText && (
            <AppText
              variant="caption"
              color={theme.mutedForeground}
              style={[{ marginTop: 0 }, props.rightTextStyle]}
            >
              {props.rightText}
            </AppText>
          )}
          {(props.showChevron ?? !destructive) && (
            <ChevronRight
              size={16}
              color={props.chevronColor ?? theme.mutedForeground}
            />
          )}
        </View>
      )}
    </Wrapper>
  );
}
