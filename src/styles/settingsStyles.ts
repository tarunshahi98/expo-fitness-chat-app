import { BRAND_COLORS, OVERLAY_COLORS } from "@/constants/appTheme";
import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollFlex: {
    flex: 1,
  },
  // ─── Gradient Header ───────────────────────────────────────────────────────
  settingsHeaderGradient: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
  },
  settingsActionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingsHeaderBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: OVERLAY_COLORS.whiteSubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  // ─── User Photo ────────────────────────────────────────────────────────────
  settingsPhotoContainer: {
    position: "relative",
    marginBottom: 12,
  },
  settingsPhotoImg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: OVERLAY_COLORS.whiteBorder,
  },
  settingsPhotoPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsCameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  // ─── User Info Text ────────────────────────────────────────────────────────
  settingsEmailText: {
    color: OVERLAY_COLORS.whiteMuted,
    marginTop: 2,
  },
  settingsBioText: {
    color: OVERLAY_COLORS.whiteEmphasis,
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  // ─── Status & Joined Badges ────────────────────────────────────────────────
  headerMetadataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  settingsStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: OVERLAY_COLORS.whiteSubtle,
  },
  settingsStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  joinedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: OVERLAY_COLORS.whiteSubtle,
  },
  // ─── Settings List ─────────────────────────────────────────────────────────
  settingsBoxContainer: {
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 10,
  },
  settingsSectionTitle: {
    letterSpacing: 1,
    marginBottom: 2,
    paddingLeft: 4,
  },
  accountSectionTitle: {
    letterSpacing: 1,
    marginTop: 14,
    marginBottom: 2,
    paddingLeft: 4,
  },
  settingCardRow: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
});

// Backward-compatibility alias
export const profileStyles = settingsStyles;

export const editProfileStyles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  // ─── Avatar Section ────────────────────────────────────────────────────────
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatarImg: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarText: {
    color: "#ffffff",
  },
  avatarLoadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 48,
    backgroundColor: OVERLAY_COLORS.scrim,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  changePhotoBtn: {
    marginTop: 4,
  },
  photoFormatsText: {
    marginTop: 2,
  },
  // ─── Form Container & Fields ───────────────────────────────────────────────
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  sectionLabel: {
    letterSpacing: 0.8,
    paddingLeft: 4,
    marginBottom: 4,
  },
  sectionLabelSpaced: {
    marginTop: 12,
  },
  fieldContainer: {
    gap: 6,
  },
  // ─── Status Picker ─────────────────────────────────────────────────────────
  statusListContainer: {
    gap: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusRadioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  statusRadioActiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusEmoji: {
    marginRight: 8,
  },
  statusTextContent: {
    flex: 1,
  },
});

export const editSettingsStyles = editProfileStyles;

export const appearanceStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  themeCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    gap: 10,
  },
  themePreviewBox: {
    width: 44,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  themePreviewDark: {
    backgroundColor: "#081310",
  },
  themePreviewSystem: {
    flexDirection: "row",
  },
  themePreviewSystemLight: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  themePreviewSystemDark: {
    flex: 1,
    backgroundColor: "#081310",
  },
  cardContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  fontSizeLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  fontSizeSliderTrackWrapper: {
    flex: 1,
    height: 24,
    marginHorizontal: 16,
    justifyContent: "center",
    position: "relative",
  },
  fontSizeTrackLine: {
    height: 4,
    borderRadius: 2,
  },
  fontSizeDotsRow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fontSizeClickTarget: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  fontSizeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  fontSizeDotActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
    elevation: 2,
  },
  fontSizePreviewText: {
    textAlign: "center",
  },
  bubbleCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: "center",
    gap: 10,
  },
  bubblePreviewBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  wallpaperGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  wallpaperTouch: {
    width: "31%",
    aspectRatio: 1.6,
  },
  wallpaperGradientBox: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  wallpaperCheckCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: OVERLAY_COLORS.whiteEmphasis,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const blockedStyles = StyleSheet.create({
  warningCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  warningIcon: {
    marginRight: 8,
    marginTop: 1,
  },
  warningText: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    gap: 12,
  },
  emptyIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    gap: 2,
  },
  textContent: {
    flex: 1,
    marginLeft: 14,
  },
  rowSub: {
    marginTop: 1,
  },
  unblockBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  blockSomeoneBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    marginTop: 8,
  },
  blockSomeoneBtnIcon: {
    marginRight: 6,
  },
});

export const helpStyles = StyleSheet.create({
  supportRow: {
    flexDirection: "row",
    gap: 8,
  },
  supportCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  supportIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  faqList: {
    gap: 8,
  },
  faqCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  faqHeaderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  faqQuestionText: {
    flex: 1,
    paddingRight: 8,
  },
  faqContent: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  divider: {
    height: 1,
    marginBottom: 10,
  },
  footerCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  footerIcon: {
    marginRight: 8,
  },
  chevronClosed: {
    transform: [{ rotate: "0deg" }],
  },
  chevronOpen: {
    transform: [{ rotate: "180deg" }],
  },
});

export const mediaStyles = StyleSheet.create({
  storageCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  storageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categorySize: {
    marginTop: 1,
  },
});

export const notificationsStyles = StyleSheet.create({
  muteDurationContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
});

export const privacyStyles = StyleSheet.create({
  encryptionCard: {
    padding: 16,
    borderRadius: 16,
    gap: 6,
  },
  encryptionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  encryptionIcon: {
    marginRight: 6,
  },
});

export const rateStyles = StyleSheet.create({
  submittedContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
    gap: 16,
  },
  submittedIconBox: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  submittedSub: {
    textAlign: "center",
    maxWidth: 260,
  },
  submittedStarsRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  rateIntroCard: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  appIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    elevation: 3,
  },
  starsRow: {
    flexDirection: "row",
    gap: 6,
    marginVertical: 12,
  },
  starTouch: {
    padding: 4,
  },
  ratingTextLabel: {
    color: BRAND_COLORS.star,
  },
  feedbackContainer: {
    gap: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 4,
  },
  tagBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  appStoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 4,
  },
  appStoreBtnIcon: {
    marginRight: 6,
  },
});
