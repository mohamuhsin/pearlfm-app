import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  StatusBar,
  Image,
  LayoutChangeEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";
import { COLORS } from "../theme/colors";

interface TopBarProps {
  variant?: "light" | "dark";
  onPressNotifications?: () => void;
}

export default function TopBar({ variant, onPressNotifications }: TopBarProps) {
  const scheme = useColorScheme();
  const isDarkScheme = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDarkScheme);

  const backgroundColor = isLight ? COLORS.primary : COLORS.backgroundDark;
  const accentColor = COLORS.accent;
  const iconColor = COLORS.white;

  // 🧠 Dynamic left offset — detects internal padding in logo.png
  const [leftOffset, setLeftOffset] = useState(0);

  const handleLogoLayout = (e: LayoutChangeEvent) => {
    const { x } = e.nativeEvent.layout;
    // If logo starts slightly right of container, compensate dynamically
    if (x > 0) setLeftOffset(-x);
  };

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <StatusBar
        translucent={false}
        backgroundColor={backgroundColor}
        barStyle="light-content"
      />

      <SafeAreaView edges={["top", "left", "right"]}>
        <View style={[styles.separator, { backgroundColor: accentColor }]} />

        <View style={[styles.container, { backgroundColor }]}>
          {/* 🖼️ Logo — adjusts automatically for true alignment */}
          <Image
            onLayout={handleLogoLayout}
            source={require("../assets/logo.png")}
            style={[styles.logo, { marginLeft: leftOffset }]}
            resizeMode="contain"
          />

          {/* 🔔 Notifications */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              onPressNotifications ||
              (() => console.log("Notifications pressed"))
            }
            style={styles.iconButton}
          >
            <Bell size={26} color={iconColor} strokeWidth={2.3} />
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
    paddingHorizontal: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  logo: {
    width: 115,
    height: 38,
  },
  iconButton: {
    marginRight: -2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
