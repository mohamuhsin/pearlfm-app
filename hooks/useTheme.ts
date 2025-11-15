import { useThemeContext } from "../context/ThemeContext";

export function useTheme() {
  const { colors, isLight, isDark, mode } = useThemeContext();

  return {
    ...colors,
    isLight,
    isDark,
    mode,
  };
}
