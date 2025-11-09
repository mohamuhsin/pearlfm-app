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
import Section from "../reusable/Sections";
import { useAppTheme } from "../../hooks/useAppTheme";
import { LAYOUT } from "../../theme/layout";

const { width } = Dimensions.get("window");
const HERO_WIDTH = width;
const HERO_HEIGHT = 150;

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
  const { text, accent } = useAppTheme(variant);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        flatListRef.current?.scrollToOffset({
          offset: next * HERO_WIDTH,
          animated: true,
        });
        return next;
      });
    }, interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [interval, images.length]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / HERO_WIDTH);
    setIndex(newIndex);
  };

  return (
    <Section variant={variant} pad={false}>
      <Text style={[styles.title, { color: text }]}>Happening Today</Text>

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

      <View style={styles.dots}>
        {images.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              flatListRef.current?.scrollToOffset({
                offset: i * HERO_WIDTH,
                animated: true,
              })
            }
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
  title: {
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 0.3,
    lineHeight: 24,
    paddingHorizontal: LAYOUT.H_PADDING,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  cardWrapper: {
    width: HERO_WIDTH,
    paddingHorizontal: LAYOUT.H_PADDING,
  },
  card: {
    width: "100%",
    height: HERO_HEIGHT,
    overflow: "hidden",
    borderRadius: LAYOUT.RADIUS.card,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#EDEDED",
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
