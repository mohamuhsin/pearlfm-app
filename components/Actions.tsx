import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Linking,
} from "react-native";
import { COLORS } from "../theme/colors";
import {
  PlayCircle,
  ShoppingBag,
  Handshake,
  CalendarDays,
} from "lucide-react-native";

interface TopCategoriesProps {
  variant?: "light" | "dark";
}

export default function TopCategories({ variant }: TopCategoriesProps) {
  const scheme = useColorScheme();
  const isDarkScheme = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDarkScheme);

  // 🎨 Colors
  const BG = isLight ? COLORS.primary : COLORS.backgroundDark;
  const TEXT = COLORS.white;
  const ICON_BG = "#1f2431";
  const ICON_COLOR = COLORS.white;

  const categories = [
    {
      id: 1,
      name: "Watch Live",
      icon: PlayCircle,
      link: "https://pearlfm.ug/live",
    },
    {
      id: 2,
      name: "Shop",
      icon: ShoppingBag,
      link: "https://pearlfm.ug/shop",
    },
    {
      id: 4,
      name: "Events",
      icon: CalendarDays,
      link: "https://pearlfm.ug/events",
    },
    {
      id: 3,
      name: "Partners",
      icon: Handshake,
      link: "https://pearlfm.ug/partners",
    },
  ];

  return (
    <View style={[styles.wrapper, { backgroundColor: BG }]}>
      {/* Section Title */}
      <Text style={[styles.title, { color: TEXT }]}>Top Actions</Text>

      {/* Category Row */}
      <View style={styles.row}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.85}
              onPress={() => Linking.openURL(cat.link)}
              style={styles.item}
            >
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: ICON_BG,
                    borderColor: "rgba(255,255,255,0.06)",
                  },
                ]}
              >
                <Icon size={24} color={ICON_COLOR} strokeWidth={2.4} />
              </View>
              <Text style={[styles.label, { color: TEXT }]}>{cat.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 22,
    paddingBottom: 36,
  },
  title: {
    fontSize: 20, // ⬆️ Slightly larger
    fontWeight: "900", // ⬆️ Stronger boldness
    letterSpacing: 0.4,
    paddingHorizontal: 22, // ⬆️ Matches other sections (like Greetings)
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 72,
    height: 44,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.2,
    shadowColor: "#00000055",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "800", // ⬆️ Sharper weight
    marginTop: 7,
    letterSpacing: 0.2,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
