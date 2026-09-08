import { Avatar } from "@/components/Avatar";
import { AppText, SectionLabel } from "@/components/common";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { useAppTheme } from "@/contexts/ThemeContext";
import { blockedStyles, settingsRowStyles } from "@/styles";
import { AlertTriangle, Plus, UserX } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function BlockedScreen() {
  const { theme } = useAppTheme();
  const [blocked, setBlocked] = useState([
    {
      id: 1,
      name: "Marcus Webb",
      initials: "MW",
      color: "#e8365d",
      blockedOn: "Jun 3, 2026",
    },
    {
      id: 2,
      name: "Toby Hart",
      initials: "TH",
      color: "#f59e0b",
      blockedOn: "Apr 18, 2026",
    },
  ]);

  const unblock = (id: number) => {
    setBlocked((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <SubScreenShell title="Blocked Users">
      {/* Warning Callout */}
      <View
        style={[
          blockedStyles.warningCard,
          {
            backgroundColor: theme.destructiveSurface,
            borderColor: theme.destructiveBorder,
          },
        ]}
      >
        <AlertTriangle
          size={16}
          color={theme.destructive}
          style={blockedStyles.warningIcon}
        />
        <AppText
          variant="caption"
          color={theme.mutedForeground}
          style={blockedStyles.warningText}
        >
          Blocked users cannot message you or see your profile.
        </AppText>
      </View>

      {blocked.length === 0 ? (
        /* Empty State */
        <View style={blockedStyles.emptyContainer}>
          <View
            style={[
              blockedStyles.emptyIconBox,
              { backgroundColor: theme.muted },
            ]}
          >
            <UserX size={28} color={theme.mutedForeground} />
          </View>
          <AppText variant="body" color={theme.mutedForeground}>
            No blocked users
          </AppText>
        </View>
      ) : (
        /* Blocked List */
        <View style={blockedStyles.listContainer}>
          <SectionLabel label={`${blocked.length} blocked`} />
          <View
            style={[
              settingsRowStyles.groupContainer,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            {blocked.map((user, idx) => (
              <View
                key={user.id}
                style={[
                  settingsRowStyles.rowItem,
                  idx > 0 && {
                    borderTopWidth: 1,
                    borderTopColor: theme.borderSubtle,
                  },
                ]}
              >
                <Avatar initials={user.initials} color={user.color} size={44} />
                <View style={blockedStyles.textContent}>
                  <AppText
                    variant="body"
                    weight="semibold"
                    color={theme.foreground}
                  >
                    {user.name}
                  </AppText>
                  <AppText
                    variant="caption"
                    color={theme.mutedForeground}
                    style={blockedStyles.rowSub}
                  >
                    Blocked {user.blockedOn}
                  </AppText>
                </View>
                <TouchableOpacity
                  onPress={() => unblock(user.id)}
                  style={[
                    blockedStyles.unblockBtn,
                    { backgroundColor: theme.secondary },
                  ]}
                  activeOpacity={0.7}
                >
                  <AppText
                    variant="caption"
                    weight="bold"
                    color={theme.primary}
                  >
                    Unblock
                  </AppText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Block Someone Button */}
      <TouchableOpacity
        style={[
          blockedStyles.blockSomeoneBtn,
          { borderColor: theme.border, backgroundColor: theme.card },
        ]}
        activeOpacity={0.7}
      >
        <Plus
          size={16}
          color={theme.mutedForeground}
          style={blockedStyles.blockSomeoneBtnIcon}
        />
        <AppText
          variant="caption"
          weight="semibold"
          color={theme.mutedForeground}
        >
          Block someone
        </AppText>
      </TouchableOpacity>
    </SubScreenShell>
  );
}
