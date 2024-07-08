import React, { useEffect } from "react";
import { TamaguiProvider } from "@tamagui/core";
import { SplashScreen, Stack } from "expo-router";
import tamaguiConfig from "@/tamagui.config";
import NotificationComponent from "../components/pushNotification";

export default function Layout() {

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack screenOptions={{ headerShown: false }} />
      <NotificationComponent />
    </TamaguiProvider>
  );
}
