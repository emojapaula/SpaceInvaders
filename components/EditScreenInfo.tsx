import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Container from './layout/Container';
import { Text } from './Text';

export default function EditScreenInfo() {
  return (
    <Container>
      <Container>
        <Text>Open up the code for this screen:</Text>

        <Text>Change any of the text, save the file, and your app will automatically update.</Text>
      </Container>

      <Container>
        <TouchableOpacity onPress={handleHelpPress}>
          <Text>{"Tap here if your app doesn't automatically update after making changes"}</Text>
        </TouchableOpacity>
      </Container>
    </Container>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet');
}
