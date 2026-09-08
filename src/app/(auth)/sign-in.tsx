import { AuthHeroHeader } from "@/components/auth/AuthHeroHeader";
import {
  AppText,
  InputField,
  PasswordField,
  SubmitButton,
} from "@/components/common";
import { BRAND_COLORS } from "@/constants/appTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useBanner } from "@/contexts/BannerContext";
import { useNetwork } from "@/contexts/NetworkContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { authStyles } from "@/styles";
import { sharedStyles } from "@/styles/sharedStyles";
import { getAuthErrorMessage } from "@/utils/authErrors";
import {
  IS_APPLE_DEVICE,
  KEYBOARD_AVOIDING_BEHAVIOR,
  devLog,
} from "@/utils/platform";
import { validateEmail } from "@/utils/validations";
import { router } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const { bottomInset } = useHeaderInset();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);
  const { signInWithEmail } = useAuth();
  const { checkConnection } = useNetwork();
  const { showBanner } = useBanner();
  const isAppleDevice = IS_APPLE_DEVICE;
  const { theme } = useAppTheme();

  const handleSignIn = async () => {
    let hasValidationError = false;
    setEmailError(null);
    setPassError(null);

    const emailErr = validateEmail(email);
    if (emailErr) {
      setEmailError(emailErr);
      hasValidationError = true;
    }
    if (!pass) {
      setPassError("Please enter your password");
      hasValidationError = true;
    }
    if (hasValidationError) return;

    setLoading(true);
    try {
      if (!(await checkConnection())) return;

      await signInWithEmail(email.trim(), pass);
      router.replace("/contacts");
    } catch (err: unknown) {
      devLog("Email Sign In error:", err);
      showBanner(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    showBanner("Google sign-in is coming soon!", "info");
  };

  const handleAppleSignIn = () => {
    showBanner("Apple sign-in is coming soon!", "info");
  };

  return (
    <KeyboardAvoidingView
      behavior={KEYBOARD_AVOIDING_BEHAVIOR}
      style={[sharedStyles.screenContainer, { backgroundColor: theme.background }]}
    >
      <AuthHeroHeader
        title="Welcome back"
        subtitle="Sign in to continue chatting"
        gradientColors={theme.primaryGradient}
        icon={<MessageCircle size={28} color="white" />}
      />

      <ScrollView
        contentContainerStyle={[
          sharedStyles.formContainer,
          { paddingBottom: bottomInset + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <InputField
          label="EMAIL ADDRESS"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError(null);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
          error={emailError}
          disabled={loading}
        />

        <PasswordField
          label="PASSWORD"
          value={pass}
          onChangeText={(text) => {
            setPass(text);
            if (passError) setPassError(null);
          }}
          placeholder="Enter your password"
          error={passError}
          disabled={loading}
        />

        <TouchableOpacity
          onPress={() => router.push("/(auth)/forget-password")}
          disabled={loading}
        >
          <AppText
            variant="caption"
            weight="semibold"
            color={theme.primary}
            style={authStyles.forgotLinkText}
          >
            Forgot password?
          </AppText>
        </TouchableOpacity>

        <SubmitButton
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
        />

        <View style={authStyles.dividerRow}>
          <View style={[authStyles.dividerLine, { backgroundColor: theme.border }]} />
          <AppText
            variant="caption"
            color={theme.mutedForeground}
          >
            or continue with
          </AppText>
          <View style={[authStyles.dividerLine, { backgroundColor: theme.border }]} />
        </View>

        {/* Social Logins: Google on all devices; Apple ONLY on Apple devices */}
        <View style={authStyles.socialRow}>
          <TouchableOpacity
            style={[
              authStyles.socialBtn,
              { backgroundColor: theme.card, borderColor: theme.border },
              !isAppleDevice && { flex: 1 },
            ]}
            onPress={handleGoogleSignIn}
            disabled={loading}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Sign in with Google"
          >
            <AppText
              variant="subheading"
              weight="bold"
              color={BRAND_COLORS.google}
            >
              G
            </AppText>
            <AppText
              variant="body"
              weight="semibold"
              color={theme.foreground}
            >
              Google
            </AppText>
          </TouchableOpacity>

          {isAppleDevice && (
            <TouchableOpacity
              style={[
                authStyles.socialBtn,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
              onPress={handleAppleSignIn}
              disabled={loading}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Sign in with Apple"
            >
              <AppText
                variant="subheading"
                weight="bold"
                color={theme.foreground}
              >
                A
              </AppText>
              <AppText
                variant="body"
                weight="semibold"
                color={theme.foreground}
              >
                Apple
              </AppText>
            </TouchableOpacity>
          )}
        </View>

        <View style={sharedStyles.bottomPromptRow}>
          <AppText
            variant="body"
            color={theme.mutedForeground}
          >
            {"Don't have an account? "}
          </AppText>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <AppText
              variant="body"
              weight="bold"
              color={theme.primary}
            >
              Sign up
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
