import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { useTheme } from "../../hooks/useTheme";

export default function EventsScreen() {
  const { background } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      <BackHeader title="Events" />
      <ComingSoon
        title="Events"
        message="Stay tuned for upcoming community activities."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
