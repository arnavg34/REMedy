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
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const auth = FIREBASE_AUTH;
  const db = getFirestore();

  const signIn = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      let email = '';

      querySnapshot.forEach((doc) => {
        email = doc.data().email;
      });
  
      if (email) {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
      } else {
        alert("No user found with this username");
      }
    } catch (error: any) {
      console.error(error);
      alert("Sign in failed: " + error.message);
    }
    setLoading(false);
  };
  const handleLogin = () => {
    // Perform login actions here
    setLoading(true);
    // Simulating login delay
    setTimeout(() => {
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

  const handleNavigation = () => {
    if (loginSuccess) {
      router.push('/news');
    }
  };

  useEffect(handleNavigation, [loginSuccess]);

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
          <Link href="/news" asChild>
            <Button
              iconAfter={LogIn}
              onPress={signIn}
              style={styles.button}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </Button>
          </Link>
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
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'VarelaRound_400Regular',
    color: 'white',
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'VarelaRound_400Regular',
    color: 'white',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: 'white',
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 25,
    fontFamily: 'VarelaRound_400Regular',
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 50,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: 'white',
    marginRight: 5,
    fontFamily: 'VarelaRound_400Regular',
  },
  signupLink: {
    color: 'lightblue',
    fontFamily: 'VarelaRound_400Regular',
  },
  forgotPasswordLink: {
    marginTop: 10,
    color: 'lightblue',
    fontFamily: 'VarelaRound_400Regular',
  },
});
