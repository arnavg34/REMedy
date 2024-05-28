import React, { useEffect, useState } from "react";
import { Button, Text, View } from "tamagui";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import AppLoading from "expo-app-loading";
import { useFonts, VarelaRound_400Regular } from "@expo-google-fonts/varela-round";
import Background from "../components/background";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userUsername, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setAuthenticated(true);

        // Fetch user document from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUsername(userDoc.data().username || '');
        } else {
          console.log("No such document!");
        }
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleButtonPress = () => {
    if (!authenticated) {
      console.log('User is not logged in. Navigating to login screen.');
      router.push('/login'); // Navigate to login screen if not logged in
    } else {
      console.log('User is logged in. Navigating to news screen.');
      router.push('/news'); // Navigate to "/news" if logged in
    }
  };

  let [fontsLoaded] = useFonts({
    VarelaRound_400Regular,
  });

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  } else {
    return (
      <Background>
        <View style={StyleSheet.absoluteFill}>
          {/* Stars animation */}
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to REMedy!</Text>
          <Text style={styles.txt}>Having trouble sleeping?</Text>
          {authenticated && <Text style={styles.email}>Let's track your sleep {userUsername}</Text>}
          <Button style={styles.button} onPress={handleButtonPress}>
            Let's Get Started!
          </Button>
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
  email: {
    fontSize: 18,
    marginBottom: "2%",
    fontFamily: "VarelaRound_400Regular",
    color: "white",
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    marginTop: "2%",
  },
});
