import {
  Bell,
  HelpCircle,
  Image as ImageIcon,
  Lock,
  Moon,
  Shield,
  Star,
} from "lucide-react-native";

export const settings = [
  {
    icon: Bell,
    label: "Notifications",
    sub: "Manage alerts",
    route: "/settings/notifications" as const,
  },
  {
    icon: Lock,
    label: "Privacy & Security",
    sub: "Passwords, 2FA",
    route: "/settings/privacy" as const,
  },
  {
    icon: ImageIcon,
    label: "Media & Storage",
    sub: "Photos, videos, cache",
    route: "/settings/media" as const,
  },
  {
    icon: Moon,
    label: "Appearance",
    sub: "Theme, font size",
    route: "/settings/appearance" as const,
  },
  {
    icon: Shield,
    label: "Blocked Users",
    sub: "2 blocked",
    route: "/settings/blocked" as const,
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    sub: "FAQ, contact us",
    route: "/settings/help" as const,
  },
  {
    icon: Star,
    label: "Rate the App",
    sub: "Leave a review",
    route: "/settings/rate" as const,
  },
];
