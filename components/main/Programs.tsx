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
import { useAppTheme } from "../../hooks/useAppTheme";
import { LAYOUT } from "../../theme/layout";

export default function Programs({ variant }: { variant?: "light" | "dark" }) {
  const { text, accent } = useAppTheme(variant);
  const TEXT = text;
  const CARD_BG = "#1F2431";

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
    <Section variant={variant} pad={false}>
      <View style={styles.wrapper}>
        <Text style={[styles.title, { color: TEXT }]}>Programs</Text>

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
                <Text style={[styles.cardTitle, { color: TEXT }]}>
                  {p.title}
                </Text>
                <Text style={[styles.cardTime, { color: accent }]}>
                  {p.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Section>
  );
}

const CARD_WIDTH = LAYOUT.CARD.small;
const CARD_HEIGHT = 140;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 0,
    paddingBottom: LAYOUT.V_SPACING.lg,
  },
  title: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.3,
    paddingHorizontal: LAYOUT.H_PADDING,
    marginBottom: 16,
  },
  scrollContent: {
    paddingLeft: LAYOUT.H_PADDING,
    paddingRight: LAYOUT.H_PADDING,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: LAYOUT.V_SPACING.sm,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderRadius: LAYOUT.RADIUS.card,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#00000040",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    }),
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT - 40,
    backgroundColor: "#EDEDED",
    borderTopLeftRadius: LAYOUT.RADIUS.image,
    borderTopRightRadius: LAYOUT.RADIUS.image,
  },
  info: {
    paddingTop: LAYOUT.V_SPACING.xs,
    paddingHorizontal: 4,
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
