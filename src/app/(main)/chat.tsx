import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Ban,
  Flag,
  MoreVertical,
  Send,
  X,
} from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Avatar } from "@/components/Avatar";
import { MessageItem } from "@/components/MessageItem";
import { AppText } from "@/components/common";
import { useAuth } from "@/contexts/AuthContext";
import { useBanner } from "@/contexts/BannerContext";
import { useNetwork } from "@/contexts/NetworkContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { chatRepo, contactRepo, userRepo } from "@/repository";
import { extractInitials } from "@/repository/contactRepository";
import { chatStyles, menuStyles } from "@/styles";
import type { Message, UserProfile } from "@/types";
import { showAlert } from "@/utils/alert";
import {
  IS_WEB,
  KEYBOARD_AVOIDING_BEHAVIOR,
  dismissKeyboard,
} from "@/utils/platform";

const isNumericId = (id: string) => /^\d+$/.test(id);
const keyExtractor = (item: Message) => item.id;

export default function ChatScreen() {
  const { contactId } = useLocalSearchParams<{ contactId?: string }>();
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const { checkConnection } = useNetwork();
  const { showBanner } = useBanner();
  const { headerTopPadding, bottomInset } = useHeaderInset({
    webPadding: 12,
    nativeOffset: 8,
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [liveProfile, setLiveProfile] = useState<UserProfile | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!contactId || isNumericId(contactId)) return;
    return userRepo.subscribeToProfile(
      contactId,
      (prof) => prof && setLiveProfile(prof),
      () => {},
    );
  }, [contactId]);

  const contact = useMemo(() => {
    const base = contactRepo.getContactById(contactId || 1);
    if (!liveProfile) return base;

    const name =
      liveProfile.displayName || liveProfile.email?.split("@")[0] || base.name;
    return {
      ...base,
      ...liveProfile,
      name,
      avatar: liveProfile.photoURL || base.avatar,
      initials: name ? extractInitials(name) : base.initials,
      lastMessage: liveProfile.bio || base.lastMessage,
    };
  }, [contactId, liveProfile]);

  const conversationId = useMemo(
    () =>
      chatRepo.getConversationId(
        user?.uid || "user-active",
        contactId || contact.uid,
      ),
    [user?.uid, contactId, contact.uid],
  );

  const { messages, isLoading, error, sendMessage } =
    useChatMessages(conversationId);

  const invertedMessages = useMemo(
    () => messages.slice().reverse(),
    [messages],
  );

  useEffect(() => {
    if (user?.uid && conversationId) {
      chatRepo.markConversationAsRead(conversationId, user.uid);
    }
  }, [conversationId, user?.uid, messages.length]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    try {
      if (!(await checkConnection())) return;
      setInput("");
      await sendMessage(text);
    } catch (err) {
      showAlert(
        "Send Error",
        err instanceof Error ? err.message : "Failed to send message.",
      );
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const handleAction = (
    title: string,
    msg: string,
    btn: string,
    success: string,
  ) => {
    setMenuVisible(false);
    showAlert(title, msg, [
      { text: "Cancel", style: "cancel" },
      {
        text: btn,
        style: "destructive",
        onPress: () => showBanner(success, "success"),
      },
    ]);
  };

  const renderItem: ListRenderItem<Message> = useCallback(
    ({ item }) => (
      <MessageItem
        msg={item}
        contactInitials={contact.initials}
        contactColor={contact.color}
      />
    ),
    [contact.initials, contact.color],
  );

  if (!contact) {
    return (
      <View
        style={[
          chatStyles.screenContainer,
          {
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <AppText variant="body" color={theme.mutedForeground}>
          Contact not found
        </AppText>
        <TouchableOpacity
          style={{ marginTop: 12 }}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/contacts");
            }
          }}
          accessibilityRole="button"
        >
          <AppText variant="body" weight="semibold" color={theme.primary}>
            Go back
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }

  const menuOptions = [
    {
      id: "block",
      title: "Block User",
      desc: "Stop receiving messages or updates from this contact",
      icon: Ban,
      color: theme.destructive,
      bg: theme.destructiveSurface,
      action: () =>
        handleAction(
          "Block User",
          `Block ${contact.name}? You will no longer receive messages.`,
          "Block",
          `${contact.name} blocked.`,
        ),
    },
    {
      id: "report",
      title: "Report User",
      desc: "Report inappropriate behavior, spam, or harassment",
      icon: Flag,
      color: "#f97316",
      bg: "rgba(249, 115, 22, 0.1)",
      action: () =>
        handleAction(
          "Report User",
          `Report ${contact.name} for inappropriate content?`,
          "Report",
          "Report submitted.",
        ),
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={KEYBOARD_AVOIDING_BEHAVIOR}
      style={{ flex: 1 }}
    >
      <View
        style={[
          chatStyles.screenContainer,
          { backgroundColor: theme.background },
        ]}
      >
        {/* Header */}
        <View
          style={[
            chatStyles.chatHeader,
            {
              backgroundColor: theme.card,
              borderBottomColor: theme.border,
              paddingTop: headerTopPadding,
            },
          ]}
        >
          <TouchableOpacity
            style={chatStyles.backButtonTouch}
            onPress={() => {
              dismissKeyboard();
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/contacts");
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={20} color={theme.foreground} />
          </TouchableOpacity>

          <Avatar
            initials={contact.initials}
            color={contact.color}
            size={40}
            online={contact.online}
            uri={contact.avatar}
          />

          <View style={chatStyles.chatHeaderDetails}>
            <AppText
              variant="subheading"
              weight="bold"
              color={theme.foreground}
            >
              {contact.name}
            </AppText>
            <AppText
              variant="badge"
              color={contact.online ? theme.accent : theme.mutedForeground}
            >
              {contact.online ? "Online" : "Last seen recently"}
            </AppText>
          </View>

          <TouchableOpacity
            style={chatStyles.chatActionBtn}
            onPress={() => {
              dismissKeyboard();
              setMenuVisible(true);
            }}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Conversation options"
          >
            <MoreVertical size={20} color={theme.foreground} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        {isLoading ? (
          <View style={chatStyles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.primary} />
          </View>
        ) : error && !messages.length ? (
          <View style={chatStyles.emptyContainer}>
            <AppText variant="body" color={theme.destructive}>
              Failed to load messages. Please check your connection.
            </AppText>
          </View>
        ) : (
          <FlatList
            data={invertedMessages}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            inverted
            initialNumToRender={15}
            maxToRenderPerBatch={10}
            windowSize={5}
            contentContainerStyle={[
              chatStyles.messagesScrollContainer,
              !messages.length && {
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <AppText variant="body" color={theme.mutedForeground}>
                No messages yet. Say hello! 👋
              </AppText>
            }
          />
        )}

        {/* Input Bar */}
        <View
          style={[
            chatStyles.chatInputBarContainer,
            {
              backgroundColor: theme.card,
              borderTopColor: theme.border,
              paddingBottom: IS_WEB ? 12 : Math.max(bottomInset, 12),
            },
          ]}
        >
          <TextInput
            style={[
              chatStyles.chatTextInput,
              {
                backgroundColor: theme.secondary,
                color: theme.foreground,
              },
            ]}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor={theme.mutedForeground}
            onSubmitEditing={send}
            returnKeyType="send"
            editable={!sending}
          />

          <TouchableOpacity
            style={[
              chatStyles.sendMicButton,
              {
                backgroundColor: input.trim() ? theme.primary : theme.muted,
              },
            ]}
            onPress={send}
            disabled={!input.trim() || sending}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <Send size={16} color="white" />
          </TouchableOpacity>
        </View>

        {/* Options Modal */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableOpacity
            style={menuStyles.backdrop}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation?.()}
              style={[
                menuStyles.menuModalCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  paddingBottom: Math.max(bottomInset, 16) + 12,
                },
              ]}
            >
              <View
                style={[
                  menuStyles.menuHeaderRow,
                  { borderBottomColor: theme.borderSubtle },
                ]}
              >
                <AppText
                  variant="subheading"
                  weight="bold"
                  color={theme.foreground}
                >
                  Options for {contact.name}
                </AppText>
                <TouchableOpacity
                  onPress={() => setMenuVisible(false)}
                  style={menuStyles.closeBtn}
                  accessibilityRole="button"
                >
                  <X size={18} color={theme.mutedForeground} />
                </TouchableOpacity>
              </View>

              {/* Dynamic Menu Items */}
              {menuOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={menuStyles.optionRow}
                  onPress={opt.action}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                >
                  <View
                    style={[
                      menuStyles.optionIconBox,
                      { backgroundColor: opt.bg },
                    ]}
                  >
                    <opt.icon size={18} color={opt.color} />
                  </View>
                  <View style={menuStyles.optionTextContent}>
                    <AppText
                      variant="body"
                      weight="semibold"
                      color={opt.color}
                      style={menuStyles.optionTitle}
                    >
                      {opt.title}
                    </AppText>
                    <AppText variant="caption" color={theme.mutedForeground}>
                      {opt.desc}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}
