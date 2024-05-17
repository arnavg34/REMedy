import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Button, Text, View } from "tamagui";
import { LogIn } from "@tamagui/lucide-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
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
      <View style={styles.container}>
        <Text style={styles.header}>
          Create a Username and Password for your REMedy account
        </Text>
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
        <Link href="/terms" asChild>
          <Button iconAfter={LogIn} onPress={handleLogin} style={styles.button}>
            Log In
          </Button>
        </Link>
      </View>
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
    marginBottom: "5%",
    fontFamily: "VarelaRound_400Regular",
  },
  label: {
    fontSize: 18,
    marginTop: "2%",
    fontFamily: "VarelaRound_400Regular",
  },
  input: {
    width: "30%",
    height: "5%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: "2%",
    marginTop: "2%",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    marginTop: "2%",
  },
});
