import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { Text } from '../../components/reusable-components/Text';
import Button from '../../components/reusable-components/Button';
import { InputField } from '../../components/InputField';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../../constants/Theme';
import { useStudentsData } from '../../context/classContext';

const Wrapper = styled(View)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding: 0 5%;
  height: 100%;
  background-color: ${theme.palette.champagne};
`;
const InputContainer = styled(View)`
  padding-top: 40%;
  display: flex;
  justify-content: space-between;
  height: 50%;
`;

export default function CodeScreen({ navigation }: RootStackScreenProps<'CodeScreen'>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [classCode, setClassCode] = useState('');
  const [valid, setValid] = React.useState(true);
  //TODO change class to grade because of consistency
  const { students, getClass } = useStudentsData();
  /* const validateForm = () => {
    if (classCode === '') {
      setCodeValid('This is required!');
      return false;
    }
    return true;
  }; */
  //TODO refactor this
  const onSubmit = useCallback(() => {
    Keyboard.dismiss();

    // const valid = validateForm();
    if (classCode === '') {
      setValid(false);
    } else {
      setValid(true);
      getClass(classCode);
      // console.log(students);
    }
    if (students.length !== 0) {
      navigation.navigate('NameScreen');
    }
  }, [classCode, getClass, navigation, students]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Wrapper>
        <InputContainer>
          <Text
            textAlign="center"
            fontFamily={theme.fonts.robotoMedium}
            fontSize={hp('4.5%')}
            lineHeight={hp('5%')}
            color={theme.palette.chinaRose}
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
        <Button onPress={onSubmit} type="primary" label="ENTER" />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}
