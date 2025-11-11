/**
 * ============================================================
 *  🎧 AudioPlayerButton — Pearl FM Mobile (Light Flat Contrast)
 * ------------------------------------------------------------
 *  • Slightly lighter fill in dark mode (#2A2A3D)
 *  • Pure white icons in dark mode, pure black in light mode
 *  • Accent border when playing
 *  • Flat, clean, modern — no shadows or elevation
 * ============================================================
 */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import { Play, Pause } from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";
import { useTheme } from "../../hooks/useTheme";

interface AudioPlayerButtonProps {
  streamUrl: string;
}

export default function AudioPlayerButton({
  streamUrl,
}: AudioPlayerButtonProps) {
  const player = useAudioPlayer(streamUrl);
  const [loading, setLoading] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef<Animated.CompositeAnimation | null>(null);
  const { background, accent, border, isLight } = useTheme();

  const isPlaying = player.playing;

  // 🔁 Pulse animation only when NOT playing
  useEffect(() => {
    if (!isPlaying) {
      pulseAnim.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.08,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnim.current.start();
    } else {
      pulseAnim.current?.stop();
      pulse.setValue(1);
    }
  }, [isPlaying]);

  // ▶️ / ⏸ Toggle playback
  async function togglePlayback() {
    try {
      setLoading(true);
      if (player.playing) await player.pause();
      else await player.play();
    } catch (err) {
      console.error("Playback error:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🎨 Updated flat palette
  const BG = isLight ? background : "#2A2A3D"; // ✨ lighter dark mode surface
  const BORDER = isPlaying ? accent : isLight ? "#D1D5DB" : "#3A3A50"; // subtle border for separation
  const ICON = isPlaying
    ? accent
    : isLight
    ? "#000000" // black in light mode
    : "#FFFFFF"; // white in dark mode

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={!loading ? togglePlayback : undefined}
      >
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: BG,
              borderColor: BORDER,
              transform: [{ scale: pulse }],
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={ICON} />
          ) : isPlaying ? (
            <Pause size={26} color={ICON} strokeWidth={2.4} />
          ) : (
            <Play size={26} color={ICON} strokeWidth={2.4} />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
  },
});
