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
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";
import { LAYOUT } from "../../theme/layout";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function AdCarousel({ interval = 5000 }: { interval?: number }) {
  const [index, setIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(SCREEN_WIDTH);
  const [heights, setHeights] = useState<number[]>([]);
  const flatListRef = useRef<FlatList<ImageSourcePropType>>(null);
  const { accent } = useTheme();

  const images: ImageSourcePropType[] = [
    require("../../assets/hero/hero.jpg"),
    require("../../assets/hero/hero.png"),
  ];

  useEffect(() => {
    Promise.all(
      images.map(
        (src) =>
          new Promise<number>((resolve) => {
            const { uri } = Image.resolveAssetSource(src);
            Image.getSize(
              uri,
              (w, h) => resolve((h / w) * SCREEN_WIDTH),
              () => resolve(220)
            );
          })
      )
    ).then(setHeights);
  }, []);

  useEffect(() => {
    if (!containerWidth || images.length < 2) return;
    const id = setInterval(() => {
      const next = (index + 1) % images.length;
      flatListRef.current?.scrollToOffset({
        offset: next * containerWidth,
        animated: true,
      });
      setIndex(next);
    }, interval);
    return () => clearInterval(id);
  }, [index, interval, containerWidth]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!containerWidth) return;
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / containerWidth);
    setIndex(newIndex);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w !== containerWidth) setContainerWidth(w);
  };

  return (
    <Section pad={false} onLayout={handleLayout} style={styles.section}>
      {containerWidth > 0 && heights.length === images.length && (
        <View
          style={[styles.carouselWrapper, { height: heights[index] || 220 }]}
        >
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
            renderItem={({ item, index: i }) => (
              <ImageBackground
                source={item}
                style={[
                  styles.card,
                  { width: containerWidth, height: heights[i] || 220 },
                ]}
                resizeMode="cover"
              />
            )}
          />

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
    alignItems: "center",
    backgroundColor: "#000",
  },
  dots: {
    position: "absolute",
    bottom: LAYOUT.V_SPACING.sm,
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
