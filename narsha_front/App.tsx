import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, createContext} from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/components/navigation/AuthStack';
import {KeyboardAvoidingView, StyleSheet, Platform, View} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StartTimeContext} from './src/components/StartTimeContext';
import {EndTimeContext} from './src/components/EndTimeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isLoggedIn = false;

// react query
const queryClient = new QueryClient();

// async-storage에 담긴 활성화 시간 받아오기
export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};

export default function App() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    SplashScreen.hide();

    async function getTime() {
      const s = await getData('startTime');
      const e = await getData('endTime');
      if (s) {
        setStartTime(new Date(s));
      }

      if (e) {
        setEndTime(new Date(e));
      }
    }

    getTime();
  }, []);

  useEffect(() => {
    const now = new Date();

    console.log('now:' + now);
    console.log('start:' + startTime);
    console.log('end:' + endTime);
    console.log(
      startTime.getTime() < now.getTime() && now.getTime() < endTime.getTime(),
    );

    // {startTime.getTime()< now.getTime() && now.getTime()<endTime.getTime()?
    //   SplashScreen.show():SplashScreen.hide()}
  });

  return (
    <StartTimeContext.Provider
      value={{startTime: startTime, setStartTime: setStartTime}}>
      <EndTimeContext.Provider
        value={{endTime: endTime, setEndTime: setEndTime}}>
        <View style={styles.container}>
          <QueryClientProvider client={queryClient}>
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'padding', android: undefined})}
              style={styles.avoid}>
              <NavigationContainer>
                {isLoggedIn ? <MainNavigator /> : <AuthStack />}
              </NavigationContainer>
            </KeyboardAvoidingView>
          </QueryClientProvider>
        </View>
      </EndTimeContext.Provider>
    </StartTimeContext.Provider>
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
