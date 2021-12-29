import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import Emoji from 'react-native-emoji';

interface IMonsterCardInterface {
  monster: string;
}

const Card = styled(View)``;

export default function MonsterCard({ monster }: IMonsterCardInterface) {
  return (
    <View>
      <Emoji name={monster} style={{ fontSize: 50 }} />
    </View>
  );
}
