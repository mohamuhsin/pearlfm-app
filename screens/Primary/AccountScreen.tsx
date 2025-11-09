import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { COLORS } from "../../theme/colors";

export default function AccountScreen() {
  return (
    <View style={styles.root}>
      <BackHeader title="Account" variant="light" showDone />
      <ComingSoon
        emoji="👤"
        title="Account Coming Soon"
        message="Manage your profile and settings."
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
