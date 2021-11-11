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
      <Text>Screen One</Text>
      <TouchableOpacity onPress={() => navigation.push('ScreenTwo')}>
        <Text>Go to Screen Two!</Text>
      </TouchableOpacity>
      <EditScreenInfo />
      <Button type="roundedWhite" label="Watch Tutorial" />
      <Button type="roundedBlue" label="Watch Tutorial" />
      <Button type="skinnyWhite" label="Watch Tutorial" />
      <Button type="skinnyBlue" label="Watch Tutorial" />
      <Button type="borderedWhite" label="Watch Tutorial" />
      <Button type="faded" label="Watch Tutorial" />
    </Container>
  );
}
