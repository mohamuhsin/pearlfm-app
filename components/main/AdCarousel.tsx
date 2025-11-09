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
import Section from "../reusable/Sections";
import { useAppTheme } from "../../hooks/useAppTheme";
import { LAYOUT } from "../../theme/layout";

const { width } = Dimensions.get("window");
const HERO_WIDTH = width;
const HERO_HEIGHT = 240;

interface AdCarouselProps {
  images?: string[];
  interval?: number;
  variant?: "light" | "dark";
}

export default function AdCarousel({
  images = [
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
    "https://i.pinimg.com/736x/6f/7d/19/6f7d19afe09324279d2c9118b8962d53.jpg",
    "https://i.pinimg.com/736x/30/e9/7b/30e97b7958e741b718179d6ba62b6608.jpg",
  ],
  interval = 5000,
  variant = "light",
}: AdCarouselProps) {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const { accent } = useAppTheme(variant);

  useEffect(() => {
    timer.current = setInterval(() => {
      const next = (index + 1) % images.length;
      scrollToIndex(next);
    }, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [index, interval, images.length]);

  const scrollToIndex = (i: number) => {
    flatListRef.current?.scrollToOffset({
      offset: i * HERO_WIDTH,
      animated: true,
    });
    setIndex(i);
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / HERO_WIDTH);
    setIndex(newIndex);
  };

  return (
    <Section variant={variant} pad={false}>
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
                  colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.55)"]}
                  style={styles.gradient}
                />
              </ImageBackground>
            </View>
          </View>
        )}
      />

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
                  backgroundColor: accent,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: HERO_WIDTH,
    paddingHorizontal: LAYOUT.H_PADDING,
  },
  card: {
    width: "100%",
    height: HERO_HEIGHT,
    overflow: "hidden",
    borderRadius: LAYOUT.RADIUS.image,
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
    bottom: LAYOUT.V_SPACING.sm,
    width: "100%",
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
