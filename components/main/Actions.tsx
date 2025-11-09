import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS } from "../../theme/colors";
import Section from "../reusable/Sections";
import {
  PlayCircle,
  ShoppingBag,
  Handshake,
  CalendarDays,
} from "lucide-react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { RootStackParamList } from "../../navigation/types";

interface TopCategoriesProps {
  variant?: "light" | "dark";
}

export default function TopCategories({ variant }: TopCategoriesProps) {
  const { text } = useAppTheme(variant);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const ICON_BG = "#1F2431";
  const ICON_COLOR = COLORS.white;

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
      name: "Partners",
      icon: Handshake,
      action: () => navigation.navigate("Partners"),
    },
  ];

  return (
    <Section title="Top Actions" variant={variant}>
      <View style={styles.row}>
        {categories.map(({ id, name, icon: Icon, action }) => (
          <TouchableOpacity
            key={id}
            activeOpacity={0.9}
            onPress={action}
            style={styles.item}
          >
            <View
              style={[
                styles.iconWrapper,
                {
                  backgroundColor: ICON_BG,
                  borderColor: "rgba(255,255,255,0.08)",
                },
              ]}
            >
              <Icon size={24} color={ICON_COLOR} strokeWidth={2.3} />
            </View>
            <Text style={[styles.label, { color: text }]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 72,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.2,
    lineHeight: 14,
    marginTop: 4,
    textAlign: "center",
  },
});
