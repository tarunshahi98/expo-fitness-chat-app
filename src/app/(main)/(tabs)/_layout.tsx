import { useAppTheme } from "@/contexts/ThemeContext";
import { useContactsList } from "@/hooks/useContactsList";
import { Tabs } from "expo-router";
import {
  Activity,
  Compass,
  MessageCircle,
  Settings,
  ShoppingBag,
} from "lucide-react-native";

export default function TabsLayout() {
  const { theme } = useAppTheme();
  const { unreadConversationsCount } = useContactsList();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerPressColor: "transparent",
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.mutedForeground,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="fitness"
        options={{
          title: "Fitness",
          tabBarIcon: ({ color, size }) => (
            <Activity color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Chats",
          tabBarBadge:
            unreadConversationsCount > 0 ? unreadConversationsCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
