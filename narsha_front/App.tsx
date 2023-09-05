import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState, createContext, useCallback} from 'react';
import MainNavigator from './src/components/navigation/MainNavigator';
import SplashScreen from 'react-native-splash-screen';
import AuthStack from './src/components/navigation/AuthStack';
import NotAvailable from './src/pages/NotAvailablePage';
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
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

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
  const [notification, setNotification] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const foregroundListener = useCallback(() => {
    messaging().onMessage(async message => {
      if (message.notification) {
        // 모달 표시
        setModalVisible(true);
        setNotification(message.notification);
        console.log(message);
      }
    });
  }, []);

  useEffect(() => {
    foregroundListener();
  }, []);

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>푸시 알림 내용:</Text>
            <Text>{notification ? notification.body : ''}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
