import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { COLORS } from "../theme/colors";

interface GreetingsProps {
  variant?: "light" | "dark";
}

export default function Greetings({ variant }: GreetingsProps) {
  const scheme = useColorScheme();
  const isDarkScheme = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDarkScheme);

  // 🎨 Colors
  const BG = isLight ? COLORS.primary : COLORS.backgroundDark;
  const TEXT = COLORS.white;

  return (
    <View style={[styles.wrapper, { backgroundColor: BG }]}>
      <Text style={[styles.greeting, { color: TEXT }]}>Assalamu Alaikum!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 22,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
});
