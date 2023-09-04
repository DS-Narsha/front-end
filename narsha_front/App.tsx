import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, createContext} from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/components/navigation/AuthStack';
import {KeyboardAvoidingView, StyleSheet, Platform, View} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import NotAvailable from './src/pages/NotAvailablePage';
import Loading from './src/pages/comment/Loading';

const isLoggedIn = false;

// react query
const queryClient = new QueryClient();


export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
             <NavigationContainer>
              {isLoggedIn? <MainNavigator/>:<AuthStack />}
            </NavigationContainer>
        </KeyboardAvoidingView>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});
