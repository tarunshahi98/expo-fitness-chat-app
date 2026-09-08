import { AppText } from "@/components/common";
import { useAppTheme } from "@/contexts/ThemeContext";
import { useHeaderInset } from "@/hooks/useHeaderInset";
import { tabScreenStyles } from "@/styles/tabScreenStyles";
import { router } from "expo-router";
import { Activity, ArrowRight, Flame } from "lucide-react-native";
import { useCallback } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export const calculateProgressPercentage = (
  current: number,
  goal: number,
): number => {
  if (typeof current !== "number" || isNaN(current) || current <= 0) return 0;
  if (typeof goal !== "number" || isNaN(goal) || goal <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((current / goal) * 100)));
};

export default function FitnessScreen() {
  const { theme } = useAppTheme();
  const { headerTopPadding } = useHeaderInset({
    webPadding: 24,
    nativeOffset: 8,
  });

  const metrics = {
    calories: { current: 1284, goal: 2000, color: theme.destructive },
    steps: { current: 8432, goal: 10000, color: theme.primary },
  };

  const handleOpenCoachChat = useCallback(() => {
    router.push({
      pathname: "/chat",
      params: { contactId: "fitness-coach" },
    });
  }, []);

  return (
    <View
      style={[
        tabScreenStyles.screenContainer,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Header */}
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
            Fitness
          </AppText>
        </View>
      </View>

      {/* Content Area */}
      <ScrollView
        contentContainerStyle={[tabScreenStyles.scrollContent, { paddingBottom: 24 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Metric Cards Row */}
        <View style={tabScreenStyles.metricsRow}>
          {/* Calories Card */}
          <View
            style={[
              tabScreenStyles.metricCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={tabScreenStyles.metricHeader}>
              <Flame size={18} color={metrics.calories.color} />
              <AppText
                variant="badge"
                weight="bold"
                color={metrics.calories.color}
              >
                CALORIES
              </AppText>
            </View>
            <AppText
              variant="display"
              weight="heavy"
              color={theme.foreground}
              style={tabScreenStyles.metricValue}
            >
              {metrics.calories.current.toLocaleString()}
            </AppText>
            <AppText
              variant="caption"
              color={theme.mutedForeground}
              style={tabScreenStyles.metricTarget}
            >
              / {metrics.calories.goal.toLocaleString()} kcal
            </AppText>

            {/* Progress Bar */}
            <View
              style={[
                tabScreenStyles.progressBarTrack,
                { backgroundColor: theme.secondary },
              ]}
              accessible
              accessibilityRole="progressbar"
              accessibilityValue={{
                min: 0,
                max: metrics.calories.goal,
                now: metrics.calories.current,
              }}
            >
              <View
                style={[
                  tabScreenStyles.progressBarFill,
                  {
                    width: `${calculateProgressPercentage(
                      metrics.calories.current,
                      metrics.calories.goal,
                    )}%`,
                    backgroundColor: metrics.calories.color,
                  },
                ]}
              />
            </View>
          </View>

          {/* Steps Card */}
          <View
            style={[
              tabScreenStyles.metricCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={tabScreenStyles.metricHeader}>
              <Activity size={18} color={metrics.steps.color} />
              <AppText
                variant="badge"
                weight="bold"
                color={metrics.steps.color}
              >
                STEPS
              </AppText>
            </View>
            <AppText
              variant="display"
              weight="heavy"
              color={theme.foreground}
              style={tabScreenStyles.metricValue}
            >
              {metrics.steps.current.toLocaleString()}
            </AppText>
            <AppText
              variant="caption"
              color={theme.mutedForeground}
              style={tabScreenStyles.metricTarget}
            >
              / {metrics.steps.goal.toLocaleString()} steps
            </AppText>

            {/* Progress Bar */}
            <View
              style={[
                tabScreenStyles.progressBarTrack,
                { backgroundColor: theme.secondary },
              ]}
              accessible
              accessibilityRole="progressbar"
              accessibilityValue={{
                min: 0,
                max: metrics.steps.goal,
                now: metrics.steps.current,
              }}
            >
              <View
                style={[
                  tabScreenStyles.progressBarFill,
                  {
                    width: `${calculateProgressPercentage(
                      metrics.steps.current,
                      metrics.steps.goal,
                    )}%`,
                    backgroundColor: metrics.steps.color,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Workout Card */}
        <View
          style={[
            tabScreenStyles.workoutCard,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <AppText
            variant="subheading"
            weight="bold"
            color={theme.foreground}
            style={tabScreenStyles.workoutHeader}
          >
            Today's Workout
          </AppText>

          <TouchableOpacity
            style={[
              tabScreenStyles.workoutItem,
              {
                backgroundColor: theme.surface,
                borderColor: theme.borderSubtle,
              },
            ]}
            onPress={handleOpenCoachChat}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Open workout discussion with Coach"
          >
            <View style={tabScreenStyles.workoutInfo}>
              <AppText
                variant="body"
                weight="bold"
                color={theme.foreground}
              >
                Upper Body Power
              </AppText>
              <AppText
                variant="caption"
                color={theme.mutedForeground}
                style={{ marginTop: 2 }}
              >
                45 min • High Intensity
              </AppText>
            </View>

            <View
              style={[
                tabScreenStyles.workoutActionBtn,
                { backgroundColor: theme.primary },
              ]}
            >
              <ArrowRight size={18} color="#ffffff" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
