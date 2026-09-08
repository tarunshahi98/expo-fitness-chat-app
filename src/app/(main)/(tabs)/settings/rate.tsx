import {
    AppText,
    InputField,
    SectionLabel,
    SubmitButton,
} from "@/components/common";
import { SubScreenShell } from "@/components/settings/SubScreenShell";
import { BRAND_COLORS } from "@/constants/appTheme";
import { useAppTheme } from "@/contexts/ThemeContext";
import { rateStyles } from "@/styles";
import { MessageCircle, Star, ThumbsUp } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const TAG_OPTIONS = [
  "Easy to use",
  "Fast",
  "Great design",
  "Reliable",
  "Missing features",
  "Buggy",
  "Slow",
  "Poor UI",
];
const LABELS = ["", "Awful", "Bad", "Okay", "Good", "Amazing!"];

export default function RateScreen() {
  const { theme } = useAppTheme();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  if (submitted) {
    return (
      <SubScreenShell title="Rate the App">
        <View style={rateStyles.submittedContainer}>
          <View
            style={[
              rateStyles.submittedIconBox,
              { backgroundColor: theme.accentSurface },
            ]}
          >
            <ThumbsUp size={44} color={theme.accent} />
          </View>
          <AppText variant="heading" weight="bold" color={theme.foreground}>
            Thanks so much!
          </AppText>
          <AppText
            variant="body"
            color={theme.mutedForeground}
            style={rateStyles.submittedSub}
          >
            Your feedback helps us make Pulse better for everyone.
          </AppText>
          <View style={rateStyles.submittedStarsRow}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={28}
                fill={i <= rating ? BRAND_COLORS.star : "none"}
                color={i <= rating ? BRAND_COLORS.star : theme.muted}
              />
            ))}
          </View>
        </View>
      </SubScreenShell>
    );
  }

  return (
    <SubScreenShell title="Rate the App">
      <View
        style={[
          rateStyles.rateIntroCard,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <View
          style={[rateStyles.appIconBox, { backgroundColor: theme.primary }]}
        >
          <MessageCircle size={32} color="white" />
        </View>
        <AppText variant="heading" weight="bold" color={theme.foreground}>
          How are we doing?
        </AppText>
        <AppText variant="caption" color={theme.mutedForeground}>
          Tap a star to rate your experience
        </AppText>

        <View style={rateStyles.starsRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setRating(i)}
              activeOpacity={0.7}
              style={rateStyles.starTouch}
            >
              <Star
                size={36}
                fill={i <= rating ? BRAND_COLORS.star : "none"}
                color={i <= rating ? BRAND_COLORS.star : theme.muted}
                strokeWidth={1.5}
              />
            </TouchableOpacity>
          ))}
        </View>

        {rating > 0 && (
          <AppText
            variant="subheading"
            weight="bold"
            color={theme.primary}
            style={rateStyles.ratingTextLabel}
          >
            {LABELS[rating]}
          </AppText>
        )}
      </View>

      {rating > 0 && (
        <View style={rateStyles.feedbackContainer}>
          <SectionLabel label="What stood out?" />
          <View style={rateStyles.tagsContainer}>
            {TAG_OPTIONS.map((tag) => {
              const isSelected = tags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={[
                    rateStyles.tagBtn,
                    {
                      backgroundColor: isSelected ? theme.primary : theme.muted,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <AppText
                    variant="caption"
                    weight="medium"
                    color={isSelected ? theme.white : theme.mutedForeground}
                  >
                    {tag}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>

          <SectionLabel label="Anything else?" />
          <InputField
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Tell us more..."
            multiline
            numberOfLines={3}
          />

          <SubmitButton
            title="Submit Review"
            onPress={() => setSubmitted(true)}
            style={{ marginTop: 14 }}
          />

          {rating >= 4 && (
            <TouchableOpacity
              style={[
                rateStyles.appStoreBtn,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
              activeOpacity={0.7}
            >
              <Star
                size={16}
                color={BRAND_COLORS.star}
                fill={BRAND_COLORS.star}
                style={rateStyles.appStoreBtnIcon}
              />
              <AppText
                variant="caption"
                weight="semibold"
                color={theme.foreground}
              >
                Rate on the App Store
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      )}
    </SubScreenShell>
  );
}
