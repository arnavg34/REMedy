import React, { ReactNode } from 'react';
import { TamaguiProvider, createTamagui } from '@tamagui/core';
import { config } from '@tamagui/config/v3';
import { Stack } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';
import { View, ViewStyle, StyleSheet } from 'react-native';

// Create Tamagui config
const tamaguiConfig = createTamagui(config);
type Conf = typeof tamaguiConfig;

// Extend TamaguiCustomConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

const Background: React.FC<{ children: ReactNode }> = ({ children }) => {
  const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    } as ViewStyle,
    container: {
      flex: 1,
    } as ViewStyle,
  });

  return (
    <LinearGradient colors={['#2948FF', '#6B439E']} style={styles.gradient}>
      <View style={styles.container}>{children}</View>
    </LinearGradient>
  );
};

export default () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Background>
        <Stack>
          <Stack.Screen name='app' options={{ headerShown: true }} />
        </Stack>
      </Background>
    </TamaguiProvider>
  );
};
