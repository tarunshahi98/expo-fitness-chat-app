import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Camera, Mail } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
} from "react-native";

import { Avatar } from "@/components/Avatar";
import { AppText, InputField, SubmitButton } from "@/components/common";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { useAuth } from "@/contexts/AuthContext";
import { useBanner } from "@/contexts/BannerContext";
import { useNetwork } from "@/contexts/NetworkContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { extractInitials } from "@/repository/contactRepository";
import { editProfileStyles } from "@/styles";
import { showAlert } from "@/utils/alert";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { KEYBOARD_AVOIDING_BEHAVIOR } from "@/utils/platform";
import {
    isUsernameTakenInFirebase,
    sanitizeNameInput,
    validateFirstName,
    validateLastName,
    validateUsernameFrontend,
} from "@/utils/validations";

const STATUS_OPTIONS = [
  { label: "Available", emoji: "💬", sub: "Online & ready to chat" },
  { label: "Busy", emoji: "🔴", sub: "Do not disturb" },
  { label: "Away", emoji: "🌙", sub: "Stepped away" },
  { label: "In a meeting", emoji: "📅", sub: "In a call" },
];

export default function EditProfileScreen() {
  const { user, userProfile, updateUserProfileData, uploadAvatar } = useAuth();
  const { checkConnection } = useNetwork();
  const { showBanner } = useBanner();
  const { theme } = useAppTheme();

  const initialName =
    userProfile?.displayName ||
    user?.displayName ||
    (user?.email ? user.email.split("@")[0] : "");
  const nameParts = initialName.trim().split(" ");

  const [firstName, setFirstName] = useState(nameParts[0] || "");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") || "");
  const [username, setUsername] = useState(
    userProfile?.username ||
      (user?.email
        ? user.email
            .split("@")[0]
            .toLowerCase()
            .replace(/[^a-z0-9._]/g, "")
        : ""),
  );
  const [bio, setBio] = useState(userProfile?.bio || "");
  const [photoUrl, setPhotoUrl] = useState(
    userProfile?.photoURL || user?.photoURL || "",
  );
  const [selectedStatus, setSelectedStatus] = useState(
    userProfile?.status || "Available",
  );
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);

  const email = userProfile?.email || user?.email || "";
  const nameMax = 25;
  const bioMax = 120;

  const firstNameError = validateFirstName(firstName);
  const lastNameError = validateLastName(lastName);
  const usernameError = validateUsernameFrontend(username);
  const isBioTooLong = bio.length > bioMax;
  const isValid =
    !firstNameError && !lastNameError && !usernameError && !isBioTooLong;

  const handlePickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        showAlert(
          "Permission Required",
          "Please allow photo library access in Settings.",
        );
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!res.canceled && res.assets[0]?.uri) {
        const manip = await ImageManipulator.manipulateAsync(
          res.assets[0].uri,
          [{ resize: { width: 500, height: 500 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
        );

        setPhotoUrl(manip.uri);

        if (user?.uid) {
          setUploadingAvatar(true);
          try {
            if (!(await checkConnection())) return;
            const cloudUrl = await uploadAvatar(manip.uri);
            setPhotoUrl(cloudUrl);
            await updateUserProfileData({ photoURL: cloudUrl });
            showBanner("Profile picture updated!", "success");
          } catch (e: unknown) {
            showBanner(getAuthErrorMessage(e));
          } finally {
            setUploadingAvatar(false);
          }
        }
      }
    } catch (e: unknown) {
      showBanner(getAuthErrorMessage(e));
    }
  };

  const handleSave = async () => {
    if (!isValid || saving) return;
    setSaving(true);
    try {
      if (!(await checkConnection())) return;

      const fn = firstName.trim();
      const ln = lastName.trim();
      const fullName = ln ? `${fn} ${ln}` : fn;
      const cleanUsername = username.trim().toLowerCase();

      if (cleanUsername !== (userProfile?.username || "").toLowerCase()) {
        if (await isUsernameTakenInFirebase(cleanUsername)) {
          showBanner("This username is already taken. Please choose another.");
          return;
        }
      }

      await updateUserProfileData({
        displayName: fullName,
        username: cleanUsername,
        bio: bio.trim(),
        status: selectedStatus,
        photoURL: photoUrl,
      });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        router.back();
      }, 600);
    } catch (error: unknown) {
      showBanner(getAuthErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const initials = extractInitials(
    firstName.trim() || lastName.trim()
      ? `${firstName} ${lastName}`.trim()
      : email || "U",
  );

  return (
    <KeyboardAvoidingView
      behavior={KEYBOARD_AVOIDING_BEHAVIOR}
      style={[editProfileStyles.flex1, { backgroundColor: theme.background }]}
    >
      <SubScreenShell
        title="Edit Profile"
        contentContainerStyle={{ paddingHorizontal: 0, paddingTop: 0, gap: 0 }}
      >
        {/* Avatar Section */}
        <View
          style={[
            editProfileStyles.avatarSection,
            { backgroundColor: theme.card, borderBottomColor: theme.border },
          ]}
        >
          <TouchableOpacity
            style={editProfileStyles.avatarWrapper}
            onPress={handlePickImage}
            disabled={uploadingAvatar}
            activeOpacity={0.8}
          >
            <Avatar
              size={96}
              uri={photoUrl}
              name={
                firstName.trim() || lastName.trim()
                  ? `${firstName} ${lastName}`.trim()
                  : email || "User"
              }
              initials={initials}
              gradient={theme.primaryGradient}
            >
              {uploadingAvatar && (
                <View style={editProfileStyles.avatarLoadingOverlay}>
                  <ActivityIndicator color="#ffffff" size="small" />
                </View>
              )}

              <View style={editProfileStyles.cameraBtn}>
                <Camera size={14} color="white" />
              </View>
            </Avatar>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePickImage}
            disabled={uploadingAvatar}
            style={editProfileStyles.changePhotoBtn}
            activeOpacity={0.7}
          >
            <AppText variant="body" weight="semibold" color={theme.primary}>
              {uploadingAvatar ? "Uploading photo..." : "Change photo"}
            </AppText>
          </TouchableOpacity>
          <AppText
            variant="caption"
            color={theme.mutedForeground}
            style={editProfileStyles.photoFormatsText}
          >
            JPG or PNG · Stored in profile
          </AppText>
        </View>

        {/* Form Fields */}
        <View style={editProfileStyles.formContainer}>
          <AppText
            variant="badge"
            weight="bold"
            color={theme.mutedForeground}
            style={editProfileStyles.sectionLabel}
          >
            BASIC INFO
          </AppText>

          <InputField
            label="First Name"
            required
            value={firstName}
            onChangeText={(text) => setFirstName(sanitizeNameInput(text))}
            placeholder="Enter first name"
            maxLength={nameMax}
            showCharCount
            error={firstNameError}
            style={editProfileStyles.fieldContainer}
          />

          <InputField
            label="Last Name (Optional)"
            value={lastName}
            onChangeText={(text) => setLastName(sanitizeNameInput(text))}
            placeholder="Enter last name (optional)"
            maxLength={nameMax}
            showCharCount
            error={lastNameError}
            style={editProfileStyles.fieldContainer}
          />

          <InputField
            label="Username"
            required
            leftAddon="@"
            value={username}
            onChangeText={setUsername}
            placeholder="username"
            autoCapitalize="none"
            maxLength={30}
            error={usernameError}
            helperText={
              !usernameError
                ? "Unique handle for your account profile."
                : undefined
            }
            style={editProfileStyles.fieldContainer}
          />

          <InputField
            label="Bio"
            value={bio}
            onChangeText={setBio}
            placeholder="Tell others a little about yourself..."
            multiline
            numberOfLines={3}
            maxLength={bioMax}
            showCharCount
            error={
              isBioTooLong ? `Bio cannot exceed ${bioMax} characters.` : null
            }
            style={editProfileStyles.fieldContainer}
          />

          {/* STATUS SELECTOR */}
          <View style={editProfileStyles.fieldContainer}>
            <AppText
              variant="caption"
              weight="semibold"
              color={theme.mutedForeground}
            >
              Status Message
            </AppText>
            <View style={editProfileStyles.statusListContainer}>
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = selectedStatus === opt.label;
                return (
                  <TouchableOpacity
                    key={opt.label}
                    style={[
                      editProfileStyles.statusRow,
                      {
                        backgroundColor: theme.card,
                        borderColor: isSelected ? theme.primary : theme.border,
                      },
                    ]}
                    onPress={() => setSelectedStatus(opt.label)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        editProfileStyles.statusRadioCircle,
                        {
                          borderColor: isSelected
                            ? theme.primary
                            : theme.mutedForeground,
                        },
                      ]}
                    >
                      {isSelected && (
                        <View
                          style={[
                            editProfileStyles.statusRadioActiveDot,
                            { backgroundColor: theme.primary },
                          ]}
                        />
                      )}
                    </View>
                    <AppText
                      variant="body"
                      style={editProfileStyles.statusEmoji}
                    >
                      {opt.emoji}
                    </AppText>
                    <View style={editProfileStyles.statusTextContent}>
                      <AppText
                        variant="body"
                        weight="semibold"
                        color={theme.foreground}
                      >
                        {opt.label}
                      </AppText>
                      <AppText variant="caption" color={theme.mutedForeground}>
                        {opt.sub}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <InputField
            label="Email Address"
            value={email}
            onChangeText={() => {}}
            readOnly
            showReadOnlyBadge
            leftIcon={<Mail size={16} color={theme.mutedForeground} />}
            style={editProfileStyles.fieldContainer}
          />

          <SubmitButton
            title={saved ? "Saved!" : "Save Changes"}
            onPress={handleSave}
            loading={saving}
            disabled={!isValid}
          />
        </View>
      </SubScreenShell>
    </KeyboardAvoidingView>
  );
}
