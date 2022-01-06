import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../auth/authContext';
import Button from '../components/reusable-components/Button';
import { useStudentData } from '../context/studentContext';

export const HomeScreen: FC = ({ navigation }) => {
  const { signOut, student } = useAuth();
  return (
    <View>
      <Text>{student.name}</Text>
      <Button onPress={() => navigation.push('GameScreen')} type="primary" label="Game" />

      <Button type="secondary" label="Sign out" onPress={() => signOut()} />
    </View>
  );
};
