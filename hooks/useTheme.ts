import { useThemeContext } from "../context/ThemeContext";

/**
 * useTheme()
 * ------------------------------------------------------------
 * Lightweight consumer hook for components.
 * Gives direct access to themed colors and quick helpers.
 */
export function useTheme() {
  const { colors, isLight, isDark, mode } = useThemeContext();

  return {
    ...colors, // flatten color tokens for direct access
    isLight,
    isDark,
    mode,
  };
}
