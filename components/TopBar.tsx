import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";

interface TopBarProps {
  variant?: "light" | "dark";
  onPressLogin?: () => void;
}

export default function TopBar({ variant, onPressLogin }: TopBarProps) {
  const scheme = useColorScheme();
  const isDarkScheme = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDarkScheme);

  // 🎨 Theme-aware colors
  const backgroundColor = isLight ? COLORS.primary : COLORS.backgroundDark;
  const textColor = COLORS.white;
  const accentColor = COLORS.accent;
  const buttonBackground = isLight ? COLORS.accent : COLORS.primarySoft;
  const buttonText = COLORS.white;

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      {/* 🧱 Fully opaque StatusBar */}
      <StatusBar
        translucent={false}
        backgroundColor={backgroundColor}
        barStyle="light-content"
      />

      <SafeAreaView edges={["top", "left", "right"]}>
        {/* 🔶 Accent separator line */}
        <View style={[styles.separator, { backgroundColor: accentColor }]} />

        <View
          style={[
            styles.container,
            {
              backgroundColor,
              borderBottomColor: "rgba(255,255,255,0.1)",
            },
          ]}
        >
          <Text style={[styles.title, { color: textColor }]}>PEARL FM</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: buttonBackground }]}
            activeOpacity={0.9}
            onPress={onPressLogin || (() => console.log("Login pressed"))}
          >
            <Text style={[styles.buttonText, { color: buttonText }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.primary,
    ...Platform.select({
      android: { elevation: 5 },
      ios: {
        shadowColor: "#00000022",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
      },
    }),
  },
  separator: {
    height: 3,
    width: "100%",
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 21,
    fontWeight: "900",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 26,
    shadowColor: "#00000025",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
