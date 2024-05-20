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
import Background from "@/src/components/background";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, username, password);
      console.log(response);
    } catch (error: any) {
      console.error(error);
      alert("Registration failed: " + error.message);
    }
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
          <Button iconAfter={LogIn} onPress={signIn} style={styles.button}>
            Log In
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
