import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './src/screens/MainNavigator';
import Routes from './src/screens/Routes';

export default function App() {
  return (
      <MainNavigator /> //네비게이션 바 호출

  )
}