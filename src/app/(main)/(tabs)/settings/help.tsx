import { AppText, SectionLabel } from "@/components/common";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { useAppTheme } from "@/contexts/ThemeContext";
import { helpStyles } from "@/styles";
import { ChevronDown, Mail, MessageSquare, Zap } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function HelpScreen() {
  const { theme } = useAppTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I delete a message?",
      a: "Long-press any message bubble and tap 'Delete'. You can delete for yourself or for everyone within 48 hours of sending.",
    },
    {
      q: "Can I use Pulse on multiple devices?",
      a: "Yes! Sign in on up to 5 devices. All messages sync instantly across all sessions.",
    },
    {
      q: "How do I create a group chat?",
      a: "On the contacts screen, tap the compose icon and select 'New Group'. Add up to 256 members.",
    },
    {
      q: "Are my messages end-to-end encrypted?",
      a: "Absolutely. All direct messages and group chats use end-to-end encryption by default. Even we can't read them.",
    },
    {
      q: "How do I report a user?",
      a: "Open the chat, tap the three-dot menu, and select 'Report'. Our safety team reviews all reports within 24 hours.",
    },
  ];

  return (
    <SubScreenShell title="Help & Support">
      {/* Support Methods */}
      <View style={helpStyles.supportRow}>
        {/* Live Chat */}
        <TouchableOpacity
          style={[
            helpStyles.supportCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
          activeOpacity={0.7}
        >
          <View
            style={[
              helpStyles.supportIconBox,
              { backgroundColor: theme.secondary },
            ]}
          >
            <MessageSquare size={20} color={theme.primary} />
          </View>
          <AppText variant="subheading" weight="bold" color={theme.foreground}>
            Live Chat
          </AppText>
          <AppText variant="caption" color={theme.mutedForeground}>
            Avg. 2 min
          </AppText>
        </TouchableOpacity>

        {/* Email Us */}
        <TouchableOpacity
          style={[
            helpStyles.supportCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
          activeOpacity={0.7}
        >
          <View
            style={[
              helpStyles.supportIconBox,
              { backgroundColor: theme.secondary },
            ]}
          >
            <Mail size={20} color={theme.primary} />
          </View>
          <AppText variant="subheading" weight="bold" color={theme.foreground}>
            Email Us
          </AppText>
          <AppText variant="caption" color={theme.mutedForeground}>
            support@
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Frequently Asked Questions */}
      <SectionLabel label="Frequently Asked Questions" />
      <View style={helpStyles.faqList}>
        {faqs.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <View
              key={i}
              style={[
                helpStyles.faqCard,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <TouchableOpacity
                style={helpStyles.faqHeaderBtn}
                onPress={() => setOpenFaq(isOpen ? null : i)}
                activeOpacity={0.7}
              >
                <AppText
                  variant="body"
                  weight="semibold"
                  color={theme.foreground}
                  style={helpStyles.faqQuestionText}
                >
                  {faq.q}
                </AppText>
                <View
                  style={
                    isOpen ? helpStyles.chevronOpen : helpStyles.chevronClosed
                  }
                >
                  <ChevronDown size={16} color={theme.mutedForeground} />
                </View>
              </TouchableOpacity>
              {isOpen && (
                <View style={helpStyles.faqContent}>
                  <View
                    style={[
                      helpStyles.divider,
                      { backgroundColor: theme.border },
                    ]}
                  />
                  <AppText variant="caption" color={theme.mutedForeground}>
                    {faq.a}
                  </AppText>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Footer Info */}
      <View
        style={[
          helpStyles.footerCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Zap size={16} color={theme.primary} style={helpStyles.footerIcon} />
        <AppText variant="caption" color={theme.mutedForeground}>
          Version 4.2.1 ·{" "}
          <AppText
            inline
            variant="caption"
            weight="semibold"
            color={theme.primary}
          >
            Check for updates
          </AppText>
        </AppText>
      </View>
    </SubScreenShell>
  );
}
