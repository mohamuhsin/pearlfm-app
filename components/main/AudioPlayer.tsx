import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  AppState,
} from "react-native";

import { Play, Pause } from "lucide-react-native";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
  setAudioModeAsync,
} from "expo-audio";

import { useTheme } from "../../hooks/useTheme";

const globalAudio = {
  activeUrl: null as string | null,
  listeners: new Set<(url: string | null) => void>(),

  set(url: string | null) {
    this.activeUrl = url;
    this.listeners.forEach((fn) => fn(url));
  },

  subscribe(fn: (url: string | null) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  },
};

interface AudioPlayerButtonProps {
  streamUrl: string;
}

export default function AudioPlayerButton({
  streamUrl,
}: AudioPlayerButtonProps) {
  const player = useAudioPlayer();
  const status = useAudioPlayerStatus(player);
  const isPlaying = status?.playing ?? false;

  const [loading, setLoading] = useState(false);

  const pulse = useRef(new Animated.Value(1)).current;
  const { background, accent, isLight } = useTheme();

  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: false,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const unsub = globalAudio.subscribe((active) => {
      if (active !== streamUrl && isPlaying) {
        player.pause();
      }
    });
    return () => unsub();
  }, [player, streamUrl, isPlaying]);

  useEffect(() => {
    const sub = AppState.addEventListener("change", () => {});
    return () => sub.remove();
  }, []);

  useEffect(() => {
    let anim: Animated.CompositeAnimation | null = null;

    if (!isPlaying) {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.16,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      anim.start();
    } else {
      pulse.setValue(1);
    }

    return () => anim?.stop();
  }, [isPlaying]);

  async function togglePlayback() {
    try {
      setLoading(true);

      if (isPlaying) {
        await player.pause();
        globalAudio.set(null);
        return;
      }

      await player.replace(`${streamUrl}?t=${Date.now()}`);

      await new Promise((resolve) => setTimeout(resolve, 150));

      globalAudio.set(streamUrl);

      await player.play();

      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (statusRef.current?.playing === true) {
            clearInterval(interval);
            resolve(null);
          }
        }, 50);
      });
    } catch (e) {
      console.error("Playback error:", e);
    } finally {
      setLoading(false);
    }
  }

  const BG = isLight ? background : "#2A2A3D";
  const BORDER = isPlaying ? accent : isLight ? "#D1D5DB" : "#3A3A50";
  const ICON = isPlaying ? accent : isLight ? "#000" : "#FFF";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
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
