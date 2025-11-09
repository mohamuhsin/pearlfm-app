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
import { COLORS } from "../../theme/colors";

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  visible,
  onClose,
}: NotificationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <BlurView intensity={85} tint="light" style={styles.blurContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Notifications</Text>

            <View style={styles.content}>
              <Text style={styles.empty}>🔔 You're all caught up</Text>
              <Text style={styles.subtext}>
                No new notifications at the moment.
              </Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
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
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  blurContainer: {
    width: "85%",
    borderRadius: 20,
    overflow: "hidden",
  },
  modalBox: {
    backgroundColor: "rgba(255,255,255,0.96)",
    paddingVertical: 28,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
    marginBottom: 24,
  },
  empty: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
  },
  subtext: {
    marginTop: 6,
    color: COLORS.muted,
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  closeText: {
    color: COLORS.text,
    fontWeight: "600",
    fontSize: 14,
  },
});
