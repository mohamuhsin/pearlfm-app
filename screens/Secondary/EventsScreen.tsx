import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { COLORS } from "../../theme/colors";

export default function EventsScreen() {
  return (
    <View style={styles.root}>
      <BackHeader title="Events" variant="light" showDone />

      <ComingSoon
        emoji="🎫"
        title="Events Coming Soon"
        message="Stay tuned for upcoming community events and activities."
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
