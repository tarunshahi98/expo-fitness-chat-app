import { GlobalBanner } from "@/components/GlobalBanner";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BannerProvider } from "@/contexts/BannerContext";
import { NetworkProvider } from "@/contexts/NetworkContext";
import { AppThemeProvider, useAppTheme } from "@/contexts/ThemeContext";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

function AuthRouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useAppTheme();
  const segments = useSegments();
  const rootSegment = segments[0] as string | undefined;
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    SplashScreen.hideAsync().catch(() => {});

    const inAuthGroup = rootSegment === "(auth)";
    const isAtRoot = !rootSegment || rootSegment === "index";

    if (!isAuthenticated && !inAuthGroup) {
      // Unauthenticated user attempting to access protected screens -> send to sign in
      router.replace("/(auth)/sign-in");
    } else if (isAuthenticated && (inAuthGroup || isAtRoot)) {
      // Authenticated user arriving at root or auth screen -> send to chat contacts
      router.replace("/contacts");
    }
  }, [isAuthenticated, isLoading, rootSegment, router]);

  if (isLoading) {
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

  return <>{children}</>;
}

function RootLayoutContent() {
  const { isDark, theme } = useAppTheme();

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <GlobalBanner />
      <StatusBar style={theme.statusBarStyle} />
      <AuthRouteGuard>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
        </Stack>
      </AuthRouteGuard>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BannerProvider>
          <NetworkProvider>
            <AppThemeProvider>
              <AuthProvider>
                <RootLayoutContent />
              </AuthProvider>
            </AppThemeProvider>
          </NetworkProvider>
        </BannerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
