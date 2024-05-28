import React, { useEffect, useState } from "react";
import { Button, View, Text } from "tamagui";
import Background from "@/src/components/background";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { router } from "expo-router";
import { firebaseConfig } from "@/FirebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function NewsScreen() {
  const [currentUser, setCurrentUser] = useState<firebase.User>(firebase.auth().currentUser || {} as firebase.User);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("User signed out successfully");
      router.push("/"); // Navigate to the home screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Background>
      <View>
        {/* Your content */}
        <>
        
          <Text fontSize={30}>Email: {currentUser.email}</Text>
          <Text fontSize={30}>User ID: {currentUser.uid}</Text>
        </>
        <Button onPress={signOut}>Sign Out</Button>
      </View>
    </Background>
  );
}
