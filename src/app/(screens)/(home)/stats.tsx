import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, Alert } from "react-native";
import Background from "@/src/components/background";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useRouter } from "expo-router";
import { firebaseConfig } from "@/FirebaseConfig";
import Dialog from "react-native-dialog";
import DialogInput from "react-native-dialog/lib/Input";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function NewsScreen() {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(firebase.auth().currentUser);
  const [visible, setVisible] = useState(false);
  const [screenTime, setScreenTime] = useState('');
  const [exercise, setExercise] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [gapAsleepEating, setGapAsleepEating] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false); // State to disable the button
  const router = useRouter();

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    // Check if any field is empty
    if (!screenTime || !exercise || !waterIntake || !gapAsleepEating) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Validate inputs
    if (
      isNaN(Number(screenTime)) ||
      isNaN(Number(exercise)) ||
      isNaN(Number(waterIntake)) ||
      isNaN(Number(gapAsleepEating))
    ) {
      Alert.alert('Error', 'Please enter numbers in all fields.');
      return;
    }

    // Store the input values in variables or send them to a server
    const stats = {
      screenTime: Number(screenTime),
      exercise: Number(exercise),
      waterIntake: Number(waterIntake),
      gapAsleepEating: Number(gapAsleepEating),
    };

    console.log('Stats:', stats);

    // Reset input fields
    setScreenTime('');
    setExercise('');
    setWaterIntake('');
    setGapAsleepEating('');

    setVisible(false);

    // Disable the button until 4 AM next day
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, calculateTimeToEnable()); // Replace with actual function to calculate time until 4 AM
    Alert.alert('Success', 'Come Back after 4 AM to add more stats.');
  };

  const calculateTimeToEnable = () => {
    const now = new Date();
    const tomorrowFourAM = new Date(now);
    tomorrowFourAM.setDate(tomorrowFourAM.getDate() + 1);
    tomorrowFourAM.setHours(4);
    tomorrowFourAM.setMinutes(0);
    tomorrowFourAM.setSeconds(0);
    return tomorrowFourAM.getTime() - now.getTime();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Check the time every minute
    const timer = setInterval(() => {
      const now = new Date();
      // Example condition for 7:30 AM
      if (now.getHours() === 7 && now.getMinutes() === 30) {
        showDialog(); // Automatically show the dialog at 7:30 AM
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("User signed out successfully");
      router.push("/"); // Navigate to the home screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button title="Sign Out" onPress={signOut} color="white" />
          <Text style={styles.headerText}>Stats</Text>
          <Button
            title="Add Stats"
            onPress={showDialog}
            color="white"
            disabled={buttonDisabled} // Disable button based on state
          />
        </View>
        <Dialog.Container visible={visible} onBackdropPress={handleCancel}>
          <Dialog.Title>External Stats</Dialog.Title>
          <Dialog.Description>
            Please type your stats below. In the boxes, place the amount of time (in numbers) you spent on each activity.
          </Dialog.Description>
          <Text style={styles.text}>      Screen Time:</Text>
          <DialogInput
            value={screenTime}
            onChangeText={setScreenTime}
            keyboardType="numeric"
          />
          <Text style={styles.text}>      Exercise:</Text>
          <DialogInput
            value={exercise}
            onChangeText={setExercise}
            keyboardType="numeric"
          />
          <Text style={styles.text}>      Water Intake:</Text>
          <DialogInput
            value={waterIntake}
            onChangeText={setWaterIntake}
            keyboardType="numeric"
          />
          <Text style={styles.text}>      Gap between Asleep and Eating:</Text>
          <DialogInput
            value={gapAsleepEating}
            onChangeText={setGapAsleepEating}
            keyboardType="numeric"
          />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Submit" onPress={handleSubmit} />
        </Dialog.Container>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    marginBottom: 5,
  },
});
