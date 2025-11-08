import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";
import { COLORS } from "../theme/colors";

export default function Programs({ variant }: { variant?: "light" | "dark" }) {
  const scheme = useColorScheme();
  const isDarkScheme = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDarkScheme);

  // 🎨 Match "Top Actions" section background and palette
  const BG = isLight ? COLORS.primary : COLORS.backgroundDark;
  const TEXT = COLORS.white;
  const CARD_BG = "#1F2431";

  // 📻 Program Data
  const programs = [
    {
      id: 1,
      title: "Morning Light",
      time: "6 AM – 9 AM",
      image: "https://picsum.photos/400/350?1",
    },
    {
      id: 2,
      title: "Midday Talk",
      time: "12 PM – 2 PM",
      image: "https://picsum.photos/400/350?2",
    },
    {
      id: 3,
      title: "Afternoon Drive",
      time: "3 PM – 6 PM",
      image: "https://picsum.photos/400/350?3",
    },
    {
      id: 4,
      title: "Evening Reflections",
      time: "7 PM – 9 PM",
      image: "https://picsum.photos/400/350?4",
    },
  ];

  return (
    <View style={[styles.wrapper, { backgroundColor: BG }]}>
      {/* Section Title */}
      <Text style={[styles.title, { color: TEXT }]}>Programs</Text>

      {/* Horizontal List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {programs.map((p) => (
          <TouchableOpacity
            key={p.id}
            activeOpacity={0.9}
            style={[styles.card, { backgroundColor: CARD_BG }]}
            onPress={() => console.log("Pressed:", p.title)}
          >
            <Image
              source={{ uri: p.image }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.info}>
              <Text style={[styles.cardTitle, { color: TEXT }]}>{p.title}</Text>
              <Text style={[styles.cardTime, { color: COLORS.accent }]}>
                {p.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// 📏 Layout Constants
const CARD_WIDTH = 120;
const CARD_HEIGHT = 140;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    paddingTop: 22,
    paddingBottom: 34,
  },
  title: {
    fontSize: 20, // ⬆️ Stronger section heading
    fontWeight: "900", // ⬆️ Matches "Top Actions"
    letterSpacing: 0.4,
    paddingHorizontal: 22, // ✅ same alignment as TopActions + Greetings
    marginBottom: 20,
  },
  scrollContent: {
    paddingLeft: 24, // ✅ Balanced horizontally
    paddingRight: 14,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    borderRadius: 2, // ✅ very subtle rounding for refinement
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#00000055",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    }),
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT - 35,
    backgroundColor: "#EDEDED",
  },
  info: {
    paddingTop: 6,
    paddingHorizontal: 4,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "800", // ⬆️ more definition in titles
    textAlign: "center",
    textTransform: "capitalize",
  },
  cardTime: {
    fontSize: 11,
    textAlign: "center",
    opacity: 0.9,
  },
});
