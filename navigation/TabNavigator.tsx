import React from "react";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, HeartHandshake, Ticket, User2 } from "lucide-react-native";

import HomeScreen from "../screens/Primary/HomeScreen";
import CharityScreen from "../screens/Primary/CharityScreen";
import TicketsScreen from "../screens/Primary/TicketsScreen";
import AccountScreen from "../screens/Primary/AccountScreen";
import { TabParamList } from "./types";
import AudioPlayerButton from "../components/main/AudioPlayer";

const TAB_THEME = {
  background: "#1a1a1a",
  active: "#FFFFFF",
  inactive: "#9CA3AF",
  border: "#1a1a1a",
};

const TAB_HEIGHT = Platform.select({ ios: 86, android: 74 }) as number;
const TAB_PADDING_TOP = 10;
const TAB_PADDING_BOTTOM = 6;
const ICON_SHIFT_Y = Platform.select({ ios: 2, android: 2.5 }) as number;

const ICONS: Record<string, React.ComponentType<any>> = {
  Home,
  Charity: HeartHandshake,
  Tickets: Ticket,
  Account: User2,
};

const LABELS: Record<string, string> = {
  Home: "Home",
  Charity: "Charity",
  Tickets: "Tickets",
  Account: "Account",
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  const STREAM_URL = "https://dc4.serverse.com/proxy/pearlfm/stream";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: TAB_THEME.active,
        tabBarInactiveTintColor: TAB_THEME.inactive,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: TAB_THEME.background,
          borderTopWidth: 1,
          borderTopColor: TAB_THEME.border,
          height: TAB_HEIGHT,
          paddingTop: TAB_PADDING_TOP,
          paddingBottom: TAB_PADDING_BOTTOM,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.45,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 8,
        },
        tabBarIcon: ({ color, focused }) => {
          if (route.name === "Radio") return null;
          const Icon = ICONS[route.name] || Home;
          const label = LABELS[route.name];
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                transform: [{ translateY: ICON_SHIFT_Y }],
                minWidth: 70,
              }}
            >
              <Icon
                size={focused ? 30 : 28}
                color={color}
                strokeWidth={focused ? 2.4 : 2.2}
              />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 2,
                  fontWeight: focused ? "700" : "500",
                  color,
                  letterSpacing: 0.1,
                  textAlign: "center",
                }}
              >
                {label}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Charity" component={CharityScreen} />

      <Tab.Screen
        name="Radio"
        component={View}
        options={{
          tabBarButton: () => <AudioPlayerButton streamUrl={STREAM_URL} />,
        }}
      />

      <Tab.Screen name="Tickets" component={TicketsScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
