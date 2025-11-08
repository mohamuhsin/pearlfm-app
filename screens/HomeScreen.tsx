import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import TopBar from "../components/TopBar";
import Greetings from "../components/Greetings";
import TopCategories from "../components/Actions";
import AdCarousel from "../components/AdCarousel";
import Programs from "../components/Programs";
import HappeningToday from "../components/HappeningToday";
import { COLORS } from "../theme/colors";

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <TopBar variant="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Greetings variant="light" />
        <AdCarousel variant="light" />
        <TopCategories variant="light" />
        <Programs variant="light" />
        <HappeningToday variant="light" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    paddingBottom: 30,
  },
});
