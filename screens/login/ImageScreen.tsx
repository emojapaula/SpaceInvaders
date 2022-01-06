import React, { FC, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import Container from '../../components/layout/Container';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { Text } from '../../components/reusable-components/Text';
import Button from '../../components/reusable-components/Button';
import styled from 'styled-components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAuth } from '../../auth/authContext';
import AnimalCard from '../../components/AnimalCard';
import { Header } from '../../components/reusable-components/Header';

const ImagesContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: lightgray;
  justify-content: space-around;
`;

const ImageContainer = styled(TouchableOpacity)`
  height: 100px;
  width: 100px;
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

export default function ImageScreen({ navigation, route }: RootStackScreenProps<'ImageScreen'>) {
  const { chooseImage, signIn } = useAuth();
  const { student } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header label="Select your animal" wizard={{ step: 2, totalSteps: 2 }} />,
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: string }) => <AnimalCard animal={item} />;
  return (
    <Container>
      <Text>Hello {student}</Text>
      <>
        <FlatList
          data={emojis}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={5}
        />
      </>

      <Button
        onPress={() => {
          signIn();
        }}
        type="secondary"
        label="Log In "
      />
    </Container>
  );
}
