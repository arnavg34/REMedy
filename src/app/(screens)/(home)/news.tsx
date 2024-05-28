import Background from "@/src/components/background";
import { View, YStack, XStack, Text } from "tamagui";
import { Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import React, { useRef } from "react";

export default function NewsScreen() {
  const windowWidth = Dimensions.get("window").width;
  const carouselWidth = windowWidth * 0.9;
  const ref = useRef(null);

  const data = [
    { backgroundColor: "tomato", width: carouselWidth },
    { backgroundColor: "thistle", width: carouselWidth },
    { backgroundColor: "skyblue", width: carouselWidth },
    { backgroundColor: "teal", width: carouselWidth },
  ];

  return (
    <Background>
      <YStack style={styles.container} space={20}>
        <XStack style={styles.row} space={2}>
          <View style={styles.news}></View>
          <View style={styles.news}></View>
        </XStack>
        <View style={styles.news_large}></View>
        <View style={styles.tips}>
          <Carousel
            loop
            enabled
            ref={ref}
            data={data}
            width={carouselWidth}
            autoPlay={true}
            autoPlayInterval={3000}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: item.backgroundColor,
                  width: item.width,
                  height: "100%",
                  borderRadius: 10,
                }}
              />
            )}
          />
        </View>
      </YStack>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: "40%",
  },
  news: {
    backgroundColor: "red",
    width: "40%",
    height: "100%",
    borderRadius: 10,
  },
  news_large: {
    backgroundColor: "red",
    width: "90%",
    height: "20%",
    borderRadius: 10,
  },
  tips: {
    width: "90%",
    height: "20%",
  },
});
