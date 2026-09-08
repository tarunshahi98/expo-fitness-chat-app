import { AppText } from "@/components/common";
import { useBanner } from "@/contexts/BannerContext";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { tabScreenStyles } from "@/styles/tabScreenStyles";
import { LinearGradient } from "expo-linear-gradient";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Share2,
} from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

type ExploreTab = "For You" | "Lifestyle" | "News";
const TABS: ExploreTab[] = ["For You", "Lifestyle", "News"];

interface PostItem {
  id: string;
  author: string;
  timeAgo: string;
  content: string;
  likesCount: number;
  isLiked: boolean;
  commentsCount: number;
  avatarColor: string;
}

const INITIAL_POSTS: PostItem[] = [
  {
    id: "post-1",
    author: "Sarah Jenkins",
    timeAgo: "2 hours ago",
    content:
      "Just finished setting up the new workspace! Productivity is about to go through the roof. 🚀",
    likesCount: 245,
    isLiked: false,
    commentsCount: 12,
    avatarColor: "#3b82f6",
  },
  {
    id: "post-2",
    author: "Marcus Ray",
    timeAgo: "5 hours ago",
    content:
      "Anyone going to the design conference next week? Let's connect! 🎨",
    likesCount: 89,
    isLiked: false,
    commentsCount: 34,
    avatarColor: "#059669",
  },
];

const NEWS_ITEMS = [
  {
    id: "news-1",
    tag: "Tech",
    title: "The Future of AI in Modern Mobile Applications",
    time: "2h ago",
  },
  {
    id: "news-2",
    tag: "Finance",
    title: "Global Markets Rally Amid Positive Tech Growth",
    time: "4h ago",
  },
  {
    id: "news-3",
    tag: "Science",
    title: "New Breakthroughs in Quantum Computing Announced",
    time: "6h ago",
  },
  {
    id: "news-4",
    tag: "World",
    title: "Global Climate Summit Concludes with Historic Action",
    time: "8h ago",
  },
];

export default function ExploreScreen() {
  const { theme } = useAppTheme();
  const { showBanner } = useBanner();
  const { headerTopPadding, bottomInset } = useHeaderInset({
    webPadding: 24,
    nativeOffset: 8,
  });

  const [activeTab, setActiveTab] = useState<ExploreTab>("For You");
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);

  const handleCreatePost = useCallback(() => {
    showBanner("Create post coming soon!", "info");
  }, [showBanner]);

  const handleToggleLike = useCallback((id: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likesCount: nextLiked
            ? p.likesCount + 1
            : Math.max(0, p.likesCount - 1),
        };
      }),
    );
  }, []);

  const renderPostItem: ListRenderItem<PostItem> = useCallback(
    ({ item }) => (
      <View
        style={[
          tabScreenStyles.feedCard,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <View style={tabScreenStyles.postHeader}>
          <View style={tabScreenStyles.authorRow}>
            <View
              style={[
                tabScreenStyles.authorAvatar,
                { backgroundColor: item.avatarColor },
              ]}
            />
            <View>
              <AppText
                variant="subheading"
                weight="bold"
                color={theme.foreground}
              >
                {item.author}
              </AppText>
              <AppText variant="caption" color={theme.mutedForeground}>
                {item.timeAgo}
              </AppText>
            </View>
          </View>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel="More options"
          >
            <MoreHorizontal size={20} color={theme.mutedForeground} />
          </TouchableOpacity>
        </View>

        <AppText
          variant="body"
          color={theme.foreground}
          style={{ lineHeight: 20 }}
        >
          {item.content}
        </AppText>

        <View
          style={[
            tabScreenStyles.postMediaPlaceholder,
            {
              backgroundColor: theme.muted,
              borderColor: theme.borderSubtle,
            },
          ]}
        >
          <AppText variant="caption" color={theme.mutedForeground}>
            Media attachment
          </AppText>
        </View>

        <View style={tabScreenStyles.postActions}>
          <TouchableOpacity
            style={tabScreenStyles.actionBtn}
            onPress={() => handleToggleLike(item.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={item.isLiked ? "Unlike post" : "Like post"}
            accessibilityState={{ selected: item.isLiked }}
          >
            <Heart
              size={18}
              color={item.isLiked ? theme.destructive : theme.mutedForeground}
              fill={item.isLiked ? theme.destructive : "transparent"}
            />
            <AppText
              variant="caption"
              weight="bold"
              color={
                item.isLiked ? theme.destructive : theme.mutedForeground
              }
            >
              {item.likesCount}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={tabScreenStyles.actionBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Comments"
          >
            <MessageCircle size={18} color={theme.mutedForeground} />
            <AppText
              variant="caption"
              weight="bold"
              color={theme.mutedForeground}
            >
              {item.commentsCount}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[tabScreenStyles.actionBtn, tabScreenStyles.shareBtn]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Share post"
          >
            <Share2 size={18} color={theme.mutedForeground} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [theme, handleToggleLike],
  );

  return (
    <View
      style={[
        tabScreenStyles.screenContainer,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Top Header */}
      <View
        style={[
          tabScreenStyles.headerContainer,
          {
            backgroundColor: theme.card,
            borderBottomColor: theme.border,
            paddingTop: headerTopPadding,
          },
        ]}
      >
        <View style={tabScreenStyles.headerRow}>
          <AppText variant="heading" weight="bold" color={theme.foreground}>
            Explore
          </AppText>
        </View>

        {/* Tab Segment Switcher */}
        <View
          style={[
            tabScreenStyles.segmentContainer,
            { borderBottomColor: theme.borderSubtle },
          ]}
          accessibilityRole="tablist"
        >
          {TABS.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={tabScreenStyles.segmentTab}
                accessibilityRole="tab"
                accessibilityState={{ selected: isSelected }}
              >
                <AppText
                  variant="subheading"
                  weight={isSelected ? "bold" : "medium"}
                  color={isSelected ? theme.foreground : theme.mutedForeground}
                >
                  {tab}
                </AppText>
                {isSelected && (
                  <View
                    style={[
                      tabScreenStyles.activeIndicator,
                      { backgroundColor: theme.primary },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Feed Area */}
      {activeTab === "For You" ? (
        <View style={tabScreenStyles.screenContainer}>
          <FlatList
            data={posts}
            renderItem={renderPostItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[
              tabScreenStyles.scrollContent,
              { paddingBottom: bottomInset + 88 },
            ]}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity
            style={[
              tabScreenStyles.createFab,
              {
                backgroundColor: theme.accent,
                bottom: bottomInset + 20,
              },
            ]}
            onPress={handleCreatePost}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Create post"
          >
            <Plus
              size={26}
              color={theme.accentForeground || "#ffffff"}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>
      ) : activeTab === "Lifestyle" ? (
        <ScrollView
          contentContainerStyle={[
            tabScreenStyles.scrollContent,
            { paddingBottom: 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Featured Hero Banner */}
          <LinearGradient
            colors={["#f97316", "#e11d48"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tabScreenStyles.lifestyleFeatureCard}
          >
            <View
              style={[
                tabScreenStyles.lifestylePill,
                { backgroundColor: "rgba(255, 255, 255, 0.25)" },
              ]}
            >
              <AppText variant="badge" weight="bold" color="#ffffff">
                TRAVEL
              </AppText>
            </View>
            <AppText variant="subheading" weight="heavy" color="#ffffff">
              10 Hidden Gems in Kyoto for your next adventure
            </AppText>
          </LinearGradient>

          {/* 2-Column Lifestyle Cards */}
          <View style={tabScreenStyles.lifestyleGrid}>
            <View
              style={[
                tabScreenStyles.lifestyleCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <AppText
                variant="body"
                weight="bold"
                color={theme.foreground}
              >
                Morning Routines of Highly Effective People
              </AppText>
            </View>

            <View
              style={[
                tabScreenStyles.lifestyleCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <AppText
                variant="body"
                weight="bold"
                color={theme.foreground}
              >
                Minimalist Living: A Starter Guide
              </AppText>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={[
            tabScreenStyles.scrollContent,
            { paddingBottom: 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {NEWS_ITEMS.map((item) => (
            <View
              key={item.id}
              style={[
                tabScreenStyles.newsCard,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={tabScreenStyles.newsContent}>
                <View style={tabScreenStyles.newsMeta}>
                  <View
                    style={[
                      tabScreenStyles.newsTagPill,
                      { backgroundColor: theme.surface },
                    ]}
                  >
                    <AppText
                      variant="badge"
                      weight="bold"
                      color={theme.primary}
                    >
                      {item.tag}
                    </AppText>
                  </View>
                  <AppText variant="caption" color={theme.mutedForeground}>
                    {item.time}
                  </AppText>
                </View>
                <AppText
                  variant="subheading"
                  weight="bold"
                  color={theme.foreground}
                  numberOfLines={2}
                >
                  {item.title}
                </AppText>
              </View>
              <View
                style={[
                  tabScreenStyles.newsThumbnail,
                  {
                    backgroundColor: theme.muted,
                    borderColor: theme.borderSubtle,
                  },
                ]}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
