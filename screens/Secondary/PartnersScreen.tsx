import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { COLORS } from "../../theme/colors";

export default function PartnersScreen() {
  return (
    <View style={styles.root}>
      <BackHeader title="Partners" variant="light" showDone />

      <ComingSoon
        emoji="🤝"
        title="Partners Coming Soon"
        message="Our partnerships and collaborations will be announced soon."
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
