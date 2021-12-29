import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Emoji from 'react-native-emoji';

interface IAnimalCardInterface {
  animal: string;
}

const Card = styled(View)``;

export default function AnimalCard({ animal }: IAnimalCardInterface) {
  return (
    <View>
      <Emoji name={animal} style={{ fontSize: 50 }} />
    </View>
  );
}
