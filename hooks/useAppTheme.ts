import { useColorScheme } from "react-native";
import { COLORS } from "../theme/colors";

export function useAppTheme(variant?: "light" | "dark") {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const isLight = variant === "light" || (!variant && !isDark);

  return {
    isLight,
    background: isLight ? COLORS.primary : COLORS.backgroundDark,
    text: isLight ? COLORS.white : COLORS.textDark,
    accent: COLORS.accent,
    muted: isLight ? COLORS.muted : COLORS.mutedDark,
  };
}
