import React, { FC } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { theme } from '../constants/Theme';
import { useGameData } from '../context/gameContext';
import { IMonsterCard, MonsterCard } from './MonsterCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Container = styled(View)`
  width: 95%;
  margin: 0 auto;
`;

const Game = styled(View)`
  background-color: ${theme.palette.black};
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
  font-family: ${theme.fonts.primary};
  font-size: ${hp('2%')}px;
  color: ${theme.palette.linegrey};
`;

export const Board: FC = () => {
  const { board } = useGameData();
  const first = board;
  const columns = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const renderItem = ({ item }: { item: IMonsterCard }) => (
    <MonsterCard monster={item.monster} key={Math.random()} animate={item.animate} />
  );
  const renderColumn = ({ item }: { item: string }) => (
    <ColumnNumberContainer key={Math.random().toString()}>
      <ColumnNumber>{item}</ColumnNumber>
    </ColumnNumberContainer>
  );

  return (
    <Container>
      <Row>{columns.map((item: string) => renderColumn({ item }))}</Row>
      <Game>
        <Row>{first.slice(0, 8).map((item: IMonsterCard) => renderItem({ item }))}</Row>
        <Row>{first.slice(8, 16).map((item: IMonsterCard) => renderItem({ item }))}</Row>
        <Row>{first.slice(16, 24).map((item: IMonsterCard) => renderItem({ item }))}</Row>
        <Row>{first.slice(24, 32).map((item: IMonsterCard) => renderItem({ item }))}</Row>
        <Row>{first.slice(32, 40).map((item: IMonsterCard) => renderItem({ item }))}</Row>
        <Row>{first.slice(40, 48).map((item: IMonsterCard) => renderItem({ item }))}</Row>
        <Row>{first.slice(48, 56).map((item: IMonsterCard) => renderItem({ item }))}</Row>
        <Row>{first.slice(56, 64).map((item: IMonsterCard) => renderItem({ item }))}</Row>
      </Game>
    </Container>
  );
};
