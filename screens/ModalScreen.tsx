import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Container from '../components/layout/Container';
import { Text } from '../components/Text';

export default function ModalScreen() {
  return (
    <Container>
      <Text>Modal</Text>
      <EditScreenInfo />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Container>
  );
}
