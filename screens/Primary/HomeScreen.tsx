import React from "react";
import { View, StyleSheet } from "react-native";
import PageLayout from "../../layouts/PageLayout";
import Greetings from "../../components/main/Greetings";
import AdCarousel from "../../components/main/AdCarousel";
import TopCategories from "../../components/main/Actions";
import Programs from "../../components/main/Programs";
import HappeningToday from "../../components/main/HappeningToday";
import { LAYOUT } from "../../theme/layout";

export default function HomeScreen() {
  return (
    <PageLayout>
      <View style={styles.stack}>
        <Greetings />
        <AdCarousel />
        <TopCategories />
        <Programs />
        <HappeningToday />
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  stack: {
    flexDirection: "column",
    gap: LAYOUT.V_SPACING.lg,
    paddingBottom: LAYOUT.V_SPACING.md,
  },
});
