import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Emoji from 'react-native-emoji';
import { useAuth } from '../auth/authContext';

interface IAnimalCardInterface {
  animal: string;
}

const Card = styled(View)``;

export default function AnimalCard({ animal }: IAnimalCardInterface) {
  const { chooseImage } = useAuth();
  return (
    <TouchableOpacity onPress={() => chooseImage(animal.toString())}>
      <Emoji name={animal} style={{ fontSize: 50 }} />
    </TouchableOpacity>
  );
}
