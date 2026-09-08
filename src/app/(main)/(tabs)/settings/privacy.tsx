import { AppText, SectionLabel } from "@/components/common";
import { SettingRow } from "@/components/settings/SettingRow";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { OptionPillGroup } from "@/components/ui/OptionPillGroup";
import { useAppTheme } from "@/contexts/ThemeContext";
import { privacyStyles, settingsRowStyles } from "@/styles";
import {
    CheckCheck,
    Eye,
    Fingerprint,
    Globe,
    Key,
    Lock,
    Shield,
    Smartphone,
} from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";

export default function PrivacyScreen() {
  const { theme } = useAppTheme();
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [lastSeen, setLastSeen] = useState("Everyone");

  const lastSeenOptions = [
    { label: "Eve", value: "Everyone" },
    { label: "Con", value: "Contacts" },
    { label: "Nob", value: "Nobody" },
  ];

  return (
    <SubScreenShell title="Privacy & Security">
      <SectionLabel label="Security" />
      <View
        style={[
          settingsRowStyles.groupContainer,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <SettingRow
          icon={Key}
          label="Two-Factor Auth"
          subtitle={twoFA ? "Enabled — SMS + Authenticator" : "Disabled"}
          subtitleStyle={twoFA ? { color: theme.accent } : undefined}
          type="toggle"
          value={twoFA}
          onToggle={setTwoFA}
        />
        <SettingRow
          icon={Fingerprint}
          label="Biometric Lock"
          subtitle="Face ID / Fingerprint"
          type="toggle"
          value={biometric}
          onToggle={setBiometric}
          borderTop
        />
        <SettingRow
          icon={Smartphone}
          label="Active Sessions"
          subtitle="3 devices logged in"
          type="link"
          onPress={() => {}}
          borderTop
        />
        <SettingRow
          icon={Lock}
          label="Change Password"
          subtitle="Last changed 3 months ago"
          type="link"
          onPress={() => {}}
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
          icon={CheckCheck}
          label="Read Receipts"
          subtitle={"Show when you've read messages"}
          type="toggle"
          value={readReceipts}
          onToggle={setReadReceipts}
        />
        <SettingRow
          icon={Eye}
          label="Online Status"
          subtitle="Show when you're active"
          type="toggle"
          value={onlineStatus}
          onToggle={setOnlineStatus}
          borderTop
        />
        <SettingRow
          icon={Globe}
          label="Last Seen"
          subtitle={`Visible to: ${lastSeen}`}
          type="custom"
          borderTop
          rightElement={
            <OptionPillGroup
              options={lastSeenOptions}
              value={lastSeen}
              onChange={setLastSeen}
              size="sm"
              variant="primary"
            />
          }
        />
      </View>

      {/* Encryption Callout */}
      <View
        style={[
          privacyStyles.encryptionCard,
          { backgroundColor: theme.secondary, borderColor: theme.border },
        ]}
      >
        <View style={privacyStyles.encryptionHeader}>
          <Shield
            size={16}
            color={theme.primary}
            style={privacyStyles.encryptionIcon}
          />
          <AppText variant="caption" weight="bold" color={theme.primary}>
            End-to-end encrypted
          </AppText>
        </View>
        <AppText variant="caption" color={theme.mutedForeground}>
          All your messages are encrypted in transit and at rest. Only you and
          your recipients can read them.
        </AppText>
      </View>
    </SubScreenShell>
  );
}
