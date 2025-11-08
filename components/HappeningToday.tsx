import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");
const H_PADDING = 22; // ✅ matches alignment of other sections
const HERO_WIDTH = width;
const HERO_HEIGHT = 150; // ✅ slightly reduced for perfect mobile ratio

interface HappeningTodayProps {
  images?: string[];
  interval?: number;
  variant?: "light" | "dark";
}

export default function HappeningToday({
  images = [
    "https://i.pinimg.com/736x/02/5b/7e/025b7ee74f4747d4b58f9dc1d584f8cb.jpg",
    "https://i.pinimg.com/736x/56/d9/5d/56d95df0c33c3774a4b0c55d94e38c84.jpg",
    "https://i.pinimg.com/736x/a4/0e/fb/a40efb96321c84cf44e64a1847b6fbc7.jpg",
  ],
  interval = 5000,
  variant = "light",
}: HappeningTodayProps) {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const isLight = variant === "light";
  const BG = isLight ? COLORS.primary : COLORS.backgroundDark;
  const TEXT = COLORS.white;

  // 🕒 Auto-scroll
  useEffect(() => {
    timer.current = setInterval(() => {
      const next = (index + 1) % images.length;
      scrollToIndex(next);
    }, interval);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [index, interval, images.length]);

  const scrollToIndex = (i: number): void => {
    flatListRef.current?.scrollToOffset({
      offset: i * HERO_WIDTH,
      animated: true,
    });
    setIndex(i);
  };

  const handleScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ): void => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / HERO_WIDTH);
    setIndex(newIndex);
  };

  return (
    <View style={[styles.section, { backgroundColor: BG }]}>
      <Text style={[styles.title, { color: TEXT }]}>Happening Today</Text>

      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <ImageBackground
                source={{ uri: item }}
                style={styles.image}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.55)"]}
                  style={styles.gradient}
                />
              </ImageBackground>
            </View>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {images.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => scrollToIndex(i)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.dot,
                {
                  opacity: i === index ? 1 : 0.3,
                  backgroundColor: COLORS.accent,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: "100%",
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 36,
  },
  title: {
    fontSize: 20, // ⬆️ Matches "Programs" and "Top Actions"
    fontWeight: "900", // ⬆️ Stronger presence
    letterSpacing: 0.4,
    paddingHorizontal: 22, // ✅ Same left padding as other titles
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  cardWrapper: {
    width: HERO_WIDTH,
    paddingHorizontal: H_PADDING,
  },
  card: {
    width: "100%",
    height: HERO_HEIGHT,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  dots: {
    position: "absolute",
    bottom: 14,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
});
