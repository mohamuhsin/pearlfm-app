import React from "react";
import { View, StyleSheet } from "react-native";
import BackHeader from "../../components/reusable/BackHeader";
import ComingSoon from "../../components/reusable/ComingSoon";
import { useTheme } from "../../hooks/useTheme";

export default function NotificationsScreen() {
  const { background } = useTheme();

  return (
    <View style={[styles.root, { backgroundColor: background }]}>
      <BackHeader title="Notifications" />
      <ComingSoon
        title="Notifications"
        message="Stay tuned for updates and announcements from Pearl FM."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
