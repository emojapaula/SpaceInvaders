/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ScreenOne from '../screens/ScreenOne';
import ScreenTwo from '../screens/ScreenTwo';
import LinkingConfiguration from './LinkingConfiguration';
import CodeScreen from '../screens/login/CodeScreen';
import NameScreen from '../screens/login/NameScreen';
import ImageScreen from '../screens/login/ImageScreen';
import { RootStackParamList } from './root-navigator';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const screenOptionStyle = {
    /* headerBackVisible: false,
    headerShadowVisible: false,
    headerTitleAlign: 'center', */
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={screenOptionStyle as {}} initialRouteName="ScreenOne">
      <Stack.Screen name="ScreenOne" component={ScreenOne} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
      <Stack.Screen name="ScreenTwo" component={ScreenTwo} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
