/**
 * ============================================================
 *  🔙 BackHeader — Pearl FM Mobile
 * ------------------------------------------------------------
 *  A reusable, theme-aware back header with optional “Done”
 *  button. Uses blur on iOS and surface color on Android.
 * ============================================================
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "../../hooks/useTheme";

interface BackHeaderProps {
  title: string;
  showDone?: boolean;
  onDonePress?: () => void;
}

export default function BackHeader({
  title,
  showDone = false,
  onDonePress,
}: BackHeaderProps) {
  const navigation = useNavigation();
  const { isLight, surface, border, text, accent } = useTheme();
  const statusStyle = isLight ? "dark-content" : "light-content";

  // 🍏 Platform container (blur vs solid)
  const Container =
    Platform.OS === "ios"
      ? ({ children }: { children: React.ReactNode }) => (
          <BlurView
            intensity={30}
            tint={isLight ? "light" : "dark"}
            style={styles.container}
          >
            {children}
          </BlurView>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <View
            style={[
              styles.container,
              {
                backgroundColor: surface,
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
        {/* Accent separator line */}
        <View style={[styles.separator, { backgroundColor: accent }]} />

        <Container>
          {/* 🔙 Back button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={22} color={text} strokeWidth={2.4} />
          </TouchableOpacity>

          {/* 🏷️ Title */}
          <Text
            style={[styles.title, { color: text }]}
            numberOfLines={1}
            accessibilityRole="header"
          >
            {title}
          </Text>

          {/* ✅ Done button (optional) */}
          {showDone && (
            <TouchableOpacity
              onPress={onDonePress || (() => navigation.goBack())}
              activeOpacity={0.8}
              style={styles.doneButton}
              accessibilityRole="button"
              accessibilityLabel="Done"
            >
              <Text style={[styles.doneText, { color: accent }]}>Done</Text>
            </TouchableOpacity>
          )}
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 5,
    padding: 8,
  },
  doneButton: {
    position: "absolute",
    right: 20,
    zIndex: 5,
    padding: 8,
  },
  doneText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.4,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
