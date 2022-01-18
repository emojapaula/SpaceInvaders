import * as React from 'react';
import { FlatList, StatusBar, TouchableOpacity, View, Image } from 'react-native';
import Container from '../../components/layout/Container';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { Text } from '../../components/reusable-components/Text';
import Button from '../../components/reusable-components/Button';
import { IStudent, useStudentsData } from '../../context/classContext';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../../constants/Theme';
import { useState } from 'react';
import { useAuth } from '../../auth/authContext';
import { Header } from '../../components/reusable-components/Header';
import { invaders } from '../../assets/assets.icons';

const Background = styled(View)`
  height: 100%;
  background-color: ${theme.palette.eerieBlack};
`;

const HeaderContainer = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: lightgray; */
  /* width: 100%; */
`;

const ImageContainer = styled(View)`
  width: 60%;
  height: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* padding-top: 15%; */
  /* background-color: lightgray; */
  padding-top: ${hp('20%')}px;
  margin-bottom: -5%;
`;

const StyledImage = styled(View)`
  /* flex: 1; */
  /* height: 100px; */
  height: ${hp('15%')}px;
  width: 60px;
  width: ${wp('18%')}px;
  /* height: 50px; */
`;

export default function NameScreen({ navigation }: RootStackScreenProps<'NameScreen'>) {
  const { students } = useStudentsData();
  const { chooseName } = useAuth();
  // const [student, setStudent] = useState('');

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        chooseName(item.studentId);
        navigation.navigate('ImageScreen', { student: item.name });
      }}
    >
      <Text
        fontSize={hp('3%')}
        lineHeight={hp('6%')}
        textAlign="center"
        color={theme.palette.white}
        fontFamily={theme.fonts.arcadeN}
      >
        {item.name} {item.surname}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Background>
      <StatusBar hidden />
      <>
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.studentId.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <HeaderContainer>
              <Header label="Choose your character" wizard={{ step: 1, totalSteps: 2 }} />
              <ImageContainer>
                <StyledImage>
                  <invaders.purpleInvader />
                </StyledImage>
                <StyledImage>
                  <invaders.purpleInvader />
                </StyledImage>
                <StyledImage>
                  <invaders.purpleInvader />
                </StyledImage>
              </ImageContainer>
            </HeaderContainer>
          }
          ListFooterComponent={
            <HeaderContainer>
              <ImageContainer>
                <StyledImage>
                  <invaders.purpleInvader />
                </StyledImage>
                <StyledImage>
                  <invaders.purpleInvader />
                </StyledImage>
                <StyledImage>
                  <invaders.purpleInvader />
                </StyledImage>
              </ImageContainer>
            </HeaderContainer>
          }
        />
      </>
    </Background>
  );
}
