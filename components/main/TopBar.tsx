/**
 * ============================================================
 *  🔝 TopBar — Pearl FM Mobile (Dual Logo Edition)
 * ------------------------------------------------------------
 *  • Uses logo.png in light mode and logo1.png in dark mode
 *  • Bell icon color adapts to theme
 *  • Accent line retained for brand continuity
 * ============================================================
 */

import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import NotificationModal from "../modals/NotificationModal";
import { useTheme } from "../../hooks/useTheme";

export default function TopBar() {
  const [showModal, setShowModal] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const { surface, border, accent, isLight } = useTheme();

  const statusStyle = isLight ? "dark-content" : "light-content";
  const iconColor = isLight ? "#000000" : "#FFFFFF";

  // 🌗 Choose logo by theme
  const logoSource = isLight
    ? require("../../assets/logo.png")
    : require("../../assets/logo1.png");

  // 🍏 Platform-specific container
  const Container =
    Platform.OS === "ios"
      ? ({ children }: { children: React.ReactNode }) => (
          <BlurView
            intensity={35}
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
              {
                backgroundColor: isLight ? "#FDFBF7" : "#161642",
                borderBottomColor: border,
              },
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
        barStyle={statusStyle}
      />

      <SafeAreaView edges={["top", "left", "right"]}>
        {/* 🎨 Gradient accent line */}
        <LinearGradient
          colors={[accent, "#FFAE5F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.separator}
        />

        <Container>
          {/* 🟣 Pearl FM Logo */}
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />

          {/* 🔔 Notification Icon */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setShowModal(true);
              setHasUnread(false);
            }}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Bell size={24} color={iconColor} strokeWidth={2.3} />
            {hasUnread && (
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: accent,
                    borderColor: surface,
                    shadowColor: accent,
                    shadowOpacity: 0.8,
                    shadowRadius: 4,
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        </Container>
      </SafeAreaView>

      {/* 🔔 Modal */}
      <NotificationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 6 },
      ios: {
        shadowColor: "#00000040",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
      },
    }),
  },
  separator: {
    height: 2.5,
    width: "110%",
    marginLeft: -20,
  },
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logo: {
    width: 140,
    height: 40,
    marginLeft: -10,
  },
  iconButton: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  dot: {
    position: "absolute",
    top: 4,
    right: 6,
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 1,
    elevation: 3,
  },
});
