/**
 * ============================================================
 *  🧭 RootNavigator — Pearl FM Mobile
 * ------------------------------------------------------------
 *  Main navigation container connecting tabs and secondary
 *  screens, fully synced with the app's dynamic theme.
 * ============================================================
 */

import React from "react";
import { View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import { RootStackParamList } from "./types";
import EventsScreen from "../screens/Secondary/EventsScreen";
import ShopScreen from "../screens/Secondary/ShopScreen";
import PartnersScreen from "../screens/Secondary/PartnersScreen";
import NotificationsScreen from "../screens/Secondary/NotificationsScreen";
import ServicesScreen from "../screens/Secondary/ServicesScreen";

import { useThemeContext } from "../context/ThemeContext";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // 🎨 Access theme colors directly from global context
  const { colors, isLight } = useThemeContext();

  // 🧠 Build a unified navigation theme
  const navTheme: NavigationTheme = {
    ...(isLight ? DefaultTheme : DarkTheme),
    colors: {
      ...(isLight ? DefaultTheme.colors : DarkTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.accent,
      notification: colors.accentSoft,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ flex: 1 }}>
          <Stack.Navigator
            initialRouteName="MainTabs"
            screenOptions={{
              headerShown: false,
              presentation: "card",
              animationEnabled: true,
              gestureEnabled: true,
              detachPreviousScreen: false,
            }}
          >
            {/* 🌐 Main Tab Navigator */}
            <Stack.Screen name="MainTabs" component={TabNavigator} />

            {/* 🗓 Secondary Screens */}
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="Partners" component={PartnersScreen} />
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
          </Stack.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}
