import { useColorScheme } from "react-native";
import { useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../theme/colors";

export type ThemeMode = "light" | "dark" | "system";
const THEME_KEY = "@pearlfm_theme_mode";

export function useThemeApp(initialMode?: ThemeMode) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(initialMode || "system");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        if (saved === "light" || saved === "dark" || saved === "system") {
          setMode(saved);
        } else {
          setMode("system");
        }
      } catch (err) {
        console.warn("Failed to load theme:", err);
      } finally {
        setIsLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(THEME_KEY, mode).catch(console.warn);
    }
  }, [mode, isLoaded]);

  const effectiveMode: "light" | "dark" =
    mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;

  const colors = useMemo(() => {
    const base = COLORS[effectiveMode] || COLORS.light;
    return {
      ...base,
      white: COLORS.white,
      black: COLORS.black,
      transparent: COLORS.transparent,
    };
  }, [effectiveMode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return {
    colors,
    isLight: effectiveMode === "light",
    isDark: effectiveMode === "dark",
    mode,
    effectiveMode,
    toggleTheme,
    isLoaded,
  };
}
