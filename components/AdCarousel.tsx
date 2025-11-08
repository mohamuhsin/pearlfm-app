import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");
const H_PADDING = 24;
const HERO_WIDTH = width;
const HERO_HEIGHT = 340;

interface AdCarouselProps {
  images?: string[];
  interval?: number;
  variant?: "light" | "dark";
}

export default function AdCarousel({
  images = [
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
  ],
  interval = 5000,
  variant = "light",
}: AdCarouselProps) {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const isLight = variant === "light";
  const SECTION_BG = isLight ? COLORS.primary : COLORS.backgroundDark;

  // 🕒 Auto-scroll — safe cleanup (no TS errors)
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
    <View style={[styles.section, { backgroundColor: SECTION_BG }]}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled // ✅ ensures one image visible at a time
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
                  colors={["rgba(0,0,0,0.25)", "rgba(0,0,0,0.65)"]}
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
    paddingVertical: 24, // ✅ preserved
  },
  cardWrapper: {
    width: HERO_WIDTH,
    paddingHorizontal: H_PADDING, // ✅ preserved
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
