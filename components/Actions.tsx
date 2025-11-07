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
  Newspaper,
  Landmark,
  BookOpenText,
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
  const ICON_BG = isLight ? "rgba(0, 0, 0, 0.25)" : "#141414";
  const ICON_COLOR = COLORS.white;

  const categories = [
    { id: 1, name: "News", icon: Newspaper, link: "https://pearlfm.ug/news" },
    {
      id: 2,
      name: "Da’wah",
      icon: Landmark,
      link: "https://pearlfm.ug/dawah",
    },
    {
      id: 3,
      name: "Qur’an",
      icon: BookOpenText,
      link: "https://pearlfm.ug/quran",
    },
    {
      id: 4,
      name: "Events",
      icon: CalendarDays,
      link: "https://pearlfm.ug/events",
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
                <Icon size={28} color={ICON_COLOR} strokeWidth={2.1} />
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
    textTransform: "none", // ✅ no uppercase
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
    width: 66,
    height: 46,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00000055",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  label: {
    fontSize: 12.5,
    fontWeight: "700",
    marginTop: 6,
    letterSpacing: 0.25,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
