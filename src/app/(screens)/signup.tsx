import { Link, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { StyleSheet, Animated, Easing, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Input, Button, Text, View } from "tamagui";
import { LogIn } from "@tamagui/lucide-icons";
import {
  useFonts,
  VarelaRound_400Regular,
} from "@expo-google-fonts/varela-round";
import Background from "@/src/components/background";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const auth = FIREBASE_AUTH;
  const db = getFirestore();
  const router = useRouter(); // Use the useRouter hook for navigation

  useEffect(() => {
    if (signUpSuccess) {
      router.push('/terms'); // Navigate to the terms page after successful signup
    }
  }, [signUpSuccess]);

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        username: username,
      });

      console.log("User created with ID: ", user.uid);
      await AsyncStorage.setItem('userToken', 'user_token_here');
      setSignUpSuccess(true); // Set signUpSuccess to true to trigger the redirect
    } catch (error) {
      console.error("Error creating user: ", error);
    }
    setLoading(false);
  };

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
    return null;
  } else {
    return (
      <Background>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <Link href={'/login'} style={styles.backArrowContainer}>
                <Ionicons name="arrow-back-circle-outline" size={50} color="white" />
              </Link>
              <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
                <Text style={styles.header}>Sign up for REMedy Account</Text>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
                  <View style={styles.inputContainer}>
                    <Input
                      style={styles.input}
                      onChangeText={setEmail}
                      value={email}
                      placeholder="Enter your Email"
                      textContentType='oneTimeCode'
                    />
                  </View>
                </View>
                <Text style={styles.label}>Username</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={24} color="gray" style={styles.icon} />
                  <View style={styles.inputContainer}>
                    <Input
                      style={styles.input}
                      onChangeText={setUsername}
                      value={username}
                      placeholder="Enter your username"
                      textContentType='oneTimeCode'
                    />
                  </View>
                </View>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
                  <View style={styles.inputContainer}>
                    <Input
                      style={styles.input}
                      onChangeText={setPassword}
                      value={password}
                      secureTextEntry={true}
                      placeholder="Enter your password"
                      textContentType='oneTimeCode'
                    />
                  </View>
                </View>
                <Button
                  iconAfter={LogIn}
                  onPress={signUp}
                  style={styles.button}
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "80%",
  },
  inputContainer: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "white",
    marginLeft: 10,
    height: 40,
    justifyContent: 'center', // Center the Input vertically
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    borderRadius: 25,
    fontFamily: "VarelaRound_400Regular",
    color: "black",
  },
  icon: {
    marginLeft: 5,
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
  backArrowContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
});
