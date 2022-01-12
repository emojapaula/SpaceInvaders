import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Emoji from 'react-native-emoji';
import { theme } from '../constants/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface IMonsterCardInterface {
  monster: string;
}

const Card = styled(View)`
  /* width: 1%; */
  /* background-color: white; */
`;

const Box = styled(View)`
  border-width: 0.5px;
  width: ${wp('11.9%')}px;
  border-color: ${theme.palette.linegrey};
  height: ${hp('6.25%')}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function MonsterCard({ monster }: IMonsterCardInterface) {
  return (
    <Card>
      {monster === '0' ? (
        <Box></Box>
      ) : (
        <Box>
          <Emoji name={monster} style={styles.item} />
        </Box>
      )}
    </Card>
  );
}
const styles = StyleSheet.create({
  item: {
    fontSize: 30,
  },
});
