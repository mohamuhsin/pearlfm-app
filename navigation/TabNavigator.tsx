import React from "react";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, HeartHandshake, Ticket, User2 } from "lucide-react-native";

import HomeScreen from "../screens/Primary/HomeScreen";
import CharityScreen from "../screens/Primary/CharityScreen";
import TicketsScreen from "../screens/Primary/TicketsScreen";
import AuthScreen from "../screens/Secondary/AuthScreen";
import AudioPlayerButton from "../components/main/AudioPlayer";
import { TabParamList } from "./types";
import { useThemeContext } from "../context/ThemeContext";

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_HEIGHT = Platform.select({ ios: 84, android: 72 }) as number;
const TAB_PADDING_TOP = 10;
const TAB_PADDING_BOTTOM = 6;
const ICON_SHIFT_Y = Platform.select({ ios: 2, android: 2.5 }) as number;

const ICONS: Record<string, React.ComponentType<any>> = {
  Home,
  Charity: HeartHandshake,
  Tickets: Ticket,
  Auth: User2,
};

const LABELS: Record<string, string> = {
  Home: "Home",
  Charity: "Charity",
  Tickets: "Tickets",
  Auth: "Account",
};

export default function TabNavigator() {
  const STREAM_URL = "https://dc4.serverse.com/proxy/pearlfm/stream";
  const { colors, isLight } = useThemeContext();

  const ACTIVE_COLOR = colors.accent;
  const INACTIVE_COLOR = isLight ? "#000000" : "#FFFFFF";
  const BG_COLOR = colors.surface;
  const BORDER_COLOR = colors.border;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => null,
        tabBarStyle: {
          backgroundColor: BG_COLOR,
          borderTopWidth: 1,
          borderTopColor: BORDER_COLOR,
          height: TAB_HEIGHT,
          paddingTop: TAB_PADDING_TOP,
          paddingBottom: TAB_PADDING_BOTTOM,
          elevation: isLight ? 10 : 0,
          shadowColor: isLight ? "#000" : "#fff",
          shadowOpacity: isLight ? 0.12 : 0.05,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 6,
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
                size={focused ? 30 : 27}
                color={color}
                strokeWidth={focused ? 2.4 : 2.1}
              />
              <Text
                style={{
                  fontSize: 10.5,
                  marginTop: 2,
                  fontWeight: focused ? "700" : "500",
                  color,
                  letterSpacing: 0.2,
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
          tabBarButton: () => (
            <AudioPlayerButton streamUrl="https://dc4.serverse.com/proxy/pearlfm/stream" />
          ),
        }}
      />
      <Tab.Screen name="Tickets" component={TicketsScreen} />
      <Tab.Screen name="Auth" component={AuthScreen} />
    </Tab.Navigator>
  );
}
