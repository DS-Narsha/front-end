import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import LoginPage from './src/pages/Login/LoginPage';

export default function App() {

  return (
    
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>

  );
}
