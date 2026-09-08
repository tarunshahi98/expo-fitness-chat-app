import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ArrowLeft,
  Calendar,
  Camera,
  Edit2,
  LogOut,
  Trash2,
} from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { Avatar } from "@/components/Avatar";
import { AppText } from "@/components/common";
import { SettingRow } from "@/components/settings/SettingRow";
import { OVERLAY_COLORS } from "@/constants/appTheme";
import { settings } from "@/constants/settingsConfig";
import { useAuth } from "@/contexts/AuthContext";
import { useBanner } from "@/contexts/BannerContext";
import { useNetwork } from "@/contexts/NetworkContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { extractInitials } from "@/repository/contactRepository";
import { settingsStyles } from "@/styles";
import { showAlert } from "@/utils/alert";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { getTimestampMs } from "@/utils/date";
import { isValidImageUri } from "@/utils/platform";

export default function SettingsScreen({
  showBackButton = false,
}: {
  showBackButton?: boolean;
} = {}) {
  const router = useRouter();
  const { headerTopPadding, bottomInset } = useHeaderInset({
    webPadding: 24,
    nativeOffset: 12,
  });
  const { user, userProfile, signOutUser, deleteAccount } = useAuth();
  const { theme, setThemeMode } = useAppTheme();
  const { checkConnection } = useNetwork();
  const { showBanner } = useBanner();

  const handleSignOut = async () => {
    try {
      if (!(await checkConnection())) return;

      await signOutUser();
      router.replace("/(auth)/sign-in");
      showBanner("Log out successfully", "success");
    } catch (error: unknown) {
      console.error("Sign out error:", error);
      showBanner(getAuthErrorMessage(error));
    }
  };

  const handleDeleteAccount = async () => {
    showAlert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              if (!(await checkConnection())) return;

              await setThemeMode("light");
              await deleteAccount();
              showBanner("Account deleted successfully", "success");
              router.replace("/(auth)/sign-in");
            } catch (error: unknown) {
              console.error("Delete account error:", error);
              showBanner(getAuthErrorMessage(error));
            }
          },
        },
      ],
    );
  };

  const displayName = userProfile?.displayName || user?.displayName || "User";
  const initials = extractInitials(displayName);
  const email = userProfile?.email || user?.email || "";
  const bio = userProfile?.bio || "";
  const photoUrl = isValidImageUri(userProfile?.photoURL || user?.photoURL)
    ? ((userProfile?.photoURL || user?.photoURL) ?? undefined)
    : undefined;

  const formattedJoinedDate = (() => {
    if (userProfile?.createdAt) {
      const ms = getTimestampMs(userProfile.createdAt);
      return new Date(ms).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
    return "Recent";
  })();

  return (
    <View
      style={[
        settingsStyles.screenContainer,
        { backgroundColor: theme.background },
      ]}
    >
      <StatusBar style="light" />

      <ScrollView
        style={settingsStyles.scrollFlex}
        contentContainerStyle={{ paddingBottom: bottomInset + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Dynamic Gradient Settings Header Hero */}
        <LinearGradient
          colors={theme.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            settingsStyles.settingsHeaderGradient,
            { paddingTop: headerTopPadding },
          ]}
        >
          {/* Header Action Bar */}
          <View style={settingsStyles.settingsActionRow}>
            {showBackButton ? (
              <TouchableOpacity
                style={settingsStyles.settingsHeaderBackBtn}
                onPress={() => router.back()}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <ArrowLeft size={18} color="white" />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 40 }} />
            )}

            <TouchableOpacity
              style={settingsStyles.settingsHeaderBackBtn}
              onPress={() => router.push("/settings/edit")}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
            >
              <Edit2 size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* User Photo with Edit Camera Button */}
          <View style={settingsStyles.settingsPhotoContainer}>
            <Avatar
              size={96}
              uri={photoUrl}
              name={displayName}
              initials={initials}
              gradient={theme.primaryGradient}
            >
              <TouchableOpacity
                style={settingsStyles.settingsCameraBtn}
                onPress={() => router.push("/settings/edit")}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Edit profile photo"
              >
                <Camera size={14} color="white" />
              </TouchableOpacity>
            </Avatar>
          </View>

          <AppText variant="heading" weight="heavy" color="#ffffff">
            {displayName}
          </AppText>
          <AppText
            variant="caption"
            color={OVERLAY_COLORS.whiteMuted}
            style={settingsStyles.settingsEmailText}
          >
            {email}
          </AppText>

          {bio ? (
            <AppText
              variant="caption"
              color={OVERLAY_COLORS.whiteEmphasis}
              style={settingsStyles.settingsBioText}
            >
              {bio}
            </AppText>
          ) : null}

          <View style={settingsStyles.headerMetadataRow}>
            <View style={settingsStyles.settingsStatusBadge}>
              <View
                style={[
                  settingsStyles.settingsStatusDot,
                  { backgroundColor: theme.accent },
                ]}
              />
              <AppText
                variant="badge"
                weight="medium"
                color={OVERLAY_COLORS.whiteEmphasis}
              >
                {userProfile?.status || "Online"}
              </AppText>
            </View>
            <View style={settingsStyles.joinedBadge}>
              <Calendar size={12} color={OVERLAY_COLORS.whiteMuted} />
              <AppText
                variant="badge"
                weight="medium"
                color={OVERLAY_COLORS.whiteEmphasis}
              >
                Joined {formattedJoinedDate}
              </AppText>
            </View>
          </View>
        </LinearGradient>

        {/* Settings options list */}
        <View style={settingsStyles.settingsBoxContainer}>
          <AppText
            variant="badge"
            weight="bold"
            color={theme.mutedForeground}
            style={settingsStyles.settingsSectionTitle}
          >
            SETTINGS
          </AppText>

          {settings.map(({ icon: Icon, label, sub, route }) => (
            <SettingRow
              key={label}
              type="link"
              icon={Icon}
              label={label}
              subtitle={sub}
              style={[
                settingsStyles.settingCardRow,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
              onPress={() => router.push(route)}
            />
          ))}

          {/* Account & Destructive Actions Section */}
          <AppText
            variant="badge"
            weight="bold"
            color={theme.mutedForeground}
            style={settingsStyles.accountSectionTitle}
          >
            ACCOUNT
          </AppText>

          {/* Delete Account Action Row */}
          <SettingRow
            type="link"
            destructive
            icon={Trash2}
            label="Delete Account"
            subtitle="Permanently remove your account and data"
            style={[
              settingsStyles.settingCardRow,
              {
                borderColor: theme.destructiveBorder,
              },
            ]}
            onPress={handleDeleteAccount}
          />

          {/* Sign Out Action Row */}
          <SettingRow
            type="link"
            destructive
            icon={LogOut}
            label="Sign Out"
            subtitle="Sign out of your account"
            style={[
              settingsStyles.settingCardRow,
              {
                borderColor: theme.destructiveBorder,
              },
            ]}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}
