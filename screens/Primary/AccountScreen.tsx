import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../navigation/types";

import { ChevronRight, LogOut, Edit3 } from "lucide-react-native";
import BackHeader from "../../components/reusable/BackHeader";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/reusable/ThemeToggle";

const mockUser = {
  name: "Iventics Technologies",
  email: "hello@iventics.com",
  avatar: "https://i.pravatar.cc/300?img=15",
};

type AccountScreenNav = StackNavigationProp<RootStackParamList, "Account">;

export default function AccountScreen() {
  const navigation = useNavigation<AccountScreenNav>();
  const insets = useSafeAreaInsets();
  const { background, surface, border, text, muted, accent, error, isLight } =
    useTheme();

  const openIventics = () => {
    Linking.openURL("https://iventics.com").catch(() => {});
  };

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: background, paddingBottom: insets.bottom || 12 },
      ]}
    >
      <BackHeader title="Account" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.profileCard,
            {
              backgroundColor: surface,
              borderColor: border,
              shadowColor: isLight ? "#00000010" : "transparent",
              shadowOpacity: isLight ? 0.05 : 0,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 3,
              elevation: isLight ? 1 : 0,
            },
          ]}
        >
          <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />

          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: text }]}>{mockUser.name}</Text>
            <Text style={[styles.email, { color: muted }]}>
              {mockUser.email}
            </Text>
            <Text style={[styles.caption, { color: muted }]}>
              Signed in securely
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.editButton}>
            <Edit3 size={20} color={accent} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: muted }]}>Settings</Text>

          <View
            style={[
              styles.itemRow,
              { backgroundColor: surface, borderColor: border },
            ]}
          >
            <View style={styles.itemTextBlock}>
              <Text style={[styles.itemLabel, { color: text }]}>App Theme</Text>
              <Text style={[styles.itemHint, { color: muted }]}>
                Light / Dark
              </Text>
            </View>
            <ThemeToggle />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
            style={[
              styles.itemRow,
              { backgroundColor: surface, borderColor: border },
            ]}
            activeOpacity={0.7}
          >
            <Text style={[styles.itemLabel, { color: text }]}>
              Notifications
            </Text>
            <ChevronRight size={18} color={muted} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: muted }]}>Actions</Text>

          <TouchableOpacity
            style={[
              styles.itemRow,
              { backgroundColor: surface, borderColor: border },
            ]}
            activeOpacity={0.7}
          >
            <LogOut size={18} color={error} style={{ marginRight: 8 }} />
            <Text style={[styles.actionText, { color: error }]}>Log Out</Text>
            <ChevronRight
              size={17}
              color={muted}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: muted }]}>
            Pearl of Africa Radio • v1.0.0
          </Text>

          <TouchableOpacity onPress={openIventics} activeOpacity={0.8}>
            <Text style={[styles.brandLink, { color: accent }]}>
              Built by Iventics Technologies
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 14,
  },
  profileInfo: { flex: 1 },
  name: { fontSize: 17, fontWeight: "700" },
  email: { fontSize: 13, marginTop: 2 },
  caption: { fontSize: 12, marginTop: 3, opacity: 0.7 },
  editButton: { padding: 6, borderRadius: 8 },

  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 10,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  itemTextBlock: { flexShrink: 1, marginRight: 10 },
  itemLabel: { fontSize: 15, fontWeight: "600" },
  itemHint: { fontSize: 12, marginTop: 2, opacity: 0.8 },
  actionText: { fontSize: 15, fontWeight: "600" },

  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 36,
    marginBottom: 12,
  },
  footerText: {
    fontSize: 11.5,
    letterSpacing: 0.3,
    marginBottom: 3,
  },
  brandLink: {
    fontSize: 12.5,
    fontWeight: "600",
  },
});
