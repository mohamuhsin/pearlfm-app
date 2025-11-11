import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { useTheme } from "../../hooks/useTheme";

export default function TicketsScreen() {
  const { background } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      <BackHeader title="Tickets" />
      <ComingSoon
        title="Tickets"
        message="Book and manage event tickets here soon."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
