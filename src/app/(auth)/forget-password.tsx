import { AuthHeroHeader } from "@/components/auth/AuthHeroHeader";
import { AppText, InputField, SubmitButton } from "@/components/common";
import { useAuth } from "@/contexts/AuthContext";
import { useBanner } from "@/contexts/BannerContext";
import { useNetwork } from "@/contexts/NetworkContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { authStyles } from "@/styles";
import { sharedStyles } from "@/styles/sharedStyles";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { KEYBOARD_AVOIDING_BEHAVIOR, devLog } from "@/utils/platform";
import { validateEmail } from "@/utils/validations";
import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function ForgetPasswordScreen() {
  const { theme } = useAppTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { resetPassword } = useAuth();
  const { checkConnection } = useNetwork();
  const { showBanner } = useBanner();
  const { bottomInset } = useHeaderInset();

  const handleResetPassword = async () => {
    setEmailError(null);
    const trimmedEmail = email.trim();

    const emErr = validateEmail(trimmedEmail);
    if (emErr) {
      setEmailError(emErr);
      return;
    }

    setLoading(true);
    try {
      if (!(await checkConnection())) return;

      await resetPassword(trimmedEmail);
      showBanner("Password reset email sent!", "success");
      router.back();
    } catch (err: unknown) {
      devLog("Password reset error:", err);
      showBanner(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={KEYBOARD_AVOIDING_BEHAVIOR}
      style={[sharedStyles.screenContainer, { backgroundColor: theme.background }]}
    >
      <AuthHeroHeader
        title="Reset password"
        subtitle="We'll send you a reset link"
        gradientColors={theme.greenGradient}
        showBackButton
        disabled={loading}
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
        <View style={[authStyles.lockIconContainer, { backgroundColor: theme.secondary }]}>
          <Lock size={36} color={theme.primary} />
        </View>
        <AppText
          variant="body"
          color={theme.mutedForeground}
          style={authStyles.forgotInstructionsText}
        >
          Enter the email address associated with your account and we will send
          you a link to reset your password.
        </AppText>

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

        <SubmitButton
          title="Send Reset Link"
          onPress={handleResetPassword}
          loading={loading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
