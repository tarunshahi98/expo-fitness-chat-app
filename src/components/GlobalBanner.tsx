import { AppText } from "@/components/common";
import { BANNER_PRESET_COLORS } from "@/constants/appTheme";
import { useBanner } from "@/contexts/BannerContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import type { BannerType } from "@/types";
import { bannerStyles } from "@/styles";
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Info,
    WifiOff,
    X,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

function renderDefaultIcon(type?: BannerType) {
  switch (type) {
    case "success":
      return (
        <CheckCircle2 size={18} color="#ffffff" style={bannerStyles.icon} />
      );
    case "error":
      return (
        <AlertCircle size={18} color="#ffffff" style={bannerStyles.icon} />
      );
    case "warning":
      return (
        <AlertTriangle size={18} color="#ffffff" style={bannerStyles.icon} />
      );
    case "info":
      return <Info size={18} color="#ffffff" style={bannerStyles.icon} />;
    case "offline":
      return <WifiOff size={18} color="#ffffff" style={bannerStyles.icon} />;
    default:
      return null;
  }
}

export function GlobalBanner() {
  const { banner, hideBanner } = useBanner();
  const { headerTopPadding: topPadding, insets } = useHeaderInset({
    webPadding: 12,
    nativeOffset: 8,
  });
  const [bannerHeight, setBannerHeight] = useState(100);
  const [displayBanner, setDisplayBanner] = useState(banner);

  const translateY = useSharedValue(-200);
  const dragY = useSharedValue(0);

  const offScreenY = -(bannerHeight + insets.top + 30);

  useEffect(() => {
    if (banner) {
      setDisplayBanner(banner);
      dragY.value = 0;
      translateY.value = withSpring(0, {
        damping: 18,
        stiffness: 140,
      });
    } else {
      translateY.value = withTiming(offScreenY, { duration: 250 }, (finished) => {
        if (finished) {
          runOnJS(setDisplayBanner)(null);
        }
      });
    }
  }, [banner, offScreenY, translateY, dragY]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY < 0) {
        dragY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY < -20 || event.velocityY < -300) {
        translateY.value = withTiming(offScreenY, { duration: 200 }, () => {
          runOnJS(hideBanner)();
        });
      } else {
        dragY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value + dragY.value }],
    };
  });

  if (!displayBanner) return null;

  const type = displayBanner.type || "error";
  const colors = BANNER_PRESET_COLORS[type] || BANNER_PRESET_COLORS.error;
  const backgroundColor = displayBanner.backgroundColor || colors.bg;
  const textColor = displayBanner.textColor || colors.text;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          bannerStyles.bannerContainer,
          { backgroundColor, paddingTop: topPadding },
          animatedStyle,
        ]}
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          if (h > 0) setBannerHeight(h);
        }}
      >
        <View style={bannerStyles.bannerContent}>
          <View style={bannerStyles.leftSection}>
            {displayBanner.icon ? displayBanner.icon : renderDefaultIcon(type)}
            {typeof displayBanner.message === "string" ? (
              <AppText
                variant="body"
                weight="semibold"
                color={textColor}
                style={bannerStyles.bannerText}
              >
                {displayBanner.message}
              </AppText>
            ) : (
              displayBanner.message
            )}
          </View>

          <View style={bannerStyles.rightSection}>
            {displayBanner.action ? (
              <TouchableOpacity
                style={bannerStyles.actionBtn}
                onPress={displayBanner.action.onPress}
                activeOpacity={0.7}
              >
                <AppText
                  variant="caption"
                  weight="bold"
                  color={textColor}
                  style={bannerStyles.actionText}
                >
                  {displayBanner.action.label}
                </AppText>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={bannerStyles.closeBtn}
              onPress={hideBanner}
              activeOpacity={0.7}
              testID="global-banner-close"
            >
              <X size={16} color={textColor} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}
