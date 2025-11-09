import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { COLORS } from "../../theme/colors";

export default function CharityScreen() {
  return (
    <View style={styles.root}>
      <BackHeader title="Sadaqah" variant="light" showDone />
      <ComingSoon
        emoji="🌙"
        title="Doors of Sadaqah"
        message="Give through the many doors of Sadaqah"
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
