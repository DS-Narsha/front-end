import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, createContext, useCallback} from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/components/navigation/AuthStack';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  View,
  Alert,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import pushNoti from './src/utils/pushNoti';
// import { onDisplayNotification } from './src/utils/onDisplayNotification';
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('[Background Remote Message]', remoteMessage);
});

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

const displayNotification = async (message: any) => {
  await notifee.createChannel({
    id: 'channel_id',
    name: 'Channel Name',
    importance: AndroidImportance.HIGH,
  });

  const channelId = 'channel_id';

  await notifee.displayNotification({
    title: message.notification.title,
    body: message.notification.body,
    android: {
      channelId,
    },
  });
};

export default function App() {

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
  };

  const foregroundListener = useCallback(() => {
    messaging().onMessage(async message => {
      if (message.notification) {
        const title = message.notification.title;
        const body = message.notification.body;
        //onDisplayNotification();
        //await onDisplayNotification({title, body});
        //pushNoti.displayNoti(message);
        console.log(message)
        displayNotification(message);
      }
    });
  }, []);

  useEffect(() => {
    // getFcmToken();
    foregroundListener();
  }, []);

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
            {isLoggedIn ? <MainNavigator /> : <AuthStack />}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 40,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
});
