/**
 * ============================================================
 *  🎧 AudioPlayerButton — Pearl FM Mobile (Expo Audio Stable)
 * ------------------------------------------------------------
 *  • Global sync (only one button plays at a time)
 *  • TypeScript-safe for expo-audio@1.x
 *  • Works in background (native build / EAS)
 *  • Flat adaptive visuals (light/dark)
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
  AppState,
  AppStateStatus,
} from "react-native";
import { Play, Pause } from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";
import { useTheme } from "../../hooks/useTheme";

// 🟩 Global store to coordinate all player buttons
const globalAudioStore = {
  currentUrl: null as string | null,
  listeners: new Set<(url: string | null) => void>(),
  set(url: string | null) {
    this.currentUrl = url;
    this.listeners.forEach((fn) => fn(url));
  },
  subscribe(fn: (url: string | null) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  },
};

interface AudioPlayerButtonProps {
  streamUrl: string;
}

export default function AudioPlayerButton({
  streamUrl,
}: AudioPlayerButtonProps) {
  const player = useAudioPlayer(streamUrl);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef<Animated.CompositeAnimation | null>(null);
  const { background, accent, isLight } = useTheme();

  // 🔁 Keep UI synced with player + global control
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(player.playing);
    }, 400);

    const unsub = globalAudioStore.subscribe((url) => {
      if (url !== streamUrl && player.playing) {
        player.pause();
      }
    });

    return () => {
      clearInterval(interval);
      unsub();
    };
  }, [player, streamUrl]);

  // 🧭 Handle app state (refresh when active again)
  useEffect(() => {
    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === "active") setIsPlaying(player.playing);
    };
    const sub = AppState.addEventListener("change", handleAppStateChange);
    return () => sub.remove();
  }, [player]);

  // 🟣 Subtle pulse animation for idle state
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

  // ▶️ / ⏸ Toggle playback globally
  async function togglePlayback() {
    try {
      setLoading(true);

      if (player.playing) {
        await player.pause();
        globalAudioStore.set(null);
      } else {
        globalAudioStore.set(streamUrl);
        await player.play();
      }
    } catch (err) {
      console.error("Playback error:", err);
    } finally {
      setLoading(false);
      setIsPlaying(player.playing);
    }
  }

  // 🎨 Visuals
  const BG = isLight ? background : "#2A2A3D";
  const BORDER = isPlaying ? accent : isLight ? "#D1D5DB" : "#3A3A50";
  const ICON = isPlaying ? accent : isLight ? "#000000" : "#FFFFFF";

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

// 💅 Styles
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
