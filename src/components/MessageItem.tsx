import React from "react";
import { CheckCheck } from "lucide-react-native";
import { View } from "react-native";

import { AppText } from "@/components/common";
import { OVERLAY_COLORS } from "@/constants/appTheme";
import { useAppTheme } from "@/contexts/ThemeContext";
import { chatStyles } from "@/styles";
import type { MessageItemProps } from "@/types";

export const MessageItem = React.memo(function MessageItem({
  msg,
  contactInitials: _contactInitials,
  contactColor: _contactColor,
}: MessageItemProps) {
  const isSent = msg.sent;
  const { theme } = useAppTheme();

  return (
    <View
      style={[
        chatStyles.messageRow,
        isSent ? chatStyles.messageRowSent : chatStyles.messageRowReceived,
      ]}
    >
      <View
        style={[
          chatStyles.messageBubble,
          isSent
            ? [chatStyles.sentBubble, { backgroundColor: theme.primary }]
            : [
                chatStyles.receivedBubble,
                { backgroundColor: theme.card, borderColor: theme.border },
              ],
        ]}
      >
        <AppText
          variant="body"
          color={isSent ? theme.white : theme.foreground}
        >
          {msg.text}
        </AppText>
        <View style={chatStyles.messageFooterRow}>
          <AppText
            variant="badge"
            color={isSent ? OVERLAY_COLORS.whiteMuted : theme.mutedForeground}
          >
            {msg.time}
          </AppText>
          {isSent && (
            <CheckCheck
              size={13}
              color={msg.read ? "#38bdf8" : OVERLAY_COLORS.whiteMuted}
            />
          )}
        </View>
      </View>
    </View>
  );
});
