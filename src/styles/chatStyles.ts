import { OVERLAY_COLORS } from "@/constants/appTheme";
import { Platform, StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
  // ─── Layout ────────────────────────────────────────────────────────────────
  screenContainer: {
    flex: 1,
  },
  // ─── Header ────────────────────────────────────────────────────────────────
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backButtonTouch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeaderDetails: {
    flex: 1,
  },
  chatHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chatActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  // ─── Messages List ─────────────────────────────────────────────────────────
  messagesScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  // ─── Message Rows ──────────────────────────────────────────────────────────
  messageRow: {
    flexDirection: "row",
    width: "100%",
  },
  messageRowSent: {
    justifyContent: "flex-end",
  },
  messageRowReceived: {
    justifyContent: "flex-start",
  },
  // ─── Bubbles ───────────────────────────────────────────────────────────────
  messageBubble: {
    maxWidth: "72%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 1,
  },
  sentBubble: {
    borderTopRightRadius: 6,
  },
  receivedBubble: {
    borderTopLeftRadius: 6,
    borderWidth: 1,
  },
  // ─── Message Footer ────────────────────────────────────────────────────────
  messageFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  // ─── Input Bar ─────────────────────────────────────────────────────────────
  chatInputBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  chatTextInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    outlineWidth: 0,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : {}),
  },
  sendMicButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const contactsStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  // ─── Header ────────────────────────────────────────────────────────────────
  contactsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  contactsHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactsSubtitle: {
    marginTop: 1,
  },
  searchTrigger: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  // ─── Search Bar ────────────────────────────────────────────────────
  searchBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  searchBarInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 10,
    outlineWidth: 0,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : {}),
  },
  // ─── Scroll View ───────────────────────────────────────────────────────────
  scrollFlex: {
    flex: 1,
  },
  // ─── Empty State ───────────────────────────────────────────────────────────
  emptyListWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptySearchIcon: {
    marginBottom: 12,
  },
  // ─── Contact Rows ──────────────────────────────────────────────────────────
  contactRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  contactDetails: {
    flex: 1,
  },
  contactDetailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  contactDetailsSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactMessagePreview: {
    maxWidth: 200,
  },
  // ─── Unread Badge ──────────────────────────────────────────────────────────
  unreadCountBadge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  unreadCountText: {
    color: "#ffffff",
  },
});

export const menuStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: OVERLAY_COLORS.scrim,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  menuModalCard: {
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderWidth: 1,
    boxShadow: "0px -3px 6px rgba(0, 0, 0, 0.2)",
    elevation: 10,
  },
  menuHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  closeBtn: {
    padding: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 8,
  },
  optionIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionTextContent: {
    flex: 1,
  },
  optionTitle: {
    marginBottom: 2,
  },
});

export const avatarStyles = StyleSheet.create({
  avatarCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
  },
  avatarOnlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
});

