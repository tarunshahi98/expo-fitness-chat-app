import { DARK_THEME, LIGHT_THEME } from "@/constants/appTheme";
import type { ThemeContextType, ThemeMode } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";

export { DARK_THEME, LIGHT_THEME };

const STORAGE_KEY = "@chatapp_theme_mode";

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  setThemeMode: async () => {},
  theme: LIGHT_THEME,
  isDark: false,
});

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceColorScheme = useDeviceColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "light" || saved === "dark" || saved === "system") {
          setThemeModeState(saved);
        }
      })
      .catch(() => {});
  }, []);

  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
      console.warn("Failed to persist theme mode:", e);
    }
  }, []);

  const isDark =
    themeMode === "system"
      ? deviceColorScheme === "dark"
      : themeMode === "dark";
  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  const contextValue = useMemo(
    () => ({ themeMode, setThemeMode, theme, isDark }),
    [themeMode, setThemeMode, theme, isDark],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
