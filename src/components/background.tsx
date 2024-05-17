import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BackgroundProps {
  children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <LinearGradient colors={['#2948FF', '#6B439E']} style={styles.gradient}>
      <View style={styles.container}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  } as ViewStyle,
  container: {
    flex: 1,
  } as ViewStyle,
});

export default Background;
