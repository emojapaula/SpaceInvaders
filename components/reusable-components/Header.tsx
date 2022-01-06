import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { Text } from './Text';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { theme } from '../../constants/Theme';

interface IHeaderProps {
  label: string;
  wizard?: {
    step: number;
    totalSteps: number;
  };
}

const Container = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackContainer = styled(TouchableOpacity)`
  height: ${hp('5.55%')}px;
  width: ${hp('5.55%')}px;
  display: flex;
  justify-content: center;
`;

interface IGoBackProps {}

export const GoBack: FC<IGoBackProps> = () => {
  const navigation = useNavigation();
  return navigation.canGoBack() ? (
    <BackContainer onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={hp('3%')} color={theme.palette.primary} />
    </BackContainer>
  ) : null;
};

export const Header: FC<IHeaderProps> = ({ label, wizard }) => {
  return (
    <Container>
      {wizard ? (
        <>
          <Text fontFamily={theme.fonts.robotoBold} fontSize={hp('1.2%')} color={theme.palette.primary}>
            STEP {wizard.step} OF {wizard.totalSteps}
          </Text>
          <Text
            fontFamily={theme.fonts.latoBold}
            fontSize={hp('2.9%')}
            color={theme.palette.eerieBlack}
            lineHeight={hp('3%')}
          >
            {label}
          </Text>
        </>
      ) : (
        <Text fontFamily={theme.fonts.latoBold} fontSize={hp('2%')} color={theme.palette.eerieBlack}>
          {label}
        </Text>
      )}
    </Container>
  );
};
