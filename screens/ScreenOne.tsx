import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import Container from '../components/layout/Container';
import { Text } from '../components/reusable-components/Text';
import { RootStackScreenProps } from '../navigation/root-navigator';
import Button from '../components/reusable-components/Button';

export default function ScreenOne({ navigation }: RootStackScreenProps<'ScreenOne'>) {
  return (
    <Container>
      <Text>Screen One bla</Text>
      <TouchableOpacity onPress={() => navigation.push('GameScreen')}>
        <Text>Go to Game Screen</Text>
      </TouchableOpacity>
      <Button onPress={() => navigation.push('GameScreen')} type="secondary" label="Go Game Screen" />
      <Text>Go to Login!</Text>

      <Button onPress={() => navigation.push('CodeScreen')} type="secondary" label="Go to login" />
    </Container>
  );
}
