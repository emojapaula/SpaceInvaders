import * as React from 'react';
import { FlatList, View, Text, StatusBar } from 'react-native';

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
  const { moveDown, board, shoot } = useGameData();

  const gameBoard = board;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const [expression, setExpression] = useState('');
  //   const [firstDice, setFirstDice] = useState(getRandom(1, 6));
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
  const initializeBoard = () => {
    //napravi polje sa velicinom 1
    let gameBoard: string[] = ['0'];
    //dodaj 63 nule da polje bude 64
    for (let i = 0; i < 63; ++i) {
      gameBoard.push('0');
    }
    //inicijaliziraj 10 cudovista (oznake cudovista 1,2,3,4) u prva 3 reda
    for (let i = 0; i < 10; ++i) {
      let position = Math.floor(Math.random() * 24);
      let monster = Math.floor(Math.random() * 8);
      if (gameBoard[position] === '0') {
        // gameBoard[position] = monster.toString();
        gameBoard[position] = monsters[monster];
      } else {
        --i;
      }
    }
    //inicijaliziraj jednog nekog u 4. red 🙂
    let pozicija = 24 + Math.floor(Math.random() * 8);
    gameBoard[pozicija] = monsters[Math.floor(Math.random() * 8)];

    return gameBoard;
  };

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
    shoot(eval(expression.split('x').join('*')));
    setExpression('');
    setShootingCounter(shootingCounter + 1);
    if (shootingCounter % 3 === 0 && shootingCounter !== 0) {
      console.log('bravo', shootingCounter);
      moveDown();
      setDices();
    }
    forceUpdate();
  };

  /*   function shoot(stupac: number) {
    console.log('jesam usao');
    if (stupac > 0 && stupac < 8) {
      for (let i = 63 - (8 - stupac); i >= 0; i -= 8) {
        if (gameBoard[i] !== '0') {
          gameBoard[i] = '0';
        }
      }
    }

    console.log('prije', shootingCounter);

    setShootingCounter(shootingCounter + 1);
    console.log('poslije', shootingCounter);
    if (shootingCounter % 3 === 0) moveDown();
  } */

  return (
    <View>
      <StatusBar hidden />

      <Board solution={solution} />
      <Text>Attempts left{3 - (shootingCounter % 3)}</Text>

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
