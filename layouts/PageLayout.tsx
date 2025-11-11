import React from "react";
import { ScrollView, StyleSheet, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/main/TopBar";
import { useTheme } from "../hooks/useTheme";
import { LAYOUT } from "../theme/layout";

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export default function PageLayout({ children, variant }: PageLayoutProps) {
  const { background, isLight } = useTheme();
  const STATUS_STYLE = isLight ? "dark-content" : "light-content";

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: background }]}
      edges={["top"]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={STATUS_STYLE}
      />

      <TopBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.innerContainer}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: LAYOUT.V_SPACING.lg,
  },
  innerContainer: {
    paddingHorizontal: LAYOUT.H_PADDING,
    paddingTop: LAYOUT.V_SPACING.lg,
  },
});
