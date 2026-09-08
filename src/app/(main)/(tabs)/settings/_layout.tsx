import { useAppTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function SettingsLayout() {
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
