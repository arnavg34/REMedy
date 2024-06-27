import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, Text } from "tamagui";
import { LogIn } from "@tamagui/lucide-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import Background from "@/src/components/background";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const auth = FIREBASE_AUTH;
  const db = getFirestore();
  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) {
      router.push("/news");
    }
  }, [loginSuccess]);

  const signIn = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);

      let email = "";

      querySnapshot.forEach((doc) => {
        email = doc.data().email;
      });

      if (!email) {
        setLoading(false);
        return alert("No user found with this username");
      }

      await signInWithEmailAndPassword(auth, email, password);
      setLoginSuccess(true);
      await AsyncStorage.setItem("userToken", "user_token_here");
    } catch (error) {
      console.error("Sign in failed:", error);
      alert("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
            <Text style={styles.header}>Log In to Your REMedy Account</Text>
            <Text style={styles.label}>Username</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="person-outline"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Enter your username"
                placeholderTextColor="gray"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="oneTimeCode"
                returnKeyType="next"
              />
            </View>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inputWrapper,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={!passwordVisible}
                placeholder="Enter your password"
                placeholderTextColor="gray"
                textContentType="oneTimeCode"
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{ paddingHorizontal: 10 }}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            <Button
              iconAfter={LogIn}
              onPress={signIn}
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Link href="/signup" asChild>
                <Text style={styles.signupLink}>Sign Up</Text>
              </Link>
            </View>
            <Link href="/forgot-password" asChild>
              <Text style={styles.forgotPasswordLink}>
                Forgot your password?
              </Text>
            </Link>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "white",
    paddingLeft: 10,
  },
  input: {
    height: 40,
    borderRadius: 25,
    fontFamily: "VarelaRound_400Regular",
    color: "black",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
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
