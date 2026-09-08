import { ContactRow } from "@/components/ContactRow";
import { AppText } from "@/components/common";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useContactsList } from "@/hooks/useContactsList";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { contactsStyles } from "@/styles";
import type { Contact } from "@/types";
import { router } from "expo-router";
import { Search } from "lucide-react-native";
import { useCallback } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native";

export default function ContactsScreen() {
  const { headerTopPadding } = useHeaderInset({
    webPadding: 24,
    nativeOffset: 8,
  });
  const { theme } = useAppTheme();
  const { activeConversations, unreadConversationsCount } = useContactsList();

  const renderItem: ListRenderItem<Contact> = useCallback(
    ({ item }) => <ContactRow contact={item} theme={theme} />,
    [theme],
  );

  const keyExtractor = useCallback(
    (item: Contact) => item.uid || String(item.id),
    [],
  );

  return (
    <View
      style={[
        contactsStyles.screenContainer,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Header Panel */}
      <View
        style={[
          contactsStyles.contactsHeader,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
            paddingTop: headerTopPadding,
          },
        ]}
      >
        <View style={contactsStyles.contactsHeaderTop}>
          <View>
            <AppText
              variant="heading"
              weight="bold"
              color={theme.foreground}
            >
              Messages
            </AppText>
            <AppText
              variant="caption"
              color={theme.mutedForeground}
              style={contactsStyles.contactsSubtitle}
            >
              {unreadConversationsCount} unread conversations
            </AppText>
          </View>

          <TouchableOpacity
            style={[
              contactsStyles.searchTrigger,
              {
                backgroundColor: theme.muted,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            onPress={() => router.push("/search-contacts")}
            accessibilityLabel="Search contacts"
            accessibilityRole="button"
          >
            <Search size={18} color={theme.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contacts FlatList */}
      {activeConversations.length === 0 ? (
        <View style={contactsStyles.emptyListWrapper}>
          <Search
            size={40}
            color={theme.mutedForeground}
            style={contactsStyles.emptySearchIcon}
          />
          <AppText
            variant="body"
            color={theme.mutedForeground}
          >
            No conversations found
          </AppText>
        </View>
      ) : (
        <FlatList
          data={activeConversations}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={contactsStyles.scrollFlex}
          contentContainerStyle={{ paddingBottom: 20 }}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
}
