/**
 * ============================================================
 *  ComingSoon — Pearl FM Mobile (Clean Edition)
 * ------------------------------------------------------------
 *  • Minimal, centered, theme-aware placeholder
 *  • No emoji — purely text-based and professional
 *  • Harmonized with Pearl FM typography scale
 * ============================================================
 */

import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface ComingSoonProps {
  title?: string;
  message?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function ComingSoon({
  title = "Coming Soon",
  message = "This feature is still under construction.",
  style,
  textStyle,
}: ComingSoonProps) {
  const { isLight, background, primary, accent, text, muted } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: background }, style]}>
      <Text
        style={[styles.title, { color: isLight ? primary : accent }, textStyle]}
      >
        {title}
      </Text>

      <Text style={[styles.message, { color: muted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 320,
    opacity: 0.8,
  },
});
