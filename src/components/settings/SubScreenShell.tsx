import { AppText } from "@/components/common";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { subScreenStyles } from "@/styles";
import type { SubScreenShellProps } from "@/types";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export function SubScreenShell({
  title,
  contentContainerStyle,
  children,
}: SubScreenShellProps) {
  const { headerTopPadding, bottomInset } = useHeaderInset({
    webPadding: 16,
    nativeOffset: 8,
  });
  const { theme } = useAppTheme();

  const flattened = StyleSheet.flatten(contentContainerStyle);
  const customPaddingBottom = flattened?.paddingBottom;
  const resolvedPaddingBottom =
    typeof customPaddingBottom === "number"
      ? Math.max(bottomInset + 32, customPaddingBottom)
      : bottomInset + 32;

  return (
    <View
      style={[
        subScreenStyles.shellContainer,
        { backgroundColor: theme.background },
      ]}
    >
      <View
        style={[
          subScreenStyles.shellHeader,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
            paddingTop: headerTopPadding,
          },
        ]}
      >
        <TouchableOpacity
          style={[
            subScreenStyles.backBtn,
            { backgroundColor: theme.secondary },
          ]}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={20} color={theme.foreground} />
        </TouchableOpacity>
        <AppText
          variant="subheading"
          weight="bold"
          color={theme.foreground}
          style={subScreenStyles.shellTitle}
        >
          {title}
        </AppText>
        <View style={subScreenStyles.headerSpacer} />
      </View>
      <ScrollView
        style={subScreenStyles.shellScrollView}
        contentContainerStyle={[
          subScreenStyles.shellContent,
          contentContainerStyle,
          { paddingBottom: resolvedPaddingBottom },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}
