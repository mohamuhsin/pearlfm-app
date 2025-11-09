import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS } from "../../theme/colors";

interface ComingSoonProps {
  title?: string;
  message?: string;
  emoji?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

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
    backgroundColor: COLORS.primary,
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
    color: COLORS.accent,
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
