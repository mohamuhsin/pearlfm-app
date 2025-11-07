import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import { COLORS } from "../theme/colors";

export default function HomeScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const sound = useRef<Audio.Sound | null>(null);

  const STREAM_URL = "https://dc4.serverse.com/proxy/pearlfm/stream";

  async function togglePlayback() {
    try {
      if (!isPlaying) {
        setLoading(true);
        const { sound: playbackObj } = await Audio.Sound.createAsync(
          { uri: STREAM_URL },
          { shouldPlay: true }
        );
        sound.current = playbackObj;
        setIsPlaying(true);
      } else {
        await sound.current?.stopAsync();
        await sound.current?.unloadAsync();
        setIsPlaying(false);
      }
    } catch (err) {
      console.log("Playback error", err);
    } finally {
      setLoading(false);
    }
  }

  // cleanup when component unmounts
  useEffect(() => {
    return () => {
      sound.current?.unloadAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>🎙️ Pearl FM Uganda</Text>
      <Text style={styles.subtext}>Assalamu Alaikum — Tune in live</Text>

      <TouchableOpacity
        style={[styles.button, isPlaying && styles.buttonActive]}
        onPress={togglePlayback}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isPlaying ? "⏸ Pause" : "▶️ Listen Live"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtext: {
    color: COLORS.text,
    opacity: 0.8,
    marginBottom: 32,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonActive: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
