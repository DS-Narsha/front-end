import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';

export default function App() {
  return (
    
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>

  );
}
