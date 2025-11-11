/**
 * ============================================================
 *  🎞️ AdCarousel — Pearl FM Mobile (Fixed-Dots Final)
 * ------------------------------------------------------------
 *  • Dots are visually inside the banner (not below)
 *  • Remain fixed — don’t scroll with images
 *  • No clipping of shadows or gradients
 * ============================================================
 */

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";
import { LAYOUT } from "../../theme/layout";

const HERO_HEIGHT = 220;

interface AdCarouselProps {
  images?: string[];
  interval?: number;
}

export default function AdCarousel({
  images = [
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
    "https://i.pinimg.com/736x/6f/7d/19/6f7d19afe09324279d2c9118b8962d53.jpg",
    "https://i.pinimg.com/736x/85/e2/9c/85e29cd21c9443e9947ffda5b06c8e73.jpg",
  ],
  interval = 5000,
}: AdCarouselProps) {
  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const { accent, isLight } = useTheme();

  // 📏 Measure width within PageLayout grid
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

  // 🧭 Manual scroll index update
  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!containerWidth) return;
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / containerWidth);
    setIndex(newIndex);
  };

  const gradientColors = isLight
    ? (["rgba(0,0,0,0.2)", "rgba(0,0,0,0.55)"] as const)
    : (["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"] as const);

  return (
    <Section pad={false} onLayout={handleLayout} style={styles.section}>
      {containerWidth > 0 && (
        <View style={[styles.carouselWrapper, { height: HERO_HEIGHT }]}>
          {/* 🎞️ Image Carousel */}
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

          {/* 🔘 Pagination Dots — fixed & inside the frame */}
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
  carouselWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  card: {
    justifyContent: "flex-end",
    overflow: "hidden", // keep gradients tidy
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: "#00000040",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
    }),
  },
  dots: {
    position: "absolute",
    bottom: LAYOUT.V_SPACING.sm, // ✅ inside the hero image
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
