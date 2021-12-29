/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import ScreenOne from '../screens/ScreenOne';
import { useAuth } from '../auth/authContext';
import ScreenTwo from '../screens/ScreenTwo';
import LinkingConfiguration from './LinkingConfiguration';
import CodeScreen from '../screens/login/CodeScreen';
import NameScreen from '../screens/login/NameScreen';
import ImageScreen from '../screens/login/ImageScreen';
import { RootStackParamList } from './root-navigator';
import GameScreen from '../screens/GameScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { authData } = useAuth();

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const screenOptionStyle = {
  headerShown: false,
};

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle as {}} initialRouteName="ScreenOne">
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle as {}}>
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
    </Stack.Navigator>
  );
};
