import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { useTheme } from "../../hooks/useTheme";

export default function CharityScreen() {
  const { background } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      <BackHeader title="Sadaqah" />
      <ComingSoon
        title="Sadaqah"
        message="Give through the many doors of charity soon."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
