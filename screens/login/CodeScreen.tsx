import * as React from 'react';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Container from '../../components/layout/Container';
import { RootStackScreenProps } from '../../navigation/root-navigator';
import { Text } from '../../components/reusable-components/Text';
import Button from '../../components/reusable-components/Button';
import { InputField } from '../../components/InputField';
import { useState } from 'react';
import styled from 'styled-components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { theme } from '../../constants/Theme';

const Wrapper = styled(View)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  /* width: ${wp('90%')}px; */
  /* margin: 0 auto; */
  padding: 0 5%;
  height: 100%;
  background-color: ${theme.palette.champagne};
`;
const InputContainer = styled(View)`
  padding-top: 40%;
  display: flex;
  justify-content: space-between;
  height: 50%;
  /* background-color: lightblue; */
`;

export default function CodeScreen({ navigation }: RootStackScreenProps<'CodeScreen'>) {
  const [classCode, setClassCode] = useState('');

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
        <Button onPress={() => navigation.push('NameScreen')} type="primary" label="ENTER" />
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}
