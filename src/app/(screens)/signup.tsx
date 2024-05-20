import { Link } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { Input, Button, Text, View } from "tamagui";
import { LogIn } from "@tamagui/lucide-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import Background from "@/src/components/background";

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleLogin = () => {
    // Perform login actions here
    setLoading(true);
    // Simulating login delay
    setTimeout(() => {
      setLoading(false);
      // Redirect to home page after login
      // navigation.navigate('Home');
    }, 2000);
  };

  // Fade in animation
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    easing: Easing.linear,
    useNativeDriver: true,
  }).start();

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Background>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Text style={styles.header}>Sign up for REMedy Account</Text>
          <Text style={styles.label}>Username</Text>
          <Input
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Enter your username"
          />
          <Text style={styles.label}>Password</Text>
          <Input
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <Button
            iconAfter={LogIn}
            onPress={handleLogin}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Signing Up....." : "Sign Up"}
          </Button>
        </Animated.View>
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
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "VarelaRound_400Regular",
    color: "white",
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "VarelaRound_400Regular",
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    color: "white",
    marginRight: 5,
    fontFamily: "VarelaRound_400Regular",
  },
  signupLink: {
    color: "lightblue",
    fontFamily: "VarelaRound_400Regular",
  },
  forgotPasswordLink: {
    marginTop: 10,
    color: "lightblue",
    fontFamily: "VarelaRound_400Regular",
  },
});
