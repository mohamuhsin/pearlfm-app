import React from "react";
import { View, ScrollView, StyleSheet, StatusBar } from "react-native";
import { COLORS } from "../theme/colors";
import TopBar from "../components/main/TopBar";

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
}

export default function PageLayout({
  children,
  variant = "light",
}: PageLayoutProps) {
  const BG = variant === "light" ? COLORS.primary : COLORS.backgroundDark;

  return (
    <View style={[styles.root, { backgroundColor: BG }]}>
      <StatusBar barStyle="light-content" />
      <TopBar variant={variant} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
