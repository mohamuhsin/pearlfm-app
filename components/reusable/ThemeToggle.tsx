import React, { useRef, useEffect } from "react";
import {
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Sun, Moon } from "lucide-react-native";
import { useThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { isLight, toggleTheme, colors } = useThemeContext();
  const anim = useRef(new Animated.Value(isLight ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isLight ? 0 : 1,
      duration: 320,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start();
  }, [isLight]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border || "#E5E7EB", colors.accent],
  });

  const iconOpacitySun = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const iconOpacityMoon = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.9}
      accessibilityRole="switch"
      accessibilityState={{ checked: !isLight }}
      style={styles.container}
    >
      <Animated.View style={[styles.track, { backgroundColor: trackColor }]}>
        <Animated.View style={[styles.iconLeft, { opacity: iconOpacitySun }]}>
          <Sun size={13} color="#fff" strokeWidth={2} />
        </Animated.View>

        <Animated.View style={[styles.iconRight, { opacity: iconOpacityMoon }]}>
          <Moon size={13} color="#fff" strokeWidth={2} />
        </Animated.View>

        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor: colors.white || "#FFF",
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  track: {
    width: 52,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "absolute",
    top: 2,
    left: 2,
    shadowColor: Platform.OS === "ios" ? "#000" : "#00000060",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: Platform.OS === "ios" ? 0.18 : 0.3,
    shadowRadius: 1.5,
    elevation: 2,
  },
  iconLeft: {
    position: "absolute",
    left: 6,
    top: "50%",
    transform: [{ translateY: -6.5 }],
  },
  iconRight: {
    position: "absolute",
    right: 6,
    top: "50%",
    transform: [{ translateY: -6.5 }],
  },
});
