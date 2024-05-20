import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { Button, Text, View } from "tamagui";
import Background from "@/src/components/background";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

export default function startScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log('Username:', username);
    // console.log('Password:', password);
  };
  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Background>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to REMedy</Text>
          <Text style={styles.txt}>Your personalized sleep tracking app</Text>
          <Link href="/terms" asChild>
            <Button onPress={handleLogin} style={styles.button}>
              Get Started
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
