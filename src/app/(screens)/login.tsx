import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { Input, Button, Text, View, AlertDialog, XStack, YStack} from "tamagui";
import { LogIn } from "@tamagui/lucide-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import Background from "@/src/components/background";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { Toast, useToastController, useToastState } from '@tamagui/toast'

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const fadeAnim = useState(new Animated.Value(0))[0];
  const db = getFirestore();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      // Query Firestore for the document where the username field is equal to the provided username
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
  
      let email: string | null = null;
  
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        email = doc.data().email;
      });
  
      if (email) {
        try {
          const response = await signInWithEmailAndPassword(auth, email, password);
          console.log(response);
          // If sign-in is successful, set isSignedIn to true
          setIsSignedIn(true);
        } catch (signInError: any) {
          console.error(signInError);
          alert("Sign in failed: " + signInError.message);
          setIsSignedIn(false);
          setDialogVisible(true);
        }
      } else {
        alert("No user found with this username");
        setIsSignedIn(false);
        setDialogVisible(true);
      }
    } catch (error: any) {
      console.error(error);
      alert("An error occurred: " + error.message);
      setIsSignedIn(false);
    }
  };
  
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
          <Text style={styles.header}>Log In to Your REMedy Account</Text>
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
          {isSignedIn ? (
            <Link href="/news">
              <Button
                iconAfter={LogIn}
                onPress={signIn}
                style={styles.button}
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>
            </Link>
          ) : (
            <Button
              iconAfter={LogIn}
              onPress={signIn}
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          )}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <Link href="/signup" asChild>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Link>
          </View>
          <Link href="/forgot-password" asChild>
            <Text style={styles.forgotPasswordLink}>Forgot your password?</Text>
          </Link>
          
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
