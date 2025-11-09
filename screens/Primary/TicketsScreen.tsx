import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { COLORS } from "../../theme/colors";

export default function TicketsScreen() {
  return (
    <View style={styles.root}>
      <BackHeader title="Tickets" variant="light" showDone />

      <ComingSoon
        emoji="🎟️"
        title="Tickets Coming Soon"
        message="Soon you'll be able to book, buy, and manage event tickets directly through Pearl FM."
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
