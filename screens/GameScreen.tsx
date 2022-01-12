/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { FlatList, View, Text, StatusBar, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import { RootStackScreenProps } from '../navigation/root-navigator';
import Button from '../components/reusable-components/Button';
import { useState } from 'react';
import styled from 'styled-components';
import { Board } from '../components/Board';
import { useGameData } from '../context/gameContext';
import { theme } from '../constants/Theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface IDice {
  name: string;
  number: number;
  disabled: boolean;
}

const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalView = styled(View)`
  margin: 20px;
  background-color: ${theme.palette.gainsboro};
  border-radius: 20px;
  padding: 25px 10px;
  align-items: center;
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.9);
  width: 80%;
  height: 60%;

  elevation: 7;
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled(View)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
`;

const StartButton = styled(TouchableOpacity)`
  width: ${wp('40%')}px;
  height: 20%;
  border-radius: 20px;
  background-color: ${theme.palette.purple};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButtonText = styled(Text)`
  font-size: ${hp('5%')}px;
  color: ${theme.palette.white};
  font-family: ${theme.fonts.interBold};
`;

const ReadyText = styled(Text)`
  color: ${theme.palette.skobeloff};
  font-family: ${theme.fonts.interBold}
  font-size: ${hp('4%')}px;
  text-transform: uppercase;
`;

const Warning = styled(Text)`
 color: ${theme.palette.ash};
  font-family: ${theme.fonts.interBold}
  font-size: ${hp('2.5%')}px;
  text-transform: uppercase;
`;

const Background = styled(View)`
  background-color: ${theme.palette.purple};
`;

const BackspaceContainer = styled(View)`
  /*   display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start; */
`;

const ClearContainer = styled(TouchableOpacity)`
  border-radius: 10px;
  border-width: 2px;
  border-color: ${theme.palette.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${wp('30%')}px;
  height: ${hp('6%')}px;
`;

const Clear = styled(Text)`
  color: ${theme.palette.white};
  font-family: ${theme.fonts.latoBold}
  font-size: ${hp('3%')}px;
`;

const ExpressionContainer = styled(View)`
  margin-left: 3%;
  width: ${wp('60%')}px;
  height: ${hp('10%')}px
  border-radius: 10px;
  border-width: 4px;
  border-color: ${theme.palette.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 1.3% ;
  padding-left: 1.5%;
  /* margin-right: 2%; */
`;

const Expression = styled(Text)`
  color: ${theme.palette.white};
  font-family: ${theme.fonts.latoBold}
  font-size: ${hp('3%')}px;
`;

const ShootContainer = styled(TouchableOpacity)`
  height: ${hp('10%')}px;
  width: ${wp('20%')}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.palette.white};
  border-radius: 10px;
`;

export default function GameScreen({ navigation }: RootStackScreenProps<'GameScreen'>) {
  const { moveDown, shoot, startGame } = useGameData();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const [modalVisible, setModalVisible] = useState(true);
  const [expression, setExpression] = useState('');
  const [firstDice, setFirstDice] = useState<IDice>({ name: 'firstDice', number: getRandom(1, 6), disabled: false });
  const [secondDice, setSecondDice] = useState<IDice>({ name: 'secondDice', number: getRandom(1, 6), disabled: false });
  const [thirdDice, setThirdDice] = useState<IDice>({ name: 'thirdDice', number: getRandom(1, 6), disabled: false });
  const [solution, setSolution] = useState(0);
  const [shootingCounter, setShootingCounter] = useState(0);

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value + 1); // update the state to force render
  }
  const forceUpdate = useForceUpdate();

  const setDices = () => {
    setFirstDice({ name: 'firstDice', number: getRandom(1, 6), disabled: false });
    setSecondDice({ name: 'secondDice', number: getRandom(1, 6), disabled: false });
    setThirdDice({ name: 'thirdDice', number: getRandom(1, 6), disabled: false });
  };

  const enableDices = () => {
    setFirstDice({ ...firstDice, disabled: false });
    setSecondDice({ ...secondDice, disabled: false });
    setThirdDice({ ...thirdDice, disabled: false });
  };
  console.log('1st', firstDice.name, '2nd', secondDice.name, '3d', thirdDice.name);
  const appendNumber = (dice: IDice) => {
    console.log(dice.name);
    let tempString = expression.concat(dice.number.toString());
    setExpression(tempString);
    if (dice.name === 'firstDice') {
      setFirstDice({ ...firstDice, disabled: true });
    }
    if (dice.name === 'secondDice') {
      setSecondDice({ ...secondDice, disabled: true });
    }
    if (dice.name === 'thirdDice') {
      setThirdDice({ ...thirdDice, disabled: true });
    }
  };

  const appendOperator = (operator: string) => {
    let tempString = expression.concat(operator.toString());
    setExpression(tempString);
  };

  const removeNumber = () => {
    let tempString = expression.slice(0, -1);
    const lastSign = expression.slice(-1);
    setExpression(tempString);
    if (firstDice.number.toString() === lastSign && firstDice.disabled === true) {
      setFirstDice({ ...firstDice, disabled: false });
      return;
    }
    if (secondDice.number.toString() === lastSign && secondDice.disabled === true) {
      setSecondDice({ ...secondDice, disabled: false });
      return;
    }
    if (thirdDice.number.toString() === lastSign && thirdDice.disabled === true) {
      setThirdDice({ ...thirdDice, disabled: false });
      return;
    }
  };

  const evaluate = () => {
    if (expression.includes('+') || expression.includes('-') || expression.includes('x') || expression.includes('/')) {
      enableDices();
      // eslint-disable-next-line no-eval
      setSolution(eval(expression.split('x').join('*')));
      // eslint-disable-next-line no-eval
      shoot(eval(expression.split('x').join('*')), expression);
      setExpression('');
      setShootingCounter(shootingCounter + 1);
      if (shootingCounter % 3 === 0 && shootingCounter !== 0) {
        console.log('bravo', shootingCounter);
        moveDown();
        setDices();
      }
      // forceUpdate();
    }
  };
  console.log(thirdDice.disabled);
  return (
    <Background>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CenteredView>
          <ModalView>
            <ReadyText>Are you ready to start the game?</ReadyText>
            <View>
              <Warning>Remember... </Warning>
              <Warning />
              <Warning>Don't let the monsters eat you!</Warning>
            </View>
            <StartButton
              onPress={() => {
                setModalVisible(!modalVisible);
                startGame();
              }}
            >
              <StartButtonText>START</StartButtonText>
            </StartButton>
          </ModalView>
        </CenteredView>
      </Modal>
      <Board solution={solution} />
      <Text>Attempts left{3 - ((shootingCounter - 1) % 3)}</Text>
      <BackspaceContainer>
        <ExpressionContainer>
          <Expression>{expression}</Expression>
          <TouchableOpacity onPress={() => removeNumber()}>
            <Ionicons name="ios-backspace" size={30} color={theme.palette.white} />
          </TouchableOpacity>
        </ExpressionContainer>
      </BackspaceContainer>
      <Text>{solution}</Text>
      <ButtonContainer>
        <Button
          type={firstDice.disabled ? 'disabled' : 'secondary'}
          label={firstDice.number}
          onPress={() => (firstDice.disabled ? null : appendNumber(firstDice))}
          width="30%"
          disabled={firstDice.disabled}
        />
        <Button
          type={secondDice.disabled ? 'disabled' : 'secondary'}
          label={secondDice.number}
          onPress={() => (secondDice.disabled ? null : appendNumber(secondDice))}
          width="30%"
          disabled={secondDice.disabled}
        />
        <Button
          type={thirdDice.disabled ? 'disabled' : 'secondary'}
          label={thirdDice.number}
          onPress={() => (thirdDice.disabled ? null : appendNumber(thirdDice))}
          width="30%"
          disabled={thirdDice.disabled}
        />
        <ClearContainer
          onPress={() => {
            setExpression('');
            enableDices();
          }}
        >
          <Clear>CLEAR</Clear>
        </ClearContainer>
      </ButtonContainer>
      <ButtonContainer>
        <Button type="secondary" label="+" onPress={() => appendOperator('+')} width="20%" />
        <Button type="secondary" label="-" onPress={() => appendOperator('-')} width="20%" />
        <Button type="secondary" label="x" onPress={() => appendOperator('x')} width="20%" />
        <Button type="secondary" label="/" onPress={() => appendOperator('/')} width="20%" />
        <Button type="secondary" label="(" onPress={() => appendOperator('(')} width="20%" />
        <Button type="secondary" label=")" onPress={() => appendOperator(')')} width="20%" />
      </ButtonContainer>
      <ButtonContainer>
        <ShootContainer onPress={() => evaluate()}>
          <MaterialCommunityIcons name="pistol" size={50} color={theme.palette.burgundy} />
        </ShootContainer>
      </ButtonContainer>
      <Button onPress={() => navigation.push('ScreenOne')} type="ternary" label="Go back" />
    </Background>
  );
}
