import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import Container from '../../components/layout/Container';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { Text } from '../../components/reusable-components/Text';
import Button from '../../components/reusable-components/Button';

export default function ImageScreen({ navigation }: RootStackScreenProps<'ImageScreen'>) {
  return (
    <Container>
      <Text>Screen One bla</Text>
      <TouchableOpacity onPress={() => navigation.push('ScreenTwo')}>
        <Text>Go to Screen Two!</Text>
      </TouchableOpacity>
      <Button onPress={() => navigation.push('NameScreen')} type="secondary" label="Go to networks" />
    </Container>
  );
}
