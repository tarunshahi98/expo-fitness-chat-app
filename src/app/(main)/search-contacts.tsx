import { ContactRow } from "@/components/ContactRow";
import { AppText } from "@/components/common";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useContactsList } from "@/hooks/useContactsList";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { contactsStyles } from "@/styles";
import type { Contact } from "@/types";
import { dismissKeyboard } from "@/utils/platform";
import { router } from "expo-router";
import { ArrowLeft, Search, X } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";

const keyExtractor = (item: Contact) => item.uid || String(item.id);

export default function SearchContactsScreen() {
  const [inputQuery, setInputQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { headerTopPadding, bottomInset } = useHeaderInset({
    webPadding: 24,
    nativeOffset: 8,
  });
  const { theme } = useAppTheme();
  const { searchContacts } = useContactsList();

  const handleSearch = useCallback(() => {
    dismissKeyboard();
    setSubmittedQuery(inputQuery.trim());
  }, [inputQuery]);

  const handleClear = () => {
    setInputQuery("");
    setSubmittedQuery("");
  };

  const searchResults = useMemo(
    () => (submittedQuery ? searchContacts(submittedQuery) : []),
    [submittedQuery, searchContacts],
  );

  return (
    <View
      style={[
        contactsStyles.screenContainer,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Header */}
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity
            onPress={() => {
              dismissKeyboard();
              router.back();
            }}
            style={{ padding: 6 }}
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={22} color={theme.foreground} />
          </TouchableOpacity>
          <View>
            <AppText variant="heading" weight="bold" color={theme.foreground}>
              Search Contacts
            </AppText>
            <AppText
              variant="caption"
              color={theme.mutedForeground}
              style={contactsStyles.contactsSubtitle}
            >
              {submittedQuery
                ? `${searchResults.length} ${searchResults.length === 1 ? "result" : "results"} found`
                : "Find people to chat with"}
            </AppText>
          </View>
        </View>

        {/* Search Input Bar */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={[
              contactsStyles.searchBarWrapper,
              { backgroundColor: theme.inputBackground, flex: 1 },
            ]}
          >
            <Search size={17} color={theme.mutedForeground} />
            <TextInput
              style={[
                contactsStyles.searchBarInput,
                { color: theme.foreground },
              ]}
              placeholder="Type name, email, or username..."
              placeholderTextColor={theme.mutedForeground}
              value={inputQuery}
              onChangeText={(text) => {
                setInputQuery(text);
                if (!text) setSubmittedQuery("");
              }}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {!!inputQuery && (
              <TouchableOpacity onPress={handleClear} style={{ padding: 4 }}>
                <X size={16} color={theme.mutedForeground} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSearch}
            style={{
              backgroundColor: theme.primary,
              paddingHorizontal: 14,
              paddingVertical: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
            activeOpacity={0.8}
          >
            <Search size={16} color="#FFFFFF" />
            <AppText variant="body" weight="semibold" color="#FFFFFF">
              Search
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Results / Empty State */}
      <FlatList
        data={searchResults}
        renderItem={({ item }) => <ContactRow contact={item} theme={theme} />}
        keyExtractor={keyExtractor}
        style={contactsStyles.scrollFlex}
        contentContainerStyle={[
          { paddingBottom: bottomInset + 20 },
          !searchResults.length && { flexGrow: 1, justifyContent: "center" },
        ]}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListEmptyComponent={
          <View style={contactsStyles.emptyListWrapper}>
            <Search
              size={44}
              color={theme.mutedForeground}
              style={contactsStyles.emptySearchIcon}
            />
            <AppText variant="body" color={theme.mutedForeground}>
              {!submittedQuery
                ? "Type a name, email, or username and tap Search"
                : `No contacts found matching "${submittedQuery}"`}
            </AppText>
          </View>
        }
      />
    </View>
  );
}
