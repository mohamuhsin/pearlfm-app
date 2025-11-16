import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  LayoutChangeEvent,
  ImageSourcePropType,
  Dimensions,
  Platform,
} from "react-native";
import Section from "../reusable/Sections";
import { useTheme } from "../../hooks/useTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const FIXED_HEIGHT = 150;

export default function HappeningToday() {
  const [containerWidth, setContainerWidth] = useState(SCREEN_WIDTH);
  const flatListRef = useRef<FlatList<ImageSourcePropType>>(null);
  const { text } = useTheme();

  const image = require("../../assets/happening/happening.png");

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w !== containerWidth) setContainerWidth(w);
  };

  return (
    <Section pad={false} onLayout={handleLayout} style={styles.section}>
      <Text style={[styles.header, { color: text }]}>Promotions</Text>

      <View style={[styles.carouselWrapper, { height: FIXED_HEIGHT }]}>
        <FlatList
          ref={flatListRef}
          data={[image]}
          keyExtractor={(_, i) => i.toString()}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ImageBackground
              source={item}
              style={[
                styles.card,
                { width: containerWidth, height: FIXED_HEIGHT },
              ]}
              resizeMode="cover"
            />
          )}
        />
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 0,
  },

  header: {
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
    borderRadius: 10,
    backgroundColor: "#0002",

    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#00000020",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
      },
    }),
  },

  card: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
  },
});
