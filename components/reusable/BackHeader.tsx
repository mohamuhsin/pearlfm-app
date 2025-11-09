import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { ArrowLeft } from "lucide-react-native";
import { COLORS } from "../../theme/colors";

interface BackHeaderProps {
  title: string;
  variant?: "light" | "dark";
  showDone?: boolean;
  onDonePress?: () => void;
}

export default function BackHeader({
  title,
  variant = "light",
  showDone = false,
  onDonePress,
}: BackHeaderProps) {
  const navigation = useNavigation();
  const isLight = variant === "light";
  const BG = isLight ? COLORS.primary : COLORS.backgroundDark;
  const TEXT = COLORS.white;
  const ACCENT = COLORS.accent;

  const Container =
    Platform.OS === "ios"
      ? ({ children }: { children: React.ReactNode }) => (
          <BlurView
            intensity={40}
            tint={isLight ? "light" : "dark"}
            style={[styles.container, { backgroundColor: "transparent" }]}
          >
            {children}
          </BlurView>
        )
      : ({ children }: { children: React.ReactNode }) => (
          <View style={[styles.container, { backgroundColor: BG }]}>
            {children}
          </View>
        );

  return (
    <View style={styles.wrapper}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <SafeAreaView edges={["top", "left", "right"]}>
        <View style={[styles.separator, { backgroundColor: ACCENT }]} />

        <Container>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={styles.backButton}
          >
            <ArrowLeft size={22} color={TEXT} strokeWidth={2.4} />
          </TouchableOpacity>

          <Text style={[styles.title, { color: TEXT }]} numberOfLines={1}>
            {title}
          </Text>

          {showDone && (
            <TouchableOpacity
              onPress={onDonePress || (() => navigation.goBack())}
              activeOpacity={0.8}
              style={styles.doneButton}
            >
              <Text style={[styles.doneText, { color: TEXT }]}>Done</Text>
            </TouchableOpacity>
          )}
        </Container>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "transparent",
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 6 },
      ios: {
        shadowColor: "#00000040",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
      },
    }),
  },
  separator: {
    height: 2.5,
    width: "110%",
    marginLeft: -20,
  },
  container: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 5,
    padding: 8,
  },
  doneButton: {
    position: "absolute",
    right: 20,
    zIndex: 5,
    padding: 8,
  },
  doneText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.4,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
