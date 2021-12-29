import * as React from 'react';
import { FlatList, View } from 'react-native';

import Container from '../components/layout/Container';
import { Text } from '../components/reusable-components/Text';
import { RootStackScreenProps } from '../navigation/root-navigator';
import Button from '../components/reusable-components/Button';
import MonsterCard from '../components/MonsterCard';
import { useState } from 'react';

const monsters: string[] = ['space_invader', 'poop', 'japanese_ogre', 'skull', 'ghost'];

interface IDice {
  name: string;
  number: number;
  disabled: boolean;
}

export default function GameScreen({ navigation }: RootStackScreenProps<'GameScreen'>) {
  const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const [expression, setExpression] = useState('');
  //   const [firstDice, setFirstDice] = useState(getRandom(1, 6));
  const [firstDice, setFirstDice] = useState<IDice>({ name: 'firstDice', number: getRandom(1, 6), disabled: false });
  const [secondDice, setSecondDice] = useState<IDice>({ name: 'secondDice', number: getRandom(1, 6), disabled: false });
  const [thirdDice, setThirdDice] = useState<IDice>({ name: 'thirdDice', number: getRandom(1, 6), disabled: false });

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

  const renderItem = ({ item }: { item: string }) => <MonsterCard monster={item} />;

  return (
    <Container>
      <FlatList
        data={monsters}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
      />

      <View>
        <Text>{expression}</Text>
      </View>
      <Text>Dostupni brojevi:</Text>
      <Button type="primary" label={firstDice.number} onPress={() => appendNumber(firstDice)} />
      <Button type="primary" label={secondDice.number} onPress={() => appendNumber(secondDice)} />
      <Button type="primary" label={thirdDice.number} onPress={() => appendNumber(thirdDice)} />
      <Button type="primary" label="+" onPress={() => appendOperator('+')} />
      <Button type="primary" label="-" onPress={() => appendOperator('-')} />
      <Button type="primary" label="x" onPress={() => appendOperator('x')} />
      <Button type="primary" label="/" onPress={() => appendOperator('/')} />
      <Button type="primary" label="Briši" onPress={() => removeNumber()} />
      <Button onPress={() => navigation.push('ScreenOne')} type="secondary" label="Go back" />
    </Container>
  );
}
