import React, { createContext, useContext } from "react";
import { useThemeApp } from "../hooks/useAppTheme";
type ThemeContextType = ReturnType<typeof useThemeApp> | null;

const ThemeContext = createContext<ThemeContextType>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeApp();

  if (!theme.isLoaded) return null;

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
