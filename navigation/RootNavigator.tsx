import React from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import { COLORS } from "../theme/colors";
import { RootStackParamList } from "./types";

import EventsScreen from "../screens/Secondary/EventsScreen";
import ShopScreen from "../screens/Secondary/ShopScreen";
import PartnersScreen from "../screens/Secondary/PartnersScreen";
import NotificationsScreen from "../screens/Secondary/NotificationsScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.background,
      text: COLORS.text,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ flex: 1 }}>
          <Stack.Navigator
            initialRouteName="MainTabs"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="MainTabs" component={TabNavigator} />

            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="Shop" component={ShopScreen} />
            <Stack.Screen name="Partners" component={PartnersScreen} />
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
