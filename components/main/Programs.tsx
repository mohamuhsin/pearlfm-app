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

  const CARD_BG = isLight ? "#F5F5F7" : surface || "#1C1C2A";

  const localImage = require("../../assets/programs/programs.png");

  const programs = [
    { id: 1, title: "Entanda Yokumakya", time: "05:00 AM — 07:00 AM" },
    { id: 2, title: "Ettu Lyomukezze", time: "07:00 AM — 09:00 AM" },
    { id: 3, title: "Okuburilira Kyokumakya", time: "09:00 AM — 10:00 AM" },
    { id: 4, title: "The Inside Story", time: "10:00 AM — 12:00 PM" },
    { id: 5, title: "The News Hour", time: "12:00 PM — 01:00 PM" },
    { id: 6, title: "Abakyala Baziira", time: "01:00 PM — 03:00 PM" },
    { id: 7, title: "Mpulide Kamenya", time: "03:00 PM — 05:00 PM" },
    { id: 8, title: "Buuza Imaam", time: "05:30 PM — 06:30 PM" },
    { id: 9, title: "Namwatulira", time: "07:00 PM — 09:00 PM" },
  ];

  return (
    <Section title="Popular Programs" pad={false}>
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
              source={localImage}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.info}>
              <Text
                style={[styles.cardTitle, { color: text }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {p.title}
              </Text>

              {p.time ? (
                <Text style={[styles.cardTime, { color: accent }]}>
                  {p.time}
                </Text>
              ) : null}
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
    paddingBottom: LAYOUT.V_SPACING.md,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: LAYOUT.V_SPACING.sm,
    marginBottom: LAYOUT.V_SPACING.xs,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.05)",
    overflow: "visible",
    borderRadius: 6,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#00000020",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
    }),
  },
  image: {
    width: "100%",
    height: CARD_HEIGHT - 40,
    backgroundColor: "#EDEDED",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  info: {
    paddingTop: LAYOUT.V_SPACING.xs,
    paddingHorizontal: 4,
    paddingBottom: 6,
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
