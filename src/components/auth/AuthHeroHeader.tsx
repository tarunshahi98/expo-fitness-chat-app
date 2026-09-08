import { AppText } from "@/components/common";
import { OVERLAY_COLORS } from "@/constants/appTheme";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { authStyles } from "@/styles";
import type { AuthHeroHeaderProps } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export const AuthHeroHeader = React.memo(function AuthHeroHeader({
  title,
  subtitle,
  gradientColors,
  icon,
  showBackButton = false,
  disabled = false,
  testID,
}: AuthHeroHeaderProps) {
  const { headerTopPadding } = useHeaderInset();

  const handleBack = () => {
    if (disabled) return;

    router.back();
  };

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        authStyles.screenHeaderGradient,
        { paddingTop: headerTopPadding },
      ]}
      testID={testID}
    >
      {showBackButton && (
        <TouchableOpacity
          style={authStyles.headerBackBtn}
          onPress={handleBack}
          disabled={disabled}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={"Back"}
        >
          <ArrowLeft size={18} color="white" />
        </TouchableOpacity>
      )}

      {icon && <View style={authStyles.headerIconWrapper}>{icon}</View>}

      <View style={{ gap: 6 }}>
        <AppText variant="display" color={OVERLAY_COLORS.whiteEmphasis}>
          {title}
        </AppText>

        <AppText variant="body" color={OVERLAY_COLORS.whiteMuted}>
          {subtitle}
        </AppText>
      </View>
    </LinearGradient>
  );
});
