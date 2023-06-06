import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/components/navigation/AuthStack';

const isLoggedIn = false;

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
