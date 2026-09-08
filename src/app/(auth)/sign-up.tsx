import { AuthHeroHeader } from "@/components/auth/AuthHeroHeader";
import {
  AppText,
  InputField,
  PasswordField,
  SubmitButton,
} from "@/components/common";
import { useAuth } from "@/contexts/AuthContext";
import { useBanner } from "@/contexts/BannerContext";
import { useNetwork } from "@/contexts/NetworkContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { authStyles } from "@/styles";
import { sharedStyles } from "@/styles/sharedStyles";
import { getAuthErrorMessage } from "@/utils/authErrors";
import { KEYBOARD_AVOIDING_BEHAVIOR, devLog } from "@/utils/platform";
import {
  isUsernameTakenInFirebase,
  sanitizeNameInput,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validateUsernameFrontend,
} from "@/utils/validations";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

export default function SignUpScreen() {
  const { theme } = useAppTheme();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    pass: "",
    confirmPass: "",
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);

  const { signUpWithEmail } = useAuth();
  const { checkConnection } = useNetwork();
  const { showBanner } = useBanner();
  const { bottomInset } = useHeaderInset();

  const getPasswordStrength = (p: string) => {
    if (!p) return { label: "", color: "transparent", percentage: 0 };
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;

    if (s <= 1)
      return { label: "Weak", color: theme.destructive, percentage: 25 };
    if (s === 2) return { label: "Fair", color: "#f59e0b", percentage: 50 };
    if (s === 3) return { label: "Good", color: theme.accent, percentage: 75 };
    return { label: "Strong", color: "#10b981", percentage: 100 };
  };

  const strength = getPasswordStrength(form.pass);

  const update = (key: keyof typeof form, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const handleSignUp = async () => {
    const errs = {
      firstName: validateFirstName(form.firstName),
      lastName: validateLastName(form.lastName),
      username: validateUsernameFrontend(form.username),
      email: validateEmail(form.email),
      pass: validatePassword(form.pass),
      confirmPass: validateConfirmPassword(form.pass, form.confirmPass),
    };
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setLoading(true);
    try {
      if (!(await checkConnection())) return;

      const cleanUsername = form.username.trim().toLowerCase();
      if (await isUsernameTakenInFirebase(cleanUsername)) {
        showBanner("This username is already in use. Please try another one.");
        return;
      }

      const fn = form.firstName.trim();
      const ln = form.lastName.trim();
      const displayName = ln ? `${fn} ${ln}` : fn;

      await signUpWithEmail(
        form.email.trim(),
        form.pass,
        displayName,
        cleanUsername,
      );
      showBanner("Account created successfully!", "success");
      router.replace("/contacts");
    } catch (err: unknown) {
      devLog("Sign up error:", err);
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
        title="Create account"
        subtitle="Join thousands of people chatting"
        gradientColors={theme.greenGradient}
        showBackButton
        disabled={loading}
      />

      <ScrollView
        contentContainerStyle={[
          sharedStyles.formContainer,
          { paddingBottom: bottomInset + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <InputField
          label="FIRST NAME"
          value={form.firstName}
          onChangeText={(t) => update("firstName", sanitizeNameInput(t))}
          maxLength={25}
          placeholder="Enter your first name"
          error={errors.firstName}
          disabled={loading}
        />

        <InputField
          label="LAST NAME (OPTIONAL)"
          value={form.lastName}
          onChangeText={(t) => update("lastName", sanitizeNameInput(t))}
          maxLength={25}
          placeholder="Enter your last name (optional)"
          error={errors.lastName}
          disabled={loading}
        />

        <InputField
          label="USERNAME"
          value={form.username}
          onChangeText={(t) => update("username", t)}
          autoCapitalize="none"
          placeholder="Enter your username"
          error={errors.username}
          disabled={loading}
        />

        <InputField
          label="EMAIL ADDRESS"
          value={form.email}
          onChangeText={(t) => update("email", t)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
          error={errors.email}
          disabled={loading}
        />

        <PasswordField
          label="PASSWORD"
          value={form.pass}
          onChangeText={(t) => update("pass", t)}
          placeholder="Create a password"
          error={errors.pass}
          disabled={loading}
        />

        {form.pass.length > 0 && (
          <View style={authStyles.strengthContainer}>
            <View style={authStyles.strengthLabelRow}>
              <AppText
                variant="caption"
                weight="medium"
                color={theme.mutedForeground}
              >
                Password strength
              </AppText>
              <AppText variant="caption" weight="bold" color={strength.color}>
                {strength.label}
              </AppText>
            </View>
            <View style={[authStyles.strengthBarTrack, { backgroundColor: theme.muted }]}>
              <View
                style={{
                  height: "100%",
                  width: `${strength.percentage}%`,
                  backgroundColor: strength.color,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>
        )}

        <PasswordField
          label="CONFIRM PASSWORD"
          value={form.confirmPass}
          onChangeText={(t) => update("confirmPass", t)}
          placeholder="Confirm password"
          error={errors.confirmPass}
          disabled={loading}
        />

        <SubmitButton
          title="Create account"
          onPress={handleSignUp}
          loading={loading}
          gradientColors={theme.greenGradient}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
