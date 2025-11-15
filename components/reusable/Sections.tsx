import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  pad?: boolean;
  surface?: boolean;
  style?: ViewStyle;
  onLayout?: (e: LayoutChangeEvent) => void;
}

export default function Section({
  title,
  children,
  pad = true,
  surface = false,
  style,
  onLayout,
}: SectionProps) {
  const { background, surface: surfaceColor, text, isLight } = useTheme();

  const backgroundColor = surface ? surfaceColor : background;
  const titleColor = isLight ? text : "#F5F5F7";

  return (
    <View
      onLayout={onLayout}
      style={[styles.wrapper, { backgroundColor }, pad && styles.padded, style]}
    >
      {title && (
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignSelf: "stretch",
    backgroundColor: "transparent",
  },
  padded: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.3,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "left",
  },
});
