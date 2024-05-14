import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        This app uses health data to provide accurate sleep statistics. We value
        your privacy and all data that we collect is stored securely
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
