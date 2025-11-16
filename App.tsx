import React from "react";
import { StatusBar, Platform, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as SystemUI from "expo-system-ui";
import * as SplashScreen from "expo-splash-screen";

import RootNavigator from "./navigation/RootNavigator";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import Toast from "react-native-toast-message";

// Keep splash visible until manual hide
SplashScreen.preventAutoHideAsync();

function ThemedApp() {
  const { colors, isDark, isLoaded } = useThemeContext();

  // Fade-in animation value
  const opacity = React.useRef(new Animated.Value(0)).current;

  // Apply system background AFTER splash is gone
  React.useEffect(() => {
    if (isLoaded) {
      SystemUI.setBackgroundColorAsync(colors.background);
    }
  }, [isLoaded, colors.background]);

  // 🔥 Keep splash visible 5 seconds, then fade UI in
  React.useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        SplashScreen.hideAsync();

        // Start fade-in animation
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Splash stays until app is loaded
  if (!isLoaded) return null;

  return (
    <Animated.View style={{ flex: 1, opacity }}>
      <SafeAreaView
        edges={["top", "bottom"]}
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDark ? "light-content" : "dark-content"}
        />

        <RootNavigator />
        <Toast />
      </SafeAreaView>
    </Animated.View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
