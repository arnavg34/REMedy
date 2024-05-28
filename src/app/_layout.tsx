import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, } from "firebase/auth";
import { TamaguiProvider } from "@tamagui/core";
import { SplashScreen, Stack } from "expo-router";
import TermsScreen from "./(screens)/terms";
import LoginScreen from "./(screens)/login";
import SignUpScreen from "./(screens)/signup";
import Background from "../components/background";
import Index from ".";
import tamaguiConfig from "@/tamagui.config";
import AppLoading from "expo-app-loading";
import { firebaseConfig } from "@/FirebaseConfig";
import { useEffect, useState } from "react";
import firebase from "firebase/compat";




export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 900);
    }
    
    hideSplashScreen();
  }, []);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack screenOptions={{ headerShown: false }}>
        <TermsScreen />
        <LoginScreen />
        <SignUpScreen />
        <Index />
        <Stack.Screen name="(screens)/(home)" />
      </Stack>
    </TamaguiProvider>
  );
}
