import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { useTheme } from "../../hooks/useTheme";

export default function PartnersScreen() {
  const { background } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      <BackHeader title="Partners" />
      <ComingSoon
        title="Partners"
        message="Our collaborations and partnerships will appear here soon."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
