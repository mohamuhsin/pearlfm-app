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
    { id: 2, name: "Shop", icon: ShoppingBag, link: "https://pearlfm.ug/shop" },
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
      <Text style={[styles.title, { color: TEXT }]}>Top Actions</Text>

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
                    borderColor: "rgba(255,255,255,0.05)",
                  },
                ]}
              >
                <Icon size={24} color={ICON_COLOR} strokeWidth={2.3} />
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
    paddingTop: 20,
    paddingBottom: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.4,
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    width: 70, // smaller width for a neater oval
    height: 42, // slightly shorter for compactness
    borderRadius: 24, // smooth curvature
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.1,
    shadowColor: "#00000055",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2.5,
  },
  label: {
    fontSize: 10.5,
    fontWeight: "700",
    marginTop: 6,
    letterSpacing: 0.15,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
