import { OVERLAY_COLORS } from "@/constants/appTheme";
import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  screenHeaderGradient: {
    gap: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: OVERLAY_COLORS.whiteSubtle,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: OVERLAY_COLORS.whiteSubtle,
    alignItems: "center",
    justifyContent: "center",
  },

  // Sign-In Specifics
  forgotLinkText: {
    alignSelf: "flex-end",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.04)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },

  // Forget Password Specifics
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  forgotInstructionsText: {
    textAlign: "center",
  },

  // Sign-Up Password Strength Indicator
  strengthContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  strengthLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  strengthBarTrack: {
    height: 4,
    width: "100%",
    borderRadius: 2,
    overflow: "hidden",
  },
});


