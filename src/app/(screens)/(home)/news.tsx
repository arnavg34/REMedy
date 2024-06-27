import Background from "@/src/components/background";
import { View, YStack, XStack, Text, Image } from "tamagui";
import {
  Dimensions,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import React, { useRef, useEffect, useState } from "react";
import { services } from "@/src/components/services";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function NewsScreen() {
  const windowWidth = Dimensions.get("window").width;
  const carouselWidth = windowWidth * 0.9;
  const tipsRef = useRef(null);
  const newsRef = useRef(null);

  const tips = [
    {
      text: "Make sure to maintain a consistent sleep schedule to reinforce your body's sleep-wake cycle",
    },
    {
      text: "Create a relaxing bedtime routine with activites such as reading a book or a warm bath",
    },
    {
      text: "Optimize your sleep environment by sleeping in a cool, dark, and quiet place",
    },
    {
      text: "Limit exposure to blue light from screens at least an hour before bed",
    },
    {
      text: "Avoid large meals and beverages late at night as this can affect quality of sleep",
    },
    {
      text: "Engage in regular physical activity throughout the day but avoid exercise close to bedtime",
    },
    {
      text: "Manage stress by practicing relaxation techniques such as deep breathing or meditation",
    },
    {
      text: "Avoid napping late in the afternoon and keep naps between 20 and 30 minutes",
    },
    {
      text: "Ensure your mattress and pillows provide proper comfort and support",
    },
  ];

  interface News {
    title: string;
    content: string;
    urlToImage: string;
    url: string;
  }

  const [newsData, setNewsData] = useState<News[]>([]);
  const [newsCarousel, setNewsCarousel] = useState<News[]>([]);
  useEffect(() => {
    services("sleep")
      .then((data) => {
        setNewsData(data);
        if (data.length >= 7) {
          setNewsCarousel(data.slice(2, 7));
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });
  useEffect(() => {
    SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Background>
      <YStack style={styles.container} space={20}>
        <XStack style={styles.row} space={2}>
          <View style={styles.news}>
            {newsData[0] && (
              <YStack>
                <Image
                  source={{ uri: newsData[0].urlToImage }}
                  style={{
                    width: "100%",
                    height: "50%",
                    borderRadius: 10,
                    borderColor: "white",
                    borderWidth: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL(newsData[0].url)}
                >
                  <Text style={styles.news_title}>{newsData[0].title}</Text>
                </TouchableOpacity>
              </YStack>
            )}
          </View>
          <View style={styles.news}>
            {newsData[1] && (
              <YStack>
                <Image
                  source={{ uri: newsData[1].urlToImage }}
                  style={{
                    width: "100%",
                    height: "50%",
                    borderRadius: 10,
                    borderColor: "white",
                    borderWidth: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => Linking.openURL(newsData[1].url)}
                >
                  <Text style={styles.news_title}>{newsData[1].title}</Text>
                </TouchableOpacity>
              </YStack>
            )}
          </View>
        </XStack>
        <View style={styles.news_large}>
          <Carousel
            loop
            enabled
            ref={newsRef}
            data={newsCarousel}
            width={carouselWidth}
            autoPlay={true}
            autoPlayInterval={5000}
            renderItem={({ item }) => (
              <XStack>
                <Image
                  source={{ uri: item.urlToImage }}
                  style={{
                    width: "50%",
                    height: "90%",
                    borderRadius: 10,
                    borderColor: "white",
                    borderWidth: 1,
                  }}
                />
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.news_title_large}>
                    {item.title.slice(0, 70)}...
                  </Text>
                </TouchableOpacity>
              </XStack>
            )}
          />
        </View>
        <View style={styles.tips}>
          <Carousel
            loop
            enabled
            ref={tipsRef}
            data={tips}
            width={carouselWidth}
            autoPlay={true}
            autoPlayInterval={7000}
            renderItem={({ item }) => (
              <View style={styles.tips_container}>
                <Text style={styles.tips_text}>{item.text}</Text>
              </View>
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
    backgroundColor: "#bcbbfc",
    width: "40%",
    height: "100%",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  news_large: {
    backgroundColor: "#bcbbfc",
    width: "90%",
    height: "20%",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
  tips: {
    width: "90%",
    height: "20%",
    backgroundColor: "#bcbbfc",
    borderRadius: 10,
    padding: 10,
  },
  tips_container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  tips_text: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "VarelaRound_400Regular",
  },
  news_title: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "VarelaRound_400Regular",
  },
  news_title_large: {
    fontSize: 16,
    textAlign: "left",
    fontFamily: "VarelaRound_400Regular",
    width: "30%",
    height: "100%",
    padding: 10,
  },
});
