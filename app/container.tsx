import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native'; // Import StyleSheet from react-native
import LinearGradient from 'react-native-linear-gradient';

interface ContainerProps {
    children: ReactNode;
  }
  
const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <LinearGradient colors={['#2948FF', '#6B439E']} style={styles.gradient}>
            <SafeAreaView style={styles.container}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1
    },
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
});

export default Container;
