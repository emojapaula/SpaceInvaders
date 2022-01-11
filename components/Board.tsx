import React, { FC, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components';
import { theme } from '../constants/Theme';
import { useGameData } from '../context/gameContext';
import MonsterCard from './MonsterCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface IBoard {
  first?: string[];
  solution: number;
}

const Container = styled(View)`
  width: 95%;
  margin: 0 auto;
`;

const Game = styled(View)`
  background-color: ${theme.palette.grey};
`;

const Row = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ColumnNumberContainer = styled(View)`
  width: ${wp('11.9%')}px;
  height: ${hp('6.25%')}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnNumber = styled(Text)`
  font-family: ${theme.fonts.openSemi};
  font-size: ${hp('2%')}px;
  color: ${theme.palette.primary};
`;

export const Board: FC<IBoard> = ({ solution }) => {
  const columns = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const renderItem = ({ item }: { item: string }) => <MonsterCard monster={item} key={Math.random()} />;
  const renderColumn = ({ item }: { item: string }) => (
    <ColumnNumberContainer key={Math.random().toString()}>
      <ColumnNumber>{item}</ColumnNumber>
    </ColumnNumberContainer>
  );
  const { board } = useGameData();
  const first = board;

  return (
    <Container>
      <Row>{columns.map((item: string) => renderColumn({ item }))}</Row>
      <Game>
        <Row>{first.slice(0, 8).map((item: string) => renderItem({ item }))}</Row>
        <Row>{first.slice(8, 16).map((item: string) => renderItem({ item }))}</Row>
        <Row>{first.slice(16, 24).map((item: string) => renderItem({ item }))}</Row>
        <Row>{first.slice(24, 32).map((item: string) => renderItem({ item }))}</Row>
        <Row>{first.slice(32, 40).map((item: string) => renderItem({ item }))}</Row>
        <Row>{first.slice(40, 48).map((item: string) => renderItem({ item }))}</Row>
        <Row>{first.slice(48, 56).map((item: string) => renderItem({ item }))}</Row>
        <Row>{first.slice(56, 64).map((item: string) => renderItem({ item }))}</Row>
      </Game>
    </Container>
  );
};
