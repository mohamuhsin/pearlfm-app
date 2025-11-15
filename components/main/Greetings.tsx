import React from "react";
import { Text, StyleSheet } from "react-native";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";

export default function Greetings() {
  const { text } = useTheme();

  return (
    <Section pad={false}>
      <Text style={styles.container}>
        <Text style={[styles.arabic, { color: text }]}>
          اَلسَّلَامُ عَلَيْكُمْ
        </Text>
        {"\n"}
        <Text style={[styles.english, { color: text }]}>
          Assalam&nbsp;Alaikum!
        </Text>
      </Text>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "left",
    marginTop: 4,
    lineHeight: 32,
  },
  arabic: {
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 0.3,
    includeFontPadding: false,
  },
  english: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.25,
    includeFontPadding: false,
    marginTop: 2,
  },
});
