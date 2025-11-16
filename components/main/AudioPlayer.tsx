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

import Toast from "react-native-toast-message";
import { useTheme } from "../../hooks/useTheme";

// Only one audio globally
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
  const isBuffering = status?.isBuffering ?? false;

  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [manualPause, setManualPause] = useState(false);

  const retryTimer = useRef<NodeJS.Timeout | null>(null);
  const pulse = useRef(new Animated.Value(1)).current;

  const { background, accent, isLight } = useTheme();

  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  /* ---------------------------------------------------------
     Expo-audio mode
     --------------------------------------------------------- */
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: false,
    }).catch(() => {});
  }, []);

  /* ---------------------------------------------------------
     Global single-player logic
     --------------------------------------------------------- */
  useEffect(() => {
    const unsub = globalAudio.subscribe((active) => {
      if (active !== streamUrl && isPlaying) {
        setManualPause(true);
        player.pause();
      }
    });

    // FIX: Cleanup returns void
    return () => {
      unsub();
    };
  }, [isPlaying, streamUrl, player]);

  /* ---------------------------------------------------------
     AppState cleanup
     --------------------------------------------------------- */
  useEffect(() => {
    const sub = AppState.addEventListener("change", () => {});

    // FIX: Cleanup returns void
    return () => {
      try {
        sub.remove();
      } catch {}
    };
  }, []);

  /* ---------------------------------------------------------
     Auto reconnect (with toast)
     --------------------------------------------------------- */
  useEffect(() => {
    if (manualPause) return; // user paused manually

    if (isPlaying) {
      setRetryCount(0);
      return;
    }

    if (!isPlaying && !loading && retryCount < 5) {
      retryTimer.current = setTimeout(async () => {
        try {
          await player.replace(`${streamUrl}?r=${Date.now()}`);
          await player.play();
          setRetryCount((c) => c + 1);
        } catch {
          setRetryCount((c) => c + 1);
        }
      }, 2000);
    }

    if (retryCount === 5) {
      Toast.show({
        type: "error",
        text1: "Connection Failed",
        text2: "Unable to reconnect to the stream.",
      });
    }

    // FIX: Cleanup returns void
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, [isPlaying, loading, manualPause, retryCount, player, streamUrl]);

  /* ---------------------------------------------------------
     Pulse animation
     --------------------------------------------------------- */
  useEffect(() => {
    let anim: Animated.CompositeAnimation | null = null;

    if (!isPlaying) {
      anim = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.15,
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

    // FIX: Cleanup returns void
    return () => {
      try {
        anim?.stop();
      } catch {}
    };
  }, [isPlaying]);

  /* ---------------------------------------------------------
     Play/pause logic
     --------------------------------------------------------- */
  async function togglePlayback() {
    try {
      setLoading(true);

      if (isPlaying) {
        setManualPause(true);
        await player.pause();
        globalAudio.set(null);
        return;
      }

      setManualPause(false); // user wants to play again

      await player.replace(`${streamUrl}?ts=${Date.now()}`);
      globalAudio.set(streamUrl);

      await player.play();

      // wait for playing
      await new Promise((resolve, reject) => {
        const iv = setInterval(() => {
          if (statusRef.current?.playing) {
            clearInterval(iv);
            resolve(null);
          }
        }, 50);

        setTimeout(() => {
          clearInterval(iv);
          reject(new Error("timeout"));
        }, 5000);
      });

      setRetryCount(0);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Playback Error",
        text2: "Unable to start the stream.",
      });
    } finally {
      setLoading(false);
    }
  }

  /* UI */
  const BG = isLight ? background : "#2A2A3D";
  const BORDER = isPlaying ? accent : isLight ? "#D1D5DB" : "#3A3A50";
  const ICON = isPlaying ? accent : isLight ? "#000" : "#FFF";
  const showBuffering = loading || isBuffering;

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
          {showBuffering ? (
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
  container: { alignItems: "center", justifyContent: "center" },
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
  },
});
