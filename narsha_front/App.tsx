import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, createContext} from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/components/navigation/AuthStack';
import {KeyboardAvoidingView, StyleSheet, Platform, View} from 'react-native';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { TimeCheckContext } from './src/components/TimeCheckContext';
import { StartTimeContext } from './src/components/StartTimeContext';
import { EndTimeContext } from './src/components/EndTimeContext';


const isLoggedIn = false;

// react query
const queryClient = new QueryClient()

export default function App() {
  const [timeCheck, setTimeCheck] = useState(true);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(()=>{
    const now = new Date()
    {startTime.getTime()< now.getTime() && now.getTime()<endTime.getTime()? 
      SplashScreen.show() :SplashScreen.hide()}
  });

  return (
    <TimeCheckContext.Provider value={{use:timeCheck, setUse:setTimeCheck}}>
      <StartTimeContext.Provider value={{startTime:startTime, setStartTime:setStartTime}}>
      <EndTimeContext.Provider value={{endTime:endTime, setEndTime:setEndTime}}>
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
    </TimeCheckContext.Provider>
    
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
