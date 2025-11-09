import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { Play, Pause } from "lucide-react-native";
import { useAudioPlayer } from "expo-audio";
import { COLORS } from "../../theme/colors";

interface AudioPlayerButtonProps {
  streamUrl: string;
}

export default function AudioPlayerButton({
  streamUrl,
}: AudioPlayerButtonProps) {
  const player = useAudioPlayer(streamUrl);
  const [loading, setLoading] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (player.playing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.08,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      pulse.setValue(1);
    }
  }, [player.playing]);

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

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={!loading ? togglePlayback : undefined}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
          borderRadius: 28,
        }}
      >
        <Animated.View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: player.playing ? COLORS.accent : "transparent",
            borderWidth: 2.5,
            borderColor: player.playing
              ? COLORS.accent
              : "rgba(255,255,255,0.3)",
            shadowColor: player.playing ? COLORS.accent : "transparent",
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 6,
            elevation: player.playing ? 8 : 0,
            transform: [{ scale: pulse }],
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : player.playing ? (
            <Pause size={26} color="#fff" strokeWidth={2.4} />
          ) : (
            <Play size={26} color="#fff" strokeWidth={2.4} />
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
