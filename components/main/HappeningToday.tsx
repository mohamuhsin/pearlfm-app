/**
 * ============================================================
 *  🎤 HappeningToday — Pearl FM Mobile (Fixed-Dots Final)
 * ------------------------------------------------------------
 *  • Dots are visually inside the image (not below)
 *  • Stay fixed while scrolling
 *  • Perfect grid alignment with Programs & AdCarousel
 *  • Shadows & gradients fully visible
 * ============================================================
 */

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";
import { LAYOUT } from "../../theme/layout";

const HERO_HEIGHT = 150;

interface HappeningTodayProps {
  images?: string[];
  interval?: number;
}

export default function HappeningToday({
  images = [
    "https://i.pinimg.com/736x/02/5b/7e/025b7ee74f4747d4b58f9dc1d584f8cb.jpg",
    "https://i.pinimg.com/736x/56/d9/5d/56d95df0c33c3774a4b0c55d94e38c84.jpg",
    "https://i.pinimg.com/736x/a4/0e/fb/a40efb96321c84cf44e64a1847b6fbc7.jpg",
  ],
  interval = 5000,
}: HappeningTodayProps) {
  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const { accent, isLight, text } = useTheme();

  // 📏 Measure available width
  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w !== containerWidth) setContainerWidth(w);
  };

  // 🔁 Auto-scroll with cleanup
  useEffect(() => {
    if (!containerWidth) return;
    const id = setInterval(() => {
      const next = (index + 1) % images.length;
      flatListRef.current?.scrollToOffset({
        offset: next * containerWidth,
        animated: true,
      });
      setIndex(next);
    }, interval);
    return () => clearInterval(id);
  }, [index, interval, images.length, containerWidth]);

  // 🧭 Manual scroll update
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!containerWidth) return;
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / containerWidth);
    setIndex(newIndex);
  };

  const gradientColors = isLight
    ? (["rgba(0,0,0,0.1)", "rgba(0,0,0,0.45)"] as const)
    : (["rgba(0,0,0,0.25)", "rgba(0,0,0,0.65)"] as const);

  return (
    <Section pad={false} onLayout={handleLayout} style={styles.section}>
      <Text style={[styles.title, { color: text }]}>Happening Today</Text>

      {containerWidth > 0 && (
        <View style={[styles.carouselWrapper, { height: HERO_HEIGHT }]}>
          {/* 🎤 Carousel */}
          <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(_, i) => i.toString()}
            horizontal
            pagingEnabled
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onMomentumScrollEnd={handleScrollEnd}
            renderItem={({ item }) => (
              <ImageBackground
                source={{ uri: item }}
                style={[
                  styles.card,
                  { width: containerWidth, height: HERO_HEIGHT },
                ]}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
              </ImageBackground>
            )}
          />

          {/* 🔘 Pagination Dots — fixed inside frame */}
          <View style={styles.dots}>
            {images.map((_, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.7}
                onPress={() =>
                  flatListRef.current?.scrollToOffset({
                    offset: i * containerWidth,
                    animated: true,
                  })
                }
              >
                <View
                  style={[
                    styles.dot,
                    {
                      opacity: i === index ? 1 : 0.3,
                      backgroundColor: accent,
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.3,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  carouselWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  card: {
    justifyContent: "flex-end",
    overflow: "hidden",
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: "#00000030",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    }),
  },
  dots: {
    position: "absolute",
    bottom: LAYOUT.V_SPACING.sm, // ✅ dots sit inside image
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
});
