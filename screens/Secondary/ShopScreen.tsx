import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { COLORS } from "../../theme/colors";

export default function ShopScreen() {
  return (
    <View style={styles.root}>
      <BackHeader title="Shop" variant="light" showDone />

      <ComingSoon
        emoji="🛍️"
        title="Shop Coming Soon"
        message="Discover exclusive Pearl FM merchandise and items here soon."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
