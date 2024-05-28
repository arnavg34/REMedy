import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StarFull } from '@tamagui/lucide-icons';

const StarBackground = () => {
  const stars = Array.from({ length: 50 }).map((_, index) => {
    const size = Math.floor(Math.random() * 10 + 10); // Randomize star size between 10 and 20
    const left = Math.random() * 100; // Randomize horizontal position
    const top = Math.random() * 100; // Randomize vertical position

    return (
      <StarFull
        key={index}
        style={[
          styles.star,
          { width: size, height: size, left: `${left}%`, top: `${top}%` },
        ]}
      />
    );
  });

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    opacity: 0.4, 
    color: "white"
  },
});

export default StarBackground;
