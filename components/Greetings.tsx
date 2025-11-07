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
  const backgroundColor = isLight ? COLORS.primary : COLORS.backgroundDark;
  const textColor = COLORS.white;

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <Text style={[styles.greeting, { color: textColor }]}>
        Assalamu Alaikum!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0.4,
    textTransform: "capitalize",
    color: COLORS.white,
  },
});
