import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#333333",
        },
      }}
    >
      <Tabs.Screen
        name="news"
        options={{
          title: "News and Tips",
          tabBarIcon: () => (
            <FontAwesome name="newspaper-o" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Sleep Stats",
          tabBarIcon: () => (
            <Ionicons name="stats-chart" size={24} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "Chatbot",
          tabBarIcon: () => <Entypo name="chat" size={24} color="white" />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Friends and Leaderboard",
          tabBarIcon: () => (
            <FontAwesome5 name="user-friends" size={24} color="white" />
          ),
        }}
      />
    </Tabs>
  );
}
