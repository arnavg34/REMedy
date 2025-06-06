import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { H4, H5, H6, YStack, XStack, Checkbox, Button } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import Background from "@/src/components/background";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, VarelaRound_400Regular } from "@expo-google-fonts/varela-round";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { Link } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function TermsScreen() {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  const handleCheck1Change = useCallback(() => {
    setIsChecked1((prev) => !prev);
  }, []);

  const handleCheck2Change = useCallback(() => {
    setIsChecked2((prev) => !prev);
  }, []);

  if (!appIsReady) {
    return null; // Return null while the app is not ready
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <YStack
            width={300}
            space="$2"
            padding="$3"
            borderRadius="$4"
            style={{ fontFamily: "VarelaRound_400Regular" }}
          >
            <H4 color="white" style={{ fontFamily: "VarelaRound_400Regular" }}>
              We classify our users' data as health data.
            </H4>
            <H6 color="lightgrey" style={{ fontFamily: "VarelaRound_400Regular" }}>
              Your privacy is important to us. That's why we want to make sure
              that your use of REMedy happens in a safe way.
            </H6>
            <H6 color="lightgrey" style={{ fontFamily: "VarelaRound_400Regular" }}>
              For more information on how we use your data and your rights,
              read our Privacy Policy and Terms of use.
            </H6>

            <XStack alignItems="center" space="$2">
              <Checkbox
                size="$4"
                checked={isChecked1}
                onCheckedChange={handleCheck1Change}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderColor: "#ADD8E6",
                  borderWidth: 2,
                  backgroundColor: isChecked1 ? "#ADD8E6" : "white",
                }}
              >
                <Checkbox.Indicator
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isChecked1 && <Check color="black" />}
                </Checkbox.Indicator>
              </Checkbox>
              <H5 color="white" style={{ fontFamily: "VarelaRound_400Regular" }}>
                Yes, you have my permission to store my health data on
                REMedy's secure servers.
              </H5>
            </XStack>

            <XStack alignItems="center" gap="$2">
              <Checkbox
                size="$4"
                checked={isChecked2}
                onCheckedChange={handleCheck2Change}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderColor: "#ADD8E6",
                  borderWidth: 2,
                  backgroundColor: isChecked2 ? "#ADD8E6" : "white",
                }}
              >
                <Checkbox.Indicator
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isChecked2 && <Check color="black" />}
                </Checkbox.Indicator>
              </Checkbox>
              <H5 color="white" style={{ fontFamily: "VarelaRound_400Regular" }}>
                Yes, REMedy may process my health data to improve the app's
                functionality.
              </H5>
            </XStack>
            {isChecked1 && isChecked2 && (
              <Animated.View entering={SlideInLeft}>
                <Link href="/news" asChild>
                  <Button
                    size="$6"
                    backgroundColor="lightblue"
                    width={250} // Adjust width as needed
                    style={{ marginTop: 20 }} // Add margin top to create space for the button
                  >
                    Continue
                  </Button>
                </Link>
              </Animated.View>
            )}
          </YStack>
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: 300, // Limiting the maximum width for better readability
    justifyContent: "center",
    alignItems: "center",
    padding: 24, // Adjust padding as needed
  },
});
