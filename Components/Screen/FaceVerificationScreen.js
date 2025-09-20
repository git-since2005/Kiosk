import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FaceVerificationScreen({ navigation, route }) {
    const { qrData } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const ws = new WebSocket("ws://192.168.109.149:8765"); // Mac IP

    // ws.onopen = () => {
    //   console.log("WebSocket connected");

    //   // Tell Mac server to open a file
    //   ws.send(
    //     JSON.stringify({
    //       action: "open_file",
    //       file_path: "/Users/yourusername/Documents/test.pdf", // change this to the file you want
    //     })
    //   );
    // };

    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   console.log("Server response:", data);
    //   if (data.status === "opened") {
    //     console.log(`File opened: ${data.file}`);
    //   }
    // };

    // ws.onerror = (error) => {
    //   console.error("WebSocket error:", error.message);
    // };

    // ws.onclose = () => {
    //   console.log("WebSocket closed");
    // };

    // return () => ws.close();
    navigation.navigate("CandidateList", { user: qrData });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Face Verification Screen</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}
