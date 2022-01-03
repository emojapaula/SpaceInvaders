import React, { FC, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View ,Image,StyleSheet} from 'react-native';
import Container from '../../components/layout/Container';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { Text } from '../../components/reusable-components/Text';
import Button from '../../components/reusable-components/Button';
import styled from 'styled-components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAuth } from '../../auth/authContext';
import AnimalCard from '../../components/AnimalCard';
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

export default function ImageScreen({ navigation }: RootStackScreenProps<'ImageScreen'>) {
  const { chooseImage, signIn } = useAuth();

  /* const renderItem = ({ item }: any) => {
    <AnimalCard animal={item} />;
  }; */
  const renderItem = ({ item }: { item: string }) => <AnimalCard animal={item} />;
  return (
    <Container>
      <Text>Image blaa</Text>
      <>
      <FlatList
          style={styles.container}
          data={emojis}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={5}
        /> 
        {/*   <ImagesContainer>
          <ImageContainer onPress={() => chooseImage(animalsIcons.panda.name)}>
            <animalsIcons.panda.panda />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.butterfly.butterfly />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.chick.chick />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.crocodile.crocodile />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.dog.dog />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.fox.fox />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.ladybug.ladybug />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.lion.lion />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.monkey.monkey />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.mouse.mouse />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.octopus.octopus />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.penguin.penguin />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.rhino.rhino />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.snail.snail />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.snake.snake />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.tiger.tiger />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.turtle.turtle />
          </ImageContainer>
          <ImageContainer>
            <animalsIcons.bird.bird />
          </ImageContainer>
        </ImagesContainer>  */}
      </>

      {/* <StyledScrollView data={images} renderItem={renderItem} numColumns={5} /> */}
      <Button
        onPress={() => {
          signIn();
          console.log('object');
        }}
        type="secondary"
        label="Log In "
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"50%",
    marginLeft:20
  }
});
