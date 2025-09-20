import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRScannerScreen from './Components/Screen/QRScannerScreen';
import FaceVerificationScreen from './Components/Screen/FaceVerificationScreen';
import CandidateListScreen from './Components/Screen/CandidateListScreen';
import VoteConfirmationScreen from './Components/Screen/VoteConfirmationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QRScanner">
        <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FaceVerification" component={FaceVerificationScreen} />
        <Stack.Screen name="CandidateList" component={CandidateListScreen} />
        <Stack.Screen name="VoteConfirmation" component={VoteConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
