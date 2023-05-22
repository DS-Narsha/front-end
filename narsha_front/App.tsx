import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import Loading from './src/pages/Comment/Loading';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
