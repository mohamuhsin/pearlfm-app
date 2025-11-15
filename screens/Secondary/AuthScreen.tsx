import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
import ThemeToggle from "../../components/reusable/ThemeToggle";
import BackHeader from "../../components/reusable/BackHeader";
import GoogleIcon from "../../components/icons/GoogleIcons";
import Toast from "react-native-toast-message";
import { Linking } from "react-native";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { background, surface, border, text, muted, accent, isLight } =
    useTheme();

  const [phone, setPhone] = useState("");

  const isValidUgandaPhone = (value: string) => {
    const clean = value.replace(/\D/g, "");
    return (
      (clean.startsWith("2567") || clean.startsWith("07")) &&
      clean.length >= 10 &&
      clean.length <= 12
    );
  };

  const showToast = () => {
    Toast.show({
      type: "info",
      text1: "Coming Soon",
      text2: "Stay tuned - we're adding this soon.",
    });
  };

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: background, paddingBottom: insets.bottom || 12 },
      ]}
    >
      <BackHeader title="Sign In" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: text }]}>Welcome</Text>
          <Text style={[styles.subtitle, { color: muted }]}>
            Sign in to continue to Pearl FM
          </Text>
        </View>

        {/* GOOGLE BUTTON */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={showToast}
            style={[
              styles.button,
              {
                backgroundColor: surface,
                borderColor: border,
                shadowColor: isLight ? "#00000015" : "transparent",
                shadowOpacity: isLight ? 0.06 : 0,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
              },
            ]}
          >
            <GoogleIcon size={22} />
            <Text style={[styles.buttonText, { color: text }]}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>

        {/* SEPARATOR */}
        <View style={styles.separatorRow}>
          <View style={[styles.separatorLine, { borderColor: border }]} />
          <Text style={[styles.separatorText, { color: muted }]}>OR</Text>
          <View style={[styles.separatorLine, { borderColor: border }]} />
        </View>

        {/* PHONE INPUT */}
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.inputWrapper,
              {
                backgroundColor: surface,
                borderColor: border,
              },
            ]}
          >
            <Text style={[styles.inputLabel, { color: muted }]}>
              Phone Number (Uganda)
            </Text>

            <View style={styles.phoneRow}>
              <Text style={[styles.cc, { color: text }]}>+256</Text>

              <TextInput
                placeholder="7XX XXX XXX"
                placeholderTextColor={isLight ? "#999" : "#777"}
                keyboardType="phone-pad"
                maxLength={9}
                value={phone}
                onChangeText={setPhone}
                style={[styles.input, { color: text }]}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={showToast}
            disabled={!isValidUgandaPhone("+256" + phone)}
            style={[
              styles.primaryButton,
              {
                backgroundColor: isValidUgandaPhone("+256" + phone)
                  ? accent
                  : isLight
                  ? "rgba(0,0,0,0.08)"
                  : "rgba(255,255,255,0.15)",
              },
            ]}
          >
            <Text style={styles.primaryButtonText}>Continue with Phone</Text>
          </TouchableOpacity>
        </View>

        {/* SETTINGS */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: muted }]}>Settings</Text>

          <View
            style={[
              styles.itemRow,
              { backgroundColor: surface, borderColor: border },
            ]}
          >
            <Text style={[styles.itemLabel, { color: text }]}>App Theme</Text>

            <View style={{ marginLeft: "auto" }}>
              <ThemeToggle />
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footerContainer}>
          <Text style={[styles.footerText, { color: muted }]}>
            Pearl of Africa Radio • v1.0.0
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Linking.openURL("https://iventics.com")}
          >
            <Text style={[styles.footerBrand, { color: accent }]}>
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

  headerSection: {
    alignItems: "center",
    marginTop: 28,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },

  button: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 24,
    width: "85%",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },

  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
    marginHorizontal: 30,
  },
  separatorLine: {
    flex: 1,
    borderBottomWidth: 1,
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 13,
    fontWeight: "700",
  },

  inputWrapper: {
    width: "85%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cc: {
    fontSize: 16,
    fontWeight: "700",
    opacity: 0.8,
  },
  input: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 4,
  },

  /* CONTINUE BUTTON */
  primaryButton: {
    marginTop: 14, // reduced
    width: "85%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "white",
  },

  section: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: "600",
  },

  footerContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 11.5,
  },
  footerBrand: {
    fontSize: 12.5,
    fontWeight: "600",
    marginTop: 3,
  },
});
