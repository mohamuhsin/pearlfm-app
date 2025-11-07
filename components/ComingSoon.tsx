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
 * 🧱 ComingSoon — Reusable placeholder for unfinished screens
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
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: "center",
  },
});
