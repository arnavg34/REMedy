import { Link } from "expo-router";
import React from "react";
import { Button, Text, View } from "tamagui";
import { StyleSheet, Dimensions } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useFrameCallback,
} from 'react-native-reanimated';
import Background from "../components/background";

const { width, height } = Dimensions.get("window");
const STAR_COUNT = 100;

const generateStars = (count: number) => {
  const stars: { size: number; top: number; left: number; key: string; delay: number }[] = [];
  const maxSize = Math.max(width, height); // Get the maximum dimension of the screen
  for (let i = 0; i < count; i++) {
    const size: number = Math.random() * 2 + 1;
    stars.push({
      key: i.toString(),
      size,
      top: Math.random() * height,
      left: Math.random() * width,
      delay: Math.random() * 5000,
    });
  }
  return stars;
};

const Star = ({ size, top, left }: { size: number; top: number; left: number })=> {
  const position = useSharedValue(left);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  React.useEffect(() => {
    const loopAnimation = () => {
      position.value = withTiming(
        -size,
        {
          duration: 10000 + Math.random() * 5000,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            position.value = width + size;
            loopAnimation();
          }
        }
      );
    };

    loopAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          backgroundColor: "white",
          borderRadius: size / 2,
          top: top,
        },
        animatedStyle,
      ]}
    />
  );
};

const stars = generateStars(STAR_COUNT);

export default function Index() {
  const t = useSharedValue<number>(0);

  useFrameCallback((frameInfo) => {
    t.value = frameInfo.timeSinceFirstFrame / 350;
  });


  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Background>
        <View style={StyleSheet.absoluteFill}>
          {stars.map((star) => (
            <Star key={star.key} size={star.size} top={star.top} left={star.left} />
          ))}
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to REMedy!</Text>
          <Text style={styles.txt}>Having trouble sleeping?</Text>
          <Link href="/terms" asChild>
            <Button style={styles.button}>
              Let's Get Started!
            </Button>
          </Link>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    marginBottom: "5%",
    fontFamily: "VarelaRound_400Regular",
    color: "white",
  },
  txt: {
    fontSize: 24,
    marginBottom: "5%",
    fontFamily: "VarelaRound_400Regular",
    color: "white",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    marginTop: "2%",
  },
});
