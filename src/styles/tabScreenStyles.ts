import { StyleSheet } from "react-native";

export const tabScreenStyles = StyleSheet.create({
  // ─── Screen Shell ──────────────────────────────────────────────────────────
  screenContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },

  // ─── Header Common ─────────────────────────────────────────────────────────
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Segmented Tabs (Explore) ──────────────────────────────────────────────
  segmentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  segmentTab: {
    paddingBottom: 12,
    alignItems: "center",
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  // ─── Fitness Screen ────────────────────────────────────────────────────────
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  metricValue: {
    marginTop: 4,
  },
  metricTarget: {
    marginTop: 2,
  },
  progressBarTrack: {
    height: 6,
    width: "100%",
    borderRadius: 9999,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 9999,
  },
  workoutCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
  },
  workoutHeader: {
    marginBottom: 16,
  },
  workoutItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  workoutInfo: {
    flex: 1,
    marginRight: 12,
  },
  workoutActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Explore Screen ────────────────────────────────────────────────────────
  feedCard: {
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    gap: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postMediaPlaceholder: {
    height: 180,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingTop: 4,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 4,
  },
  shareBtn: {
    marginLeft: "auto",
  },
  lifestyleFeatureCard: {
    height: 190,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 16,
  },
  lifestylePill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  lifestyleGrid: {
    flexDirection: "row",
    gap: 12,
  },
  lifestyleCard: {
    flex: 1,
    minHeight: 140,
    borderRadius: 20,
    padding: 16,
    justifyContent: "flex-end",
    borderWidth: 1,
  },
  newsCard: {
    flexDirection: "row",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    gap: 14,
    alignItems: "center",
  },
  newsContent: {
    flex: 1,
  },
  newsMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  newsTagPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  newsThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Shopping Screen ───────────────────────────────────────────────────────
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  productCard: {
    width: "48%",
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
  },
  productImageWrapper: {
    height: 120,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 10,
  },
  wishlistBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cartBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  createFab: {
    position: "absolute",
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
    elevation: 6,
    zIndex: 99,
  },
});
