import React from "react";
import { Text, StyleSheet } from "react-native";
import Section from "../reusable/Sections";
import { useAppTheme } from "../../hooks/useAppTheme";
import { LAYOUT } from "../../theme/layout";

interface GreetingsProps {
  variant?: "light" | "dark";
}

export default function Greetings({ variant }: GreetingsProps) {
  const { text } = useAppTheme(variant);

  return (
    <Section variant={variant} pad={false}>
      <Text style={[styles.greeting, { color: text }]}>Assalam Alaikum!</Text>
    </Section>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.3,
    lineHeight: 26,
    paddingTop: LAYOUT.V_SPACING.md,
    paddingBottom: 16,
    paddingHorizontal: LAYOUT.H_PADDING,
  },
});
