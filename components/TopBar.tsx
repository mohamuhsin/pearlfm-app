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
import { BlurView } from "expo-blur";
import { COLORS } from "../theme/colors";

interface TopBarProps {
  variant?: "light" | "dark";
  onPressNotifications?: () => void;
}

export default function TopBar({ variant, onPressNotifications }: TopBarProps) {
  const scheme = useColorScheme();
  const isDarkScheme = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDarkScheme);

  // 🎨 Colors
  const BG = isLight ? COLORS.primary : COLORS.backgroundDark;
  const ACCENT = COLORS.accent;
  const ICON = COLORS.white;

  const [leftOffset, setLeftOffset] = useState(0);

  const handleLogoLayout = (e: LayoutChangeEvent) => {
    const { x } = e.nativeEvent.layout;
    if (x > 0) setLeftOffset(-x);
  };

  // 🪟 Platform container (blur for iOS, solid for Android)
  const Container =
    Platform.OS === "ios"
      ? ({ children }: { children: React.ReactNode }) => (
          <BlurView
            intensity={40}
            tint={isLight ? "light" : "dark"}
            style={[styles.container, { backgroundColor: "transparent" }]}
          >
            {children}
          </BlurView>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <View
            style={[
              styles.container,
              { backgroundColor: BG }, // ✅ unified with theme
            ]}
          >
            {children}
          </View>
        );

  return (
    <View style={styles.wrapper}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <SafeAreaView edges={["top", "left", "right"]}>
        {/* 🔸 Accent line */}
        <View style={[styles.separator, { backgroundColor: ACCENT }]} />

        <Container>
          {/* 🖼️ Logo */}
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
            <Bell size={26} color={ICON} strokeWidth={2.3} />
          </TouchableOpacity>
        </Container>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: "#00000040",
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
      },
    }),
  },
  separator: {
    height: 3,
    width: "100%",
  },
  container: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  logo: {
    width: 145,
    height: 46,
  },
  iconButton: {
    marginRight: -2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
});
