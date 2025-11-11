/**
 * NotificationModal — Pearl FM Mobile
 * Theme-aware modal overlay for app notifications.
 */

import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "../../hooks/useTheme";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  visible,
  onClose,
}: NotificationModalProps) {
  const { isLight, surface, text, muted, accent } = useTheme();

  // 🎨 Themed styles
  const blurTint = isLight ? "light" : "dark";
  const overlayBG = "rgba(0,0,0,0.35)";
  const modalBG = isLight ? "rgba(255,255,255,0.95)" : "rgba(20,20,35,0.95)";
  const closeBG = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: overlayBG }]}
        onPress={onClose}
      >
        <BlurView intensity={85} tint={blurTint} style={styles.blurContainer}>
          <View style={[styles.modalBox, { backgroundColor: modalBG }]}>
            {/* Header */}
            <Text style={[styles.title, { color: accent }]}>Notifications</Text>

            {/* Message */}
            <View style={styles.content}>
              <Text style={[styles.empty, { color: text }]}>All caught up</Text>
              <Text style={[styles.subtext, { color: muted }]}>
                You have no new notifications right now.
              </Text>
            </View>

            {/* Close button */}
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.85}
              style={[styles.closeButton, { backgroundColor: closeBG }]}
            >
              <Text style={[styles.closeText, { color: text }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  blurContainer: {
    width: "85%",
    borderRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 8 },
      ios: {
        shadowColor: "#00000040",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
      },
    }),
  },
  modalBox: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
    marginBottom: 22,
  },
  empty: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtext: {
    marginTop: 6,
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 18,
  },
  closeText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
