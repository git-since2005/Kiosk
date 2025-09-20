import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function VoteConfirmationScreen({ route, navigation }) {
  const { candidate, user, party, svgColor } = route.params;

  const handleConfirm = () => {
    Alert.alert('Vote Submitted!', `You voted for ${candidate} (${party})`, [
      { text: 'Go to QR Scan', onPress: () => navigation.popToTop() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Your Vote</Text>

      <Svg height="100" width="100" style={{ marginBottom: 20 }}>
        <Circle cx="50" cy="50" r="40" fill={svgColor} />
      </Svg>

      <Text style={styles.candidate}>Candidate: {candidate}</Text>
      <Text style={styles.party}>Party: {party}</Text>

      <Button title="Submit Vote" onPress={handleConfirm} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  candidate: { fontSize: 18, marginBottom: 5 },
  party: { fontSize: 16, marginBottom: 20, color: 'gray' },
});
