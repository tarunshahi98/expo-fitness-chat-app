import { AppText, SectionLabel } from "@/components/common";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { useAppTheme } from "@/contexts/ThemeContext";
import { appearanceStyles } from "@/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Check } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const FONT_SIZES = [12, 13, 14, 16, 18];

const BUBBLE_STYLES = [
  { key: "rounded", label: "Rounded", radius: 20 },
  { key: "sharp", label: "Sharp", radius: 6 },
  { key: "pill", label: "Pill", radius: 999 },
];

const WALLPAPERS = [
  { colors: ["#3b82f6", "#4f46e5"] as const },
  { colors: ["#60a5fa", "#2563eb"] as const },
  { colors: ["#0b1120", "#162238"] as const },
  { colors: ["#2dd4bf", "#3b82f6"] as const },
  { colors: ["#ef4444", "#f43f5e"] as const },
  { colors: ["#f8fafc", "#eff6ff"] as const },
];

export default function AppearanceScreen() {
  const { themeMode, setThemeMode, theme } = useAppTheme();
  const [fontSize, setFontSize] = useState(2);
  const [chatBubble, setChatBubble] = useState("rounded");
  const [wallpaper, setWallpaper] = useState(0);

  const THEME_OPTIONS = [
    {
      mode: "light" as const,
      label: "Light",
      preview: (
        <View
          style={[
            appearanceStyles.themePreviewBox,
            { backgroundColor: "#ffffff", borderColor: theme.border },
          ]}
        />
      ),
    },
    {
      mode: "dark" as const,
      label: "Dark",
      preview: (
        <View
          style={[
            appearanceStyles.themePreviewBox,
            { backgroundColor: "#0b1120", borderColor: theme.border },
          ]}
        />
      ),
    },
    {
      mode: "system" as const,
      label: "System",
      preview: (
        <View
          style={[
            appearanceStyles.themePreviewBox,
            appearanceStyles.themePreviewSystem,
            { borderColor: theme.border },
          ]}
        >
          <View
            style={[
              appearanceStyles.themePreviewSystemLight,
              { backgroundColor: "#ffffff" },
            ]}
          />
          <View
            style={[
              appearanceStyles.themePreviewSystemDark,
              { backgroundColor: "#0b1120" },
            ]}
          />
        </View>
      ),
    },
  ];

  return (
    <SubScreenShell title="Appearance">
      <SectionLabel label="Theme" />
      <View style={appearanceStyles.row}>
        {THEME_OPTIONS.map((t) => {
          const isSelected = themeMode === t.mode;
          return (
            <TouchableOpacity
              key={t.mode}
              style={[
                appearanceStyles.themeCard,
                {
                  backgroundColor: isSelected ? theme.secondary : theme.card,
                  borderColor: isSelected ? theme.primary : theme.border,
                },
              ]}
              onPress={() => setThemeMode(t.mode)}
              activeOpacity={0.7}
            >
              {t.preview}
              <AppText
                variant="caption"
                weight="medium"
                color={isSelected ? theme.primary : theme.mutedForeground}
              >
                {t.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      <SectionLabel label="Font Size" />
      <View
        style={[
          appearanceStyles.cardContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={appearanceStyles.fontSizeLineContainer}>
          <AppText
            variant="caption"
            weight="semibold"
            color={theme.mutedForeground}
          >
            A
          </AppText>
          <View style={appearanceStyles.fontSizeSliderTrackWrapper}>
            <View
              style={[
                appearanceStyles.fontSizeTrackLine,
                { backgroundColor: theme.muted },
              ]}
            />
            <View style={appearanceStyles.fontSizeDotsRow}>
              {[0, 1, 2, 3, 4].map((index) => (
                <TouchableOpacity
                  key={index}
                  style={appearanceStyles.fontSizeClickTarget}
                  onPress={() => setFontSize(index)}
                  activeOpacity={1}
                >
                  <View
                    style={[
                      appearanceStyles.fontSizeDot,
                      { backgroundColor: theme.muted },
                      fontSize === index && [
                        appearanceStyles.fontSizeDotActive,
                        {
                          backgroundColor: theme.primary,
                          borderColor: theme.card,
                        },
                      ],
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <AppText
            variant="heading"
            weight="bold"
            color={theme.mutedForeground}
          >
            A
          </AppText>
        </View>
        <AppText
          variant="body"
          color={theme.foreground}
          style={[
            appearanceStyles.fontSizePreviewText,
            { fontSize: FONT_SIZES[fontSize] },
          ]}
        >
          Preview text size
        </AppText>
      </View>

      <SectionLabel label="Chat Bubbles" />
      <View style={appearanceStyles.row}>
        {BUBBLE_STYLES.map((b) => {
          const isSelected = chatBubble === b.key;
          return (
            <TouchableOpacity
              key={b.key}
              style={[
                appearanceStyles.bubbleCard,
                {
                  backgroundColor: theme.card,
                  borderColor: isSelected ? theme.primary : theme.border,
                },
              ]}
              onPress={() => setChatBubble(b.key)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  appearanceStyles.bubblePreviewBadge,
                  {
                    borderRadius: b.radius,
                    backgroundColor: isSelected
                      ? theme.primary
                      : theme.secondary,
                  },
                ]}
              >
                <AppText
                  variant="badge"
                  weight="bold"
                  color={isSelected ? theme.white : theme.primary}
                >
                  Hi!
                </AppText>
              </View>
              <AppText
                variant="caption"
                weight="medium"
                color={isSelected ? theme.primary : theme.foreground}
              >
                {b.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>

      <SectionLabel label="Chat Wallpaper" />
      <View style={appearanceStyles.wallpaperGrid}>
        {WALLPAPERS.map((w, i) => {
          const isSelected = wallpaper === i;
          return (
            <TouchableOpacity
              key={i}
              onPress={() => setWallpaper(i)}
              style={appearanceStyles.wallpaperTouch}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={w.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  appearanceStyles.wallpaperGradientBox,
                  isSelected && { borderColor: theme.primary },
                ]}
              >
                {isSelected && (
                  <View style={appearanceStyles.wallpaperCheckCircle}>
                    <Check size={12} color={theme.primary} strokeWidth={3} />
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </SubScreenShell>
  );
}
