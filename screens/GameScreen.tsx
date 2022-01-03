import * as React from 'react';
import { FlatList, View,StyleSheet,Dimensions,TouchableHighlight,Text} from 'react-native';

import Container from '../components/layout/Container';
//import { Text } from '../components/reusable-components/Text';
import { RootStackScreenProps } from '../navigation/root-navigator';
import Button from '../components/reusable-components/Button';
import MonsterCard from '../components/MonsterCard';
import { useState } from 'react';

const monsters: string[] = ['space_invader', 'skull_and_crossbones', 'japanese_ogre', 'skull', 'ghost','smiling_imp','japanese_goblin','alien'];

interface IDice {
  name: string;
  number: number;
  disabled: boolean;
}
const numColumns=8;
let array;
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

  const renderItem = ({ item }: { item: string }) =>
  <View style={styles.item}><MonsterCard monster={item} /></View>;

  return (
    <Container>
      <FlatList
        data={monsters}
        renderItem={renderItem}
        style={styles.container}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
      />
      <View>
        <Text style={{fontSize: 20,fontWeight: "bold"}}>{expression}</Text>
      </View>
      <View style={{flex:1,flexDirection:'column',justifyContent:"space-evenly"}}>
      <Text style={{fontSize: 20,fontWeight: "bold"}}>Dostupni brojevi:</Text>
      <View style={styles.buttoncontainer}>
      <TouchableHighlight  style={styles.number_button} onPress={() => appendNumber(firstDice)} ><Text style={styles.button_text}>{firstDice.number}</Text></TouchableHighlight>
      <TouchableHighlight  style={styles.number_button} onPress={() => appendNumber(secondDice)} ><Text style={styles.button_text}>{secondDice.number}</Text></TouchableHighlight>
      <TouchableHighlight  style={styles.number_button}onPress={() => appendNumber(thirdDice)} ><Text style={styles.button_text}>{thirdDice.number}</Text></TouchableHighlight>
      </View>
      <View style={styles.buttoncontainer}>
      <TouchableHighlight  style={styles.operator_button} onPress={() => appendOperator('+')}><Text style={styles.button_text}>+</Text></TouchableHighlight>
      <TouchableHighlight  style={styles.operator_button} onPress={() => appendOperator('-')}><Text style={styles.button_text}>-</Text></TouchableHighlight>
      <TouchableHighlight  style={styles.operator_button} onPress={() => appendOperator('x')}><Text style={styles.button_text}>x</Text></TouchableHighlight>
      <TouchableHighlight  style={styles.operator_button} onPress={() => appendOperator('/')}><Text style={styles.button_text}>/</Text></TouchableHighlight>
      <TouchableHighlight  style={styles.operator_button} onPress={removeNumber}><Text style={styles.button_text}>Briši</Text></TouchableHighlight>
      </View>
      <Button onPress={() => navigation.push('ScreenOne')} type="secondary" label="Vrati se nazad" />
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    borderWidth: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    //height: Dimensions.get('window').width / numColumns,
    borderWidth: 1,
  },
  buttoncontainer:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    marginBottom:10,
  },
  number_button:{
    width:90,
    height:40,
    backgroundColor:"#35bd59",
    borderRadius:7,
    justifyContent:"center",
    alignItems:"center",
  },
  operator_button:{
    width:70,
    height:40,
    backgroundColor:'#a827cf',
    borderRadius:7,
    justifyContent:"center",
    alignItems:"center",
  },
  button_text:{
    fontSize: 25,
    fontWeight: "bold",
    color:'#fff'
  }
});