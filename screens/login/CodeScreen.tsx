import * as React from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { Text } from '../../components/reusable-components/Text';
import Button, { ArcadeButton } from '../../components/reusable-components/Button';
import { InputField } from '../../components/InputField';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../../constants/Theme';
import { IStudent, useStudentsData } from '../../context/classContext';
import { useHeaderHeight } from '@react-navigation/elements';

const Wrapper = styled(View)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding: 0 5%;
  height: 100%;
  background-color: ${theme.palette.blackestBlack};
`;
const InputContainer = styled(View)`
  /* padding-top: 40%; */
  display: flex;
  justify-content: space-around;
  height: 50%;
  /* background-color: lightgray; */
  margin-top: -10%;
`;

const Bla = styled(ScrollView)`
  background-color: red;
  height: 100%;
`;

const Center = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled(View)`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 15%;
`;

const StyledImage = styled(Image)`
  /* flex: 1; */
  height: 100%;
  width: 40%;
  /* height: 50px; */
`;

export default function CodeScreen({ navigation }: RootStackScreenProps<'CodeScreen'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const headerHeight = useHeaderHeight();

  const [classCode, setClassCode] = useState('');

  const { getClass, students } = useStudentsData();

  const validate = async () => {
    if (classCode === '') return false;
    return true;
  };

  //TODO refactor this

  const addToContext = async () => {
    Keyboard.dismiss();

    const formValid = await validate();
    if (formValid) {
      // setValid(true);
      await getClass(classCode);
      //await setStudents(getStudents());
    } else {
      // setValid(false);
      console.log('not valid');
    }
  };

  useEffect(() => {
    console.log('st', students.length);
    if (students.length !== 0) {
      navigation.navigate('NameScreen');
    }
  }, [navigation, students]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Wrapper>
        <ImageContainer>
          <StyledImage source={require('../../assets/images/invader.jpg')} />
        </ImageContainer>

        <InputContainer>
          <Text
            textAlign="center"
            fontFamily={theme.fonts.arcadeN}
            fontSize={hp('4%')}
            lineHeight={hp('5%')}
            color={theme.palette.linegrey}
          >
            Enter your class code:
          </Text>
          <InputField
            borderRadius={25}
            value={classCode}
            onChange={setClassCode}
            onChangeEnd={() => console.log(classCode)}
            keyboardType="number-pad"
            classId
          />
        </InputContainer>
        <Center>
          <ArcadeButton onPress={addToContext} type="arcade" label="ENTER" width="70%" />
        </Center>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}
