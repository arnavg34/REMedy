import React from "react";
import { TamaguiProvider, createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";
import { Stack } from "expo-router";
import TermsScreen from "./(screens)/terms";
import LoginScreen from "./(screens)/login";
import SignUpScreen from "./(screens)/signup";
import Background from '../components/background';
import Index from '.';
import tamaguiConfig from "@/tamagui.config";

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack screenOptions={{ headerShown: false }}>
        <TermsScreen />
        <LoginScreen />
        <SignUpScreen />
        <Index />
        <Stack.Screen name="(screens)/home" />
      </Stack>
    </TamaguiProvider>
  );
}
