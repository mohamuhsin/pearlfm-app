import React from "react";
import { View, Text, Platform } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  HeartHandshake,
  ShoppingCart,
  Ticket,
  User2,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import HomeScreen from "../screens/HomeScreen";
import ComingSoonScreen from "../components/ComingSoon";

/* -------------------------------------------------------------
   🌈 ICONS + LABELS
------------------------------------------------------------- */
const ICONS: Record<string, React.ComponentType<any>> = {
  Home,
  Charity: HeartHandshake,
  Shop: ShoppingCart,
  Tickets: Ticket,
  Account: User2,
};

const LABELS: Record<string, string> = {
  Home: "Home",
  Charity: "Charity",
  Shop: "Shop",
  Tickets: "Tickets",
  Account: "Account",
};

const TAB_HEIGHT = Platform.select({ ios: 86, android: 74 }) as number;
const PADDING_TOP = 10;
const PADDING_BOTTOM = 6;
const Y_SHIFT = Platform.select({ ios: 2, android: 2.5 }) as number;

const Tab = createBottomTabNavigator();

/* -------------------------------------------------------------
   ⚡ RootNavigator — Pearl FM Uganda (Dark Bottom Bar Edition)
   -------------------------------------------------------------
   ✴ Dark bar (nav) background
   ✴ Active icons/text = white
   ✴ Inactive icons/text = soft gray
------------------------------------------------------------- */
export default function RootNavigator() {
  const TAB_BG = "#0f0f12ff"; // dark background for the bottom nav
  const ACTIVE = "#FFFFFF"; // white active icons/text
  const INACTIVE = "#9CA3AF"; // muted gray
  const BORDER = "#1F1F22"; // subtle border line
  const TEXT = COLORS.text;

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.background,
      text: TEXT,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: ACTIVE,
              tabBarInactiveTintColor: INACTIVE,
              tabBarHideOnKeyboard: true,
              animation: "fade",
              tabBarStyle: {
                backgroundColor: TAB_BG,
                borderTopWidth: 1,
                borderTopColor: BORDER,
                height: TAB_HEIGHT,
                paddingTop: PADDING_TOP,
                paddingBottom: PADDING_BOTTOM,
                elevation: 10,
                shadowColor: "#000000",
                shadowOpacity: 0.5,
                shadowOffset: { width: 0, height: -3 },
                shadowRadius: 8,
              },
              tabBarLabel: () => null,

              /* --------------------------------------------
                 🎧 Icon + Label
              -------------------------------------------- */
              tabBarIcon: ({ color, focused }) => {
                const Icon = ICONS[route.name] || Home;
                const label = LABELS[route.name] ?? route.name;

                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      transform: [{ translateY: Y_SHIFT }],
                      minWidth: 72,
                    }}
                    accessibilityRole="tab"
                    accessibilityLabel={label}
                    hitSlop={{ top: 6, bottom: 6, left: 8, right: 8 }}
                  >
                    <Icon
                      size={focused ? 34 : 30}
                      color={color}
                      strokeWidth={focused ? 2.6 : 2.2}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        lineHeight: 11,
                        marginTop: 2,
                        fontWeight: focused ? "700" : "500",
                        color,
                        letterSpacing: 0.1,
                        textAlign: "center",
                        includeFontPadding: false,
                      }}
                      numberOfLines={2}
                      ellipsizeMode="clip"
                      allowFontScaling={false}
                    >
                      {label}
                    </Text>
                  </View>
                );
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shop" component={ComingSoonScreen} />
            <Tab.Screen name="Charity" component={ComingSoonScreen} />
            <Tab.Screen name="Tickets" component={ComingSoonScreen} />
            <Tab.Screen name="Account" component={ComingSoonScreen} />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}
