import { AppText, SectionLabel } from "@/components/common";
import { SettingRow } from "@/components/settings/SettingRow";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { OptionPillGroup } from "@/components/ui/OptionPillGroup";
import { useAppTheme } from "@/contexts/ThemeContext";
import { notificationsStyles, settingsRowStyles } from "@/styles";
import {
    BellOff,
    Eye,
    MessageCircle,
    MessageSquare,
    Phone,
    Vibrate,
    Volume2,
} from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function NotificationsScreen() {
  const { theme } = useAppTheme();
  const [msgs, setMsgs] = useState(true);
  const [groups, setGroups] = useState(true);
  const [calls, setCalls] = useState(true);
  const [sound, setSound] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [preview, setPreview] = useState(true);
  const [mute, setMute] = useState(false);
  const [muteUntil, setMuteUntil] = useState("1 hour");

  const muteOptions = ["1 hour", "8 hours", "24 hours", "Always"];

  return (
    <SubScreenShell title="Notifications">
      <SectionLabel label="Message Alerts" />
      <View
        style={[
          settingsRowStyles.groupContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <SettingRow
          icon={MessageSquare}
          label="Direct Messages"
          subtitle="Notify on new messages"
          type="toggle"
          value={msgs}
          onToggle={setMsgs}
        />
        <SettingRow
          icon={MessageCircle}
          label="Group Chats"
          subtitle="Notify for group activity"
          type="toggle"
          value={groups}
          onToggle={setGroups}
          borderTop
        />
        <SettingRow
          icon={Phone}
          label="Incoming Calls"
          subtitle="Ring for voice & video calls"
          type="toggle"
          value={calls}
          onToggle={setCalls}
          borderTop
        />
      </View>

      <SectionLabel label="Sound & Haptics" />
      <View
        style={[
          settingsRowStyles.groupContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <SettingRow
          icon={Volume2}
          label="Notification Sound"
          subtitle="Play alert tones"
          type="toggle"
          value={sound}
          onToggle={setSound}
        />
        <SettingRow
          icon={Vibrate}
          label="Vibration"
          subtitle="Vibrate on notification"
          type="toggle"
          value={vibrate}
          onToggle={setVibrate}
          borderTop
        />
      </View>

      <SectionLabel label="Privacy" />
      <View
        style={[
          settingsRowStyles.groupContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <SettingRow
          icon={Eye}
          label="Message Preview"
          subtitle="Show text in lock screen"
          type="toggle"
          value={preview}
          onToggle={setPreview}
        />
        <SettingRow
          icon={BellOff}
          iconColor={mute ? theme.destructive : theme.primary}
          iconWrapperStyle={
            mute
              ? {
                  backgroundColor: theme.destructiveBorder,
                }
              : undefined
          }
          label="Do Not Disturb"
          subtitle={
            mute ? `Muted for ${muteUntil}` : "Silence all notifications"
          }
          type="toggle"
          value={mute}
          onToggle={setMute}
          borderTop
        />
      </View>

      {mute && (
        <View
          style={[
            notificationsStyles.muteDurationContainer,
            {
              backgroundColor: theme.destructiveSurface,
              borderColor: theme.destructiveBorder,
            },
          ]}
        >
          <AppText
            variant="caption"
            weight="semibold"
            color={theme.destructive}
          >
            Mute duration
          </AppText>
          <OptionPillGroup
            options={muteOptions}
            value={muteUntil}
            onChange={setMuteUntil}
            variant="destructive"
          />
        </View>
      )}
    </SubScreenShell>
  );
}
