import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home,
  HeartHandshake,
  Ticket,
  User2,
  Play,
  Pause,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import HomeScreen from "../screens/HomeScreen";
import ComingSoonScreen from "../components/ComingSoon";
import { useAudioPlayer } from "expo-audio";

/* ============================================================
   🎨 Constants & Theme
============================================================ */
const TAB_THEME = {
  background: "#0F0F12",
  active: "#FFFFFF",
  inactive: "#9CA3AF",
  border: "#1F1F22",
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

const Tab = createBottomTabNavigator();

/* ============================================================
   ⚡ RootNavigator — Pearl FM Uganda (Perfectly Centered Player)
============================================================ */
export default function RootNavigator() {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.background,
      text: COLORS.text,
    },
  };

  // 🎧 Audio Player
  const STREAM_URL = "https://dc4.serverse.com/proxy/pearlfm/stream";
  const player = useAudioPlayer(STREAM_URL);
  const [loading, setLoading] = useState(false);

  // ✨ Animated pulse effect when playing
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (player.playing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.08,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      pulse.setValue(1);
    }
  }, [player.playing]);

  async function togglePlayback() {
    try {
      setLoading(true);
      if (player.playing) await player.pause();
      else await player.play();
    } catch (err) {
      console.error("Playback error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: TAB_THEME.active,
              tabBarInactiveTintColor: TAB_THEME.inactive,
              tabBarHideOnKeyboard: true,
              animation: "fade",
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

              /* --------------------------------------------
                 🎧 Icon + Label (except Radio)
              -------------------------------------------- */
              tabBarIcon: ({ color, focused }) => {
                if (route.name === "Radio") return null;

                const Icon = ICONS[route.name] || Home;
                const label = LABELS[route.name] ?? route.name;

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
            {/* 🏠 Home */}
            <Tab.Screen name="Home" component={HomeScreen} />

            {/* 🤝 Charity */}
            <Tab.Screen name="Charity" component={ComingSoonScreen} />

            {/* 🎧 CENTER TAB — perfectly centered radio button */}
            <Tab.Screen
              name="Radio"
              component={View}
              options={{
                tabBarButton: () => (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.9}
                      accessibilityLabel="Play or pause Pearl FM live radio"
                      onPress={!loading ? togglePlayback : undefined}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 56,
                        borderRadius: 28,
                      }}
                    >
                      <Animated.View
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 28,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: player.playing
                            ? COLORS.accent
                            : "transparent",
                          borderWidth: 2.5,
                          borderColor: player.playing
                            ? COLORS.accent
                            : "rgba(255,255,255,0.3)",
                          shadowColor: player.playing
                            ? COLORS.accent
                            : "transparent",
                          shadowOpacity: 0.4,
                          shadowOffset: { width: 0, height: 2 },
                          shadowRadius: 6,
                          elevation: player.playing ? 8 : 0,
                          transform: [{ scale: pulse }],
                        }}
                      >
                        {loading ? (
                          <ActivityIndicator color={TAB_THEME.active} />
                        ) : player.playing ? (
                          <Pause
                            size={26}
                            color={TAB_THEME.active}
                            strokeWidth={2.4}
                          />
                        ) : (
                          <Play
                            size={26}
                            color={TAB_THEME.active}
                            strokeWidth={2.4}
                          />
                        )}
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                ),
              }}
            />

            {/* 🎫 Tickets */}
            <Tab.Screen name="Tickets" component={ComingSoonScreen} />

            {/* 👤 Account */}
            <Tab.Screen name="Account" component={ComingSoonScreen} />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}
