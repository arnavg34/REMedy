import React, { useEffect } from "react";
import { TamaguiProvider } from "@tamagui/core";
import { SplashScreen, Stack } from "expo-router";
import tamaguiConfig from "@/tamagui.config";

export default function Layout() {

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack screenOptions={{ headerShown: false }} />
    </TamaguiProvider>
  );
}
