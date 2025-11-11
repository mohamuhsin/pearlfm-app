/**
 * ============================================================
 *  📻 Programs — Pearl FM Mobile (Final Grid-Aligned Edition)
 * ------------------------------------------------------------
 *  • Flat-bottom cards, no double padding
 *  • Fixes bottom clipping (shadows + text visible)
 *  • Matches global 24 dp vertical rhythm
 * ============================================================
 */

import React from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";
import { LAYOUT } from "../../theme/layout";

export default function Programs({ variant }: { variant?: "light" | "dark" }) {
  const { isLight, text, accent, surface } = useTheme();

  const CARD_BG = isLight ? "#FFFFFF" : surface || "#1C1C2A";

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
    <Section title="Programs" pad={false}>
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
              <Text style={[styles.cardTitle, { color: text }]}>{p.title}</Text>
              <Text style={[styles.cardTime, { color: accent }]}>{p.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Section>
  );
}

const CARD_WIDTH = 150;
const CARD_HEIGHT = 140;

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 0,
    paddingBottom: LAYOUT.V_SPACING.md, // ✅ prevents shadow clipping
  },
  card: {
    width: CARD_WIDTH,
    marginRight: LAYOUT.V_SPACING.sm, // 12 dp gap between cards
    marginBottom: LAYOUT.V_SPACING.xs, // ✅ small breathing below
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "visible", // ✅ allows shadows
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#00000040",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    }),
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT - 40,
    backgroundColor: "#EDEDED",
    borderTopLeftRadius: 6, // ✅ soft top edges only
    borderTopRightRadius: 6,
  },
  info: {
    paddingTop: LAYOUT.V_SPACING.xs,
    paddingHorizontal: 4,
    paddingBottom: 6, // ✅ ensures text not cut
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 16,
    textAlign: "center",
  },
  cardTime: {
    fontSize: 11,
    lineHeight: 13,
    textAlign: "center",
    opacity: 0.9,
  },
});
