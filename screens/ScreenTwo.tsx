import * as React from 'react';
import { Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Container from '../components/layout/Container';
import { Text } from '../components/Text';
import { RootStackScreenProps } from '../navigation/root-navigator';

export default function ScreenTwo({ navigation }: RootStackScreenProps<'ScreenTwo'>) {
  return (
    <Container>
      <Text>Screen Two</Text>
      <Button title="Go to screen one" onPress={() => navigation.push('ScreenOne')} />
      <Button title="Open modal" onPress={() => navigation.push('Modal')} />
      <EditScreenInfo />
    </Container>
  );
}
