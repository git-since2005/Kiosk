import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VoteConfirmationScreen({ route, navigation }) {
  const { candidate, user, party, svgColor } = route.params;

  const handleConfirm = async () => {
    try {
      // Retrieve voterId from AsyncStorage

      // Submit vote to backend
      const response = await fetch("http://192.168.109.149:5000/add-candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voterID: user, candidate, party, svgColor }),
      });

      const result = await response.json();
      if (result.success) {
        Alert.alert('Vote Submitted!', `You voted for ${candidate} (${party})`, [
          { text: 'Go to QR Scan', onPress: () => navigation.popToTop() },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Failed to submit vote');
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
      Alert.alert('Error', 'An unexpected error occurred while submitting your vote.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Vote</Text>

      <Svg height="100" width="100" style={{ marginBottom: 20 }}>
        <Circle cx="50" cy="50" r="40" fill={svgColor} />
      </Svg>

      <Text style={styles.candidate}>Candidate: {candidate}</Text>
      <Text style={styles.party}>Party: {party}</Text>

      <Button title="Submit Vote" style={{borderRadius: 10}} onPress={handleConfirm} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  candidate: { fontSize: 18, marginBottom: 5 },
  party: { fontSize: 16, marginBottom: 20, color: 'gray' },
});
