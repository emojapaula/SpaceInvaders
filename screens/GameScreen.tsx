import * as React from 'react';
import { FlatList, View, Text, StatusBar, Modal, StyleSheet } from 'react-native';

import Container from '../components/layout/Container';
//import { Text } from '../components/reusable-components/Text';
import { RootStackScreenProps } from '../navigation/root-navigator';
import Button from '../components/reusable-components/Button';
import MonsterCard from '../components/MonsterCard';
import { useState } from 'react';
import styled from 'styled-components';
import { Board } from '../components/Board';
import { useGameData } from '../context/gameContext';

const monsters: string[] = [
  'space_invader',
  'skull_and_crossbones',
  'japanese_ogre',
  'skull',
  'ghost',
  'smiling_imp',
  'japanese_goblin',
  'alien',
];

interface IDice {
  name: string;
  number: number;
  disabled: boolean;
}

const ButtonContainer = styled(View)`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
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

  const appendNumber = (dice: IDice) => {
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
    if (firstDice.number.toString() === lastSign && firstDice.disabled === true)
      setFirstDice({ ...firstDice, disabled: false });
    if (secondDice.number.toString() === lastSign && secondDice.disabled === true)
      setSecondDice({ ...secondDice, disabled: false });
    if (thirdDice.number.toString() === lastSign && thirdDice.disabled === true)
      setThirdDice({ ...thirdDice, disabled: false });
  };

  const evaluate = () => {
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
    forceUpdate();
  };

  return (
    <View>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button
              type="primary"
              label="start"
              onPress={() => {
                setModalVisible(!modalVisible);
                startGame();
              }}
            />
          </View>
        </View>
      </Modal>
      <Board solution={solution} />
      <Text>Attempts left{3 - ((shootingCounter - 1) % 3)}</Text>

      <Text>{expression}</Text>
      <Text>{solution}</Text>
      <Text>Dostupni brojevi:</Text>
      <ButtonContainer>
        <Button type="primary" label={firstDice.number} onPress={() => appendNumber(firstDice)} width="30%" />
        <Button type="primary" label={secondDice.number} onPress={() => appendNumber(secondDice)} width="30%" />
        <Button type="primary" label={thirdDice.number} onPress={() => appendNumber(thirdDice)} width="30%" />
      </ButtonContainer>
      <ButtonContainer>
        <Button type="primary" label="+" onPress={() => appendOperator('+')} width="20%" />
        <Button type="primary" label="-" onPress={() => appendOperator('-')} width="20%" />
        <Button type="primary" label="x" onPress={() => appendOperator('x')} width="20%" />
        <Button type="primary" label="/" onPress={() => appendOperator('/')} width="20%" />
      </ButtonContainer>
      <Button type="primary" label="Briši" onPress={() => removeNumber()} />
      <Button type="primary" label="Pucaj" onPress={() => evaluate()} />
      <Button onPress={() => navigation.push('ScreenOne')} type="ternary" label="Go back" />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
