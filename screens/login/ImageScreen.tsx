import React, { useState } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { ArcadeButton } from '../../components/reusable-components/Button';
import styled from 'styled-components';
import { useAuth } from '../../auth/authContext';
import { Header } from '../../components/reusable-components/Header';
import { theme } from '../../constants/Theme';
import { InputContainer } from '../../components/InputField';
import Emoji from 'react-native-emoji';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ImagesContainer = styled(View)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 10%;
`;

export const Background = styled(View)`
  height: 100%;
  background-color: ${theme.palette.eerieBlack};
  display: flex;
  justify-content: space-between;
`;

const Center = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const emojis: string[] = [
  'elephant',
  'dog',
  'wolf',
  'fox_face',
  'cat',
  'lion_face',
  'tiger',
  'bird',
  'bear',
  'bat',
  'butterfly',
  'baby_chick',
  'crocodile',
  'dolphin',
  'fish',
  'monkey',
  'mouse',
  'octopus',
  'panda_face',
  'penguin',
  'rhinoceros',
  'snail',
  'snake',
  'turtle',
  'giraffe_face',
];

export default function ImageScreen({ navigation }: RootStackScreenProps<'ImageScreen'>) {
  const { signIn, chooseImage } = useAuth();
  const [animal, setAnimal] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header label="Select your animal" wizard={{ step: 2, totalSteps: 2 }} />,
    });
  }, [navigation]);

  return (
    <Background>
      <StatusBar hidden />
      <Header label="Choose your companion" wizard={{ step: 2, totalSteps: 2 }} />

      <>
        <ImagesContainer>
          {emojis.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              onPress={() => {
                chooseImage(emoji.toString());
                setAnimal(emoji);
              }}
            >
              <Emoji name={emoji} style={{ fontSize: 50 }} />
            </TouchableOpacity>
          ))}
        </ImagesContainer>
        <Center>
          <InputContainer>{animal ? <Emoji name={animal} style={{ fontSize: 50 }} /> : null}</InputContainer>
        </Center>
      </>
      <Center>
        <ArcadeButton onPress={signIn} type="primary" label="ENTER" width="70%" />
      </Center>
      <ArcadeButton type="ternary" label="Go back" onPress={() => navigation.goBack()} fontSize={hp('1.5%')} />
    </Background>
  );
}
