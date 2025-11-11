/**
 * ============================================================
 *  🙏 Greetings — Pearl FM Mobile (Unified Title Font Edition)
 * ------------------------------------------------------------
 *  • “Assalam Alaikum!” on its own line
 *  • “Good Morning” uses same font size & weight as Section titles
 *  • Unified typography across all home sections
 * ============================================================
 */

import React from "react";
import { Text, StyleSheet } from "react-native";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";

export default function Greetings() {
  const { text, accent } = useTheme();

  // 🕒 Determine time of day
  const hour = new Date().getHours();
  let timeGreeting = "Good Morning";
  if (hour >= 12 && hour < 17) timeGreeting = "Good Afternoon";
  else if (hour >= 17 && hour < 21) timeGreeting = "Good Evening";

  return (
    <Section pad={false}>
      <Text style={[styles.text, { color: text }]}>
        <Text style={[styles.highlight, { color: accent }]}>
          Assalam&nbsp;Alaikum!
        </Text>
        {"\n"}
        {timeGreeting}
      </Text>
    </Section>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20, // ✅ matches Section title font size
    fontWeight: "900",
    letterSpacing: 0.3,
    lineHeight: 26,
    textAlign: "left",
    marginTop: 2, // visually balanced under TopBar
  },
  highlight: {
    fontWeight: "900",
  },
});
