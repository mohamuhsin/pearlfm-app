import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";
import { BlurView } from "expo-blur";
import NotificationModal from "../modals/NotificationModal";
import { COLORS } from "../../theme/colors";

interface TopBarProps {
  variant?: "light" | "dark";
}

export default function TopBar({ variant }: TopBarProps) {
  const [showModal, setShowModal] = useState(false);
  const scheme = useColorScheme();
  const isDarkScheme = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDarkScheme);

  const BG = isLight ? COLORS.primary : COLORS.backgroundDark;
  const ACCENT = COLORS.accent;
  const ICON = COLORS.white;

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
          <View style={[styles.container, { backgroundColor: BG }]}>
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
        <View style={[styles.separator, { backgroundColor: ACCENT }]} />

        <Container>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowModal(true)}
            style={styles.iconButton}
          >
            <Bell size={24} color={ICON} strokeWidth={2.3} />
          </TouchableOpacity>
        </Container>
      </SafeAreaView>

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
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  logo: {
    width: 180,
    height: 54,
    marginLeft: -20,
  },
  iconButton: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
});
