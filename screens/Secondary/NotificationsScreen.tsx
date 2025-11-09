import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { COLORS } from "../../theme/colors";

export default function NotificationsScreen() {
  return (
    <View style={styles.root}>
      <BackHeader title="Notifications" variant="light" showDone />

      <ComingSoon
        emoji="🔔"
        title="Notifications Coming Soon"
        message="Stay tuned for updates, reminders, and announcements from Pearl FM."
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
