import React from 'react';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import { Stack } from 'expo-router';
import TermsScreen from './screens/terms';
import LoginScreen from './screens/login';
import SignUpScreen from './screens/signup';
import Background from '../components/background';
import Index from '.';


// Create Tamagui config
const tamaguiConfig = createTamagui(config);
type Conf = typeof tamaguiConfig;

// Extend TamaguiCustomConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
        <Stack>
          <TermsScreen />
          <LoginScreen/>
          <SignUpScreen />
          <Index />
        </Stack>
    </TamaguiProvider>
  );
}
