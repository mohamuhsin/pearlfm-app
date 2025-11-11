/**
 * ============================================================
 *  💳 TopCategories — Pearl FM Mobile (Monochrome Final v2)
 * ------------------------------------------------------------
 *  • Icons & labels are black in light mode, white in dark
 *  • Keeps accent shadows & surface depth
 *  • "Pay a Service" replaces "Partners"
 * ============================================================
 */

import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  PlayCircle,
  ShoppingBag,
  CalendarDays,
  CreditCard,
} from "lucide-react-native";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";
import { RootStackParamList } from "../../navigation/types";
import { LAYOUT } from "../../theme/layout";

export default function TopCategories() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isLight, accent, surface, border } = useTheme();

  // 🎨 Pure black/white logic
  const ICON_COLOR = isLight ? "#000000" : "#FFFFFF";
  const LABEL_COLOR = isLight ? "#000000" : "#FFFFFF";

  const ICON_BG = isLight ? "#F5F6FA" : surface;
  const ICON_BORDER = isLight ? "#E6E8EE" : border;

  const categories = [
    {
      id: 1,
      name: "Watch Live",
      icon: PlayCircle,
      action: () =>
        Linking.openURL("https://www.youtube.com/@pearlfmnews8016/videos"),
    },
    {
      id: 2,
      name: "Shop",
      icon: ShoppingBag,
      action: () => navigation.navigate("Shop"),
    },
    {
      id: 3,
      name: "Events",
      icon: CalendarDays,
      action: () => navigation.navigate("Events"),
    },
    {
      id: 4,
      name: "Services",
      icon: CreditCard,
      action: () => navigation.navigate("Services"),
    },
  ];

  return (
    <Section title="Top Actions" pad={false}>
      <View style={styles.row}>
        {categories.map(({ id, name, icon: Icon, action }) => {
          const scale = useRef(new Animated.Value(1)).current;

          const animate = (to: number) => {
            Animated.spring(scale, {
              toValue: to,
              useNativeDriver: true,
              speed: 25,
              bounciness: 7,
            }).start();
          };

          return (
            <TouchableWithoutFeedback
              key={id}
              onPressIn={() => animate(0.95)}
              onPressOut={() => animate(1)}
              onPress={action}
            >
              <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
                <View
                  style={[
                    styles.iconWrapper,
                    {
                      backgroundColor: ICON_BG,
                      borderColor: ICON_BORDER,
                      ...Platform.select({
                        ios: {
                          shadowColor: accent,
                          shadowOpacity: 0.1,
                          shadowOffset: { width: 0, height: 2 },
                          shadowRadius: 4,
                        },
                        android: { elevation: 2 },
                      }),
                    },
                  ]}
                >
                  <Icon size={24} color={ICON_COLOR} strokeWidth={2.2} />
                </View>
                <Text style={[styles.label, { color: LABEL_COLOR }]}>
                  {name}
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingBottom: LAYOUT.V_SPACING.sm,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 72,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.15,
    lineHeight: 14,
    marginTop: 6,
    textAlign: "center",
  },
});
