import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ScreenOne: undefined;
  ScreenTwo: undefined;
  Modal: undefined;
  NotFound: undefined;
  CodeScreen: undefined;
  NameScreen: undefined;
  ImageScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
