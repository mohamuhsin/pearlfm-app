import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS } from "../theme/colors";

interface ComingSoonProps {
  title?: string;
  message?: string;
  emoji?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * 🚧 ComingSoon — Pulse Edition
 * ------------------------------------------------------------
 * • Uses Pearl FM’s maroon base (#2E0B0F)
 * • Gold accent title (#FFCB05)
 * • Soft white supporting text
 */
export default function ComingSoon({
  title = "🚧 Coming Soon 🚧",
  message = "This feature is still under construction.",
  emoji,
  style,
  textStyle,
}: ComingSoonProps) {
  return (
    <View style={[styles.container, style]}>
      {emoji && <Text style={styles.emoji}>{emoji}</Text>}
      <Text style={[styles.title, textStyle]}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary, // deep maroon
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.accent, // gold highlight
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  message: {
    color: "#FFFFFFCC",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 300,
  },
});
