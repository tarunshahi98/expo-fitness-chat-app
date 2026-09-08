import { AppText, SectionLabel } from "@/components/common";
import { SettingRow } from "@/components/settings/SettingRow";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { useAppTheme } from "@/contexts/ThemeContext";
import { mediaStyles, settingsRowStyles } from "@/styles";
import {
    AlertTriangle,
    HardDrive,
    Image,
    Trash2,
    Video,
} from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function MediaScreen() {
  const { theme } = useAppTheme();
  const [autoDownload, setAutoDownload] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [saveToGallery, setSaveToGallery] = useState(true);

  const used = 1.4;
  const total = 5;
  const percentage = (used / total) * 100;

  const storageCategories = [
    { label: "Photos", size: "720 MB", color: theme.primary },
    { label: "Videos", size: "510 MB", color: theme.accent },
    { label: "Files", size: "180 MB", color: theme.destructive },
  ];

  return (
    <SubScreenShell title="Media & Storage">
      {/* Storage Used Card */}
      <View
        style={[
          mediaStyles.storageCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View style={mediaStyles.storageHeader}>
          <AppText variant="subheading" weight="bold" color={theme.foreground}>
            Storage Used
          </AppText>
          <AppText variant="caption" weight="bold" color={theme.primary}>
            {used} GB / {total} GB
          </AppText>
        </View>

        {/* Progress Bar */}
        <View
          style={[mediaStyles.progressBarBg, { backgroundColor: theme.muted }]}
        >
          <View
            style={[
              mediaStyles.progressBarFill,
              { width: `${percentage}%`, backgroundColor: theme.primary },
            ]}
          />
        </View>

        {/* Storage Categories Breakdown */}
        <View style={mediaStyles.breakdownRow}>
          {storageCategories.map((item) => (
            <View key={item.label} style={mediaStyles.categoryItem}>
              <View
                style={[
                  mediaStyles.categoryColorDot,
                  { backgroundColor: item.color },
                ]}
              />
              <View>
                <AppText
                  variant="caption"
                  weight="semibold"
                  color={theme.foreground}
                >
                  {item.label}
                </AppText>
                <AppText
                  variant="badge"
                  color={theme.mutedForeground}
                  style={mediaStyles.categorySize}
                >
                  {item.size}
                </AppText>
              </View>
            </View>
          ))}
        </View>
      </View>

      <SectionLabel label="Downloads" />
      <View
        style={[
          settingsRowStyles.groupContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <SettingRow
          icon={HardDrive}
          label="Auto-Download Media"
          subtitle="On Wi-Fi & mobile data"
          type="toggle"
          value={autoDownload}
          onToggle={setAutoDownload}
        />
        <SettingRow
          icon={Video}
          label="Auto-Play Videos"
          subtitle="Play videos automatically"
          type="toggle"
          value={autoPlay}
          onToggle={setAutoPlay}
          borderTop
        />
        <SettingRow
          icon={Image}
          label="Save to Gallery"
          subtitle="Save received media"
          type="toggle"
          value={saveToGallery}
          onToggle={setSaveToGallery}
          borderTop
        />
      </View>

      <SectionLabel label="Clear Data" />
      <View
        style={[
          settingsRowStyles.groupContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <SettingRow
          icon={Trash2}
          label="Clear Cache"
          subtitle="Free up 84 MB"
          type="link"
          onPress={() => {}}
        />
        <SettingRow
          icon={AlertTriangle}
          destructive
          label="Delete All Media"
          subtitle="Removes all downloaded files"
          type="link"
          onPress={() => {}}
          borderTop
        />
      </View>
    </SubScreenShell>
  );
}
