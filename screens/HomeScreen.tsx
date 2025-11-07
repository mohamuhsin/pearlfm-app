import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
} from "react-native";
import { useAudioPlayer } from "expo-audio";
import { COLORS } from "../theme/colors";
import TopBar from "../components/TopBar";
import Greetings from "../components/Greetings";
import TopCategories from "../components/Actions";
import AdCarousel from "../components/AdCarousel";

export default function HomeScreen() {
  const STREAM_URL = "https://dc4.serverse.com/proxy/pearlfm/stream";
  const player = useAudioPlayer(STREAM_URL);
  const [loading, setLoading] = useState(false);

  async function togglePlayback() {
    try {
      setLoading(true);
      if (player.playing) {
        await player.pause();
      } else {
        await player.play();
      }
    } catch (err) {
      console.error("Playback error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <TopBar variant="light" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 👋 Greeting Section */}
        <Greetings variant="light" />

        {/* 🎞️ Ad Carousel */}
        <AdCarousel variant="light" />

        {/* 🧭 Quick Actions */}
        <TopCategories variant="light" />

        {/* 🎧 Live Radio Section */}
        <View style={styles.body}>
          <Text style={styles.title}>🎙️ Pearl FM Uganda</Text>
          <Text style={styles.subtitle}>Assalamu Alaikum — Tune in Live</Text>

          <TouchableOpacity
            style={[
              styles.button,
              player.playing && styles.buttonActive,
              loading && { opacity: 0.6 },
            ]}
            onPress={togglePlayback}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  player.playing && styles.buttonTextActive,
                ]}
              >
                {player.playing ? "⏸ Pause" : "▶️ Listen Live"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background, // 🤍 soft and breathable
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.primary, // brand blue/maroon
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 15,
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  button: {
    backgroundColor: COLORS.accent, // 🟠 CTA button
    paddingVertical: 14,
    paddingHorizontal: 56,
    borderRadius: 35,
    shadowColor: "#00000040",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: COLORS.white, // solid white when active
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  buttonTextActive: {
    color: COLORS.primary,
  },
});
