import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { useTheme } from "../../hooks/useTheme";

/**
 * ============================================================
 *  💳 ServiceScreen — Pearl FM Mobile
 * ------------------------------------------------------------
 *  • Entry point for “Pay a Service” actions
 *  • Matches design of other ComingSoon screens
 *  • Ready for UgaPay or payment API integration
 * ============================================================
 */

export default function ServicesScreen() {
  const { background } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      <BackHeader title="Pay a Service" />
      <ComingSoon
        title="Pay a Service"
        message="Soon you'll be able to make secure payments for services directly within the Pearl FM app."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
