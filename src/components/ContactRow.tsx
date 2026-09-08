import React from "react";
import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { Avatar } from "@/components/Avatar";
import { AppText } from "@/components/common";
import { contactsStyles } from "@/styles";
import type { ContactRowProps } from "@/types";
import { dismissKeyboard } from "@/utils/platform";

export const ContactRow = React.memo<ContactRowProps>(({ contact, theme }) => {
  return (
    <TouchableOpacity
      style={[contactsStyles.contactRow, { borderBottomColor: theme.borderSubtle }]}
      onPress={() => {
        dismissKeyboard();
        router.push({
          pathname: "/chat",
          params: { contactId: contact.uid },
        });
      }}
    >
      <Avatar
        initials={contact.initials}
        color={contact.color}
        size={50}
        online={contact.online}
        uri={contact.avatar}
      />

      <View style={contactsStyles.contactDetails}>
        <View style={contactsStyles.contactDetailsHeader}>
          <AppText
            variant="subheading"
            weight="bold"
            color={theme.foreground}
          >
            {contact.name}
          </AppText>
          <AppText
            variant="caption"
            color={
              contact.unread > 0
                ? theme.primary
                : theme.mutedForeground
            }
          >
            {contact.time}
          </AppText>
        </View>

        <View style={contactsStyles.contactDetailsSub}>
          <AppText
            variant="caption"
            color={theme.mutedForeground}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={contactsStyles.contactMessagePreview}
          >
            {contact.lastMessage}
          </AppText>
          {contact.unread > 0 && (
            <View style={[contactsStyles.unreadCountBadge, { backgroundColor: theme.primary }]}>
              <AppText
                variant="badge"
                weight="bold"
                color={theme.white}
                style={contactsStyles.unreadCountText}
              >
                {contact.unread}
              </AppText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

ContactRow.displayName = "ContactRow";
