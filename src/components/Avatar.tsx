import { useState } from "react";
import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "@/components/common";
import { useAppTheme } from "@/contexts/ThemeContext";
import { extractInitials, getAvatarColor } from "@/repository/contactRepository";
import { avatarStyles } from "@/styles";
import type { AvatarProps } from "@/types";
import { isValidImageUri } from "@/utils/platform";

export function Avatar({
  initials,
  name,
  color,
  gradient,
  size = 44,
  online = false,
  uri,
  style,
  children,
}: AvatarProps) {
  const { theme } = useAppTheme();
  const [imageError, setImageError] = useState(false);
  const [prevUri, setPrevUri] = useState(uri);

  if (uri !== prevUri) {
    setPrevUri(uri);
    setImageError(false);
  }

  const showImage = isValidImageUri(uri) && !imageError;
  const resolvedInitials = initials || extractInitials(name || "");
  const fallbackColor =
    color || (gradient ? undefined : getAvatarColor(name || initials || "User"));

  return (
    <View style={[{ width: size, height: size, position: "relative" }, style]}>
      {showImage ? (
        <Image
          source={{ uri: uri! }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          onError={() => setImageError(true)}
        />
      ) : gradient ? (
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            avatarStyles.avatarCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <AppText
            variant="subheading"
            weight="bold"
            color="#ffffff"
            style={[
              avatarStyles.avatarText,
              { fontSize: size * 0.36, lineHeight: undefined },
            ]}
          >
            {resolvedInitials}
          </AppText>
        </LinearGradient>
      ) : (
        <View
          style={[
            avatarStyles.avatarCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: fallbackColor,
            },
          ]}
        >
          <AppText
            variant="subheading"
            weight="bold"
            color="#ffffff"
            style={[
              avatarStyles.avatarText,
              { fontSize: size * 0.36, lineHeight: undefined },
            ]}
          >
            {resolvedInitials}
          </AppText>
        </View>
      )}

      {online && (
        <View
          style={[
            avatarStyles.avatarOnlineDot,
            {
              width: size * 0.27,
              height: size * 0.27,
              borderRadius: (size * 0.27) / 2,
              backgroundColor: theme.accent,
              borderColor: theme.card,
            },
          ]}
        />
      )}

      {children}
    </View>
  );
}

