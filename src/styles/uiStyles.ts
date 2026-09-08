import { OVERLAY_COLORS } from "@/constants/appTheme";
import { StyleSheet } from "react-native";

export const subScreenStyles = StyleSheet.create({
  shellContainer: {
    flex: 1,
  },
  shellHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  headerSpacer: {
    width: 36,
    height: 36,
  },
  shellTitle: {
    textAlign: "center",
  },
  shellScrollView: {
    flex: 1,
  },
  shellContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
});

export const settingsRowStyles = StyleSheet.create({
  groupContainer: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowBorder: {
    borderTopWidth: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textContent: {
    flex: 1,
  },
  rowSub: {
    marginTop: 1,
  },
});

export const bannerStyles = StyleSheet.create({
  bannerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    paddingBottom: 10,
    paddingHorizontal: 16,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 8,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  bannerText: {
    flex: 1,
    textAlign: "left",
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: OVERLAY_COLORS.whiteSubtle,
    marginRight: 8,
  },
  actionText: {
    color: "#ffffff",
  },
  closeBtn: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: OVERLAY_COLORS.whiteSubtle,
  },
});

export const sectionLabelStyles = StyleSheet.create({
  sectionLabel: {
    letterSpacing: 0.8,
    paddingLeft: 4,
    marginBottom: 6,
    marginTop: 12,
  },
});

export const toggleStyles = StyleSheet.create({
  toggleContainer: {
    width: 44,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  toggleCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    boxShadow: "0px 1px 1.5px rgba(0, 0, 0, 0.2)",
    elevation: 2,
  },
});
