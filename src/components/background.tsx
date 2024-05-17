import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'tamagui/linear-gradient';

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: FunctionComponent<BackgroundProps> = ({ children }) => {
  return (
    <LinearGradient colors={['#2948FF', '#6B439E']} style={styles.gradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default Background;
