import React, { FC, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import { theme } from '../constants/Theme';
import { useGameData } from '../context/gameContext';
import MonsterCard from './MonsterCard';

interface IBoard {
  first?: string[];
  solution: number;
}

const Container = styled(View)`
  width: 95%;
  margin: 0 auto
  background-color: ${theme.palette.grey};
`;

const Row = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Board: FC<IBoard> = ({ solution }) => {
  const renderItem = ({ item }: { item: string }) => <MonsterCard monster={item} key={Math.random()} />;
  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const { board } = useGameData();
  const first = board;

  return (
    <Container>
      <Row>{first.slice(0, 8).map((item: string) => renderItem({ item }))}</Row>
      <Row>{first.slice(8, 16).map((item: string) => renderItem({ item }))}</Row>
      <Row>{first.slice(16, 24).map((item: string) => renderItem({ item }))}</Row>
      <Row>{first.slice(24, 32).map((item: string) => renderItem({ item }))}</Row>
      <Row>{first.slice(32, 40).map((item: string) => renderItem({ item }))}</Row>
      <Row>{first.slice(40, 48).map((item: string) => renderItem({ item }))}</Row>
      <Row>{first.slice(48, 56).map((item: string) => renderItem({ item }))}</Row>
      <Row>{first.slice(56, 64).map((item: string) => renderItem({ item }))}</Row>
    </Container>
  );
};
