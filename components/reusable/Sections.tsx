import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { COLORS } from "../../theme/colors";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  variant?: "light" | "dark";
  pad?: boolean;
  style?: ViewStyle;
}

export default function Section({
  title,
  children,
  variant = "light",
  pad = true,
  style,
}: SectionProps) {
  const BG = variant === "light" ? COLORS.primary : COLORS.backgroundDark;
  const TEXT = COLORS.white;

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: BG },
        pad ? styles.padded : null,
        style,
      ]}
    >
      {title ? (
        <Text style={[styles.title, { color: TEXT }]}>{title}</Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  padded: {
    paddingTop: 18,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.3,
    marginBottom: 16,
  },
});
