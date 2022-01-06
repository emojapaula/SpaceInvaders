import * as React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
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

const StyledScrollView = styled(FlatList)`
  overflow: visible;
  margin-left: ${wp('5%')}px;
`;

const NameCard = styled(TouchableOpacity)`
  /* display: flex;
  flex-direction: row;
  justify-content: center; */
`;

export default function NameScreen({ navigation }: RootStackScreenProps<'NameScreen'>) {
  const { students } = useStudentsData();
  const { chooseName } = useAuth();
  // const [student, setStudent] = useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header label="Find your name" wizard={{ step: 1, totalSteps: 2 }} />,
    });
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <NameCard
      onPress={() => {
        chooseName(item.studentId);
        navigation.navigate('ImageScreen', { student: item.name });
      }}
    >
      <Text fontSize={hp('3%')} lineHeight={hp('6%')} textAlign="center" color={theme.palette.chinaRose}>
        {item.name} {item.surname}
      </Text>
    </NameCard>
  );

  return (
    <Container>
      <Text>nannanananaa</Text>
      <TouchableOpacity onPress={() => navigation.push('ScreenTwo')}>
        <Text>Go to Screen Two!</Text>
      </TouchableOpacity>
      <Text>lista</Text>
      <StyledScrollView
        data={students}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.studentId.toString()}
      />

      <Button onPress={() => navigation.push('NameScreen')} type="secondary" label="Go to networks" />
    </Container>
  );
}
