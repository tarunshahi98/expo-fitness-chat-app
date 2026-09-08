import { useAppTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function MainLayout() {
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar style={theme.statusBarStyle} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="search-contacts" />
      </Stack>
    </>
  );
}
