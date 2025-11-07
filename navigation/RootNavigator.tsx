import React from "react";
import { View, Text, Platform } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  HeartHandshake,
  ShoppingCart,
  Ticket,
  User2,
} from "lucide-react-native";
import { COLORS } from "../theme/colors";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ComingSoonScreen from "../components/ComingSoon";

const Tab = createBottomTabNavigator();

/* ============================================================
   🎧 RootNavigator — Pearl FM Uganda (Line-Fix Edition)
   ------------------------------------------------------------
   ✅ Fixes active bubble cutting through border
   ✅ Maintains all blue premium visuals
   ✅ Balanced, readable, and production-ready
============================================================ */

export default function RootNavigator() {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Home,
    Charity: HeartHandshake,
    Shop: ShoppingCart,
    Tickets: Ticket,
    Account: User2,
  };

  const ACTIVE = COLORS.primary || "#030268";
  const INACTIVE = COLORS.muted || "#9CA3AF";
  const BORDER = "#E5E7EB";
  const BG = COLORS.white || "#FFFFFF";

  const navTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: BG },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <View
        style={{
          flex: 1,
          backgroundColor: BORDER, // ✅ adds visual separation
          paddingTop: 0.5, // ✅ thin border illusion outside tab bar
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: ACTIVE,
            tabBarInactiveTintColor: INACTIVE,
            tabBarStyle: {
              backgroundColor: BG,
              borderTopWidth: 0, // ✅ remove internal border (handled by wrapper)
              height: Platform.OS === "ios" ? 88 : 80,
              paddingBottom: Platform.OS === "ios" ? 14 : 10,
              paddingTop: 6,
              elevation: 10,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: -2 },
              shadowRadius: 4,
              overflow: "hidden",
            },
            tabBarLabel: () => null,
            tabBarIcon: ({ color, focused }) => {
              const Icon = iconMap[route.name] || Home;

              const baseSize = 28;
              const iconSize = focused ? baseSize + 3 : baseSize;
              const stroke = focused ? 2.5 : 2.2;
              const labelSize = focused ? 15 : 14;

              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    transform: [{ scale: focused ? 1.07 : 1 }],
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      borderRadius: 20,
                      marginBottom: 3,
                      backgroundColor: focused ? `${ACTIVE}20` : "transparent",
                    }}
                  >
                    <Icon size={iconSize} color={color} strokeWidth={stroke} />
                  </View>
                  <Text
                    style={{
                      fontSize: labelSize,
                      marginTop: 3,
                      fontWeight: focused ? "700" : "600",
                      color,
                      letterSpacing: 0.3,
                    }}
                  >
                    {route.name}
                  </Text>
                </View>
              );
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Charity" component={ComingSoonScreen} />
          <Tab.Screen name="Shop" component={ComingSoonScreen} />
          <Tab.Screen name="Tickets" component={ComingSoonScreen} />
          <Tab.Screen name="Account" component={ComingSoonScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
