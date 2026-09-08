import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    gap: 48,
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 24,
  },
  eyeIconTouch: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  submitBtnTouch: {
    width: "100%",
    borderRadius: 16,
  },
  submitBtnGradient: {
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  bottomPromptRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});


