import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Sample parties
const parties = ['Democratic Party', 'Republican Party', 'Green Party', 'Independent'];

// Function to generate a random color
const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

const candidates = [
  { id: '1', name: 'Candidate A' },
  { id: '2', name: 'Candidate B' },
  { id: '3', name: 'Candidate C' },
];

export default function CandidateListScreen({ navigation, route }) {
  const { user } = route.params;
  const [selected, setSelected] = useState(null);

  const handleVote = (candidate) => {
    const party = parties[Math.floor(Math.random() * parties.length)];
    const svgColor = getRandomColor();

    navigation.navigate('VoteConfirmation', {
      candidate: candidate.name,
      user,
      party,
      svgColor
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Candidate:</Text>
      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selected === item.id && { borderColor: 'green', borderWidth: 2 },
            ]}
            onPress={() => {
              setSelected(item.id);
              handleVote(item);
            }}
          >
            <Svg height="50" width="50" style={{ marginRight: 10 }}>
              <Circle cx="25" cy="25" r="20" fill={getRandomColor()} />
            </Svg>
            <View>
              <Text style={styles.candidateName}>{item.name}</Text>
              <Text style={styles.partyName}>
                {parties[Math.floor(Math.random() * parties.length)]}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, marginBottom: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  candidateName: { fontSize: 16, fontWeight: 'bold' },
  partyName: { fontSize: 14, color: 'gray' },
});
