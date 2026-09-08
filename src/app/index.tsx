import { useAppTheme } from "@/contexts/ThemeContext";
import { ActivityIndicator, View } from "react-native";

/**
 * Entry route fallback during initial Expo Router hydration.
 * Navigation transitions are managed reactively by AuthRouteGuard in _layout.tsx.
 */
export default function Index() {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <ActivityIndicator size="large" color={theme.primary} />
    </View>
  );
}
