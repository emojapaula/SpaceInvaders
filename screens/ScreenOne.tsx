import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import Container from '../components/layout/Container';
import { Text } from '../components/Text';
import { RootStackScreenProps } from '../navigation/root-navigator';
import Button from '../components/reusable-components/Button';

export default function ScreenOne({ navigation }: RootStackScreenProps<'ScreenOne'>) {
  return (
    <Container>
      <Text>Screen One bla</Text>
      <TouchableOpacity onPress={() => navigation.push('ScreenTwo')}>
        <Text>Go to Screen Two!</Text>
      </TouchableOpacity>
      <EditScreenInfo />
      <Button type="roundedBlue" label="Watch Tutorial" />
    </Container>
  );
}
