import React, { useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, TextInput} from 'react-native';
import MyTextInput from '../../../components/MyTextInput';
import AppLogo from '../../../assets/app-logo.svg'
import CustomButton from '../../../components/CustomButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';

//@ts-ignore
const LoginPage = ({navigation}) => {

  const[userId, setUserId] = useState('');
  const[password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const loginMutation = useMutation(async () => {
    const response = await fetch(`http://localhost:8080/api/user/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    })

    const data = await response.json();
    return data;

  })

  const handleLogin = async () => {
    try {
      const data = await loginMutation.mutateAsync();

      if(data.status === 200) {
        // 로그인 성공시 캐시에 로그인 성공을 저장
        queryClient.setQueryData(['isLoggedIn'], true);
        navigation.reset({ routes: [{ name: 'MainNavigator' }] });
      } else {
        Alert.alert('로그인 실패', data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AppLogo />
        <Text style={styles.logoText}>로그인</Text>
      </View>
      <View style={styles.formArea}>
        <TextInput 
        placeholder="아이디"
        value={userId}
        onChangeText={(text: React.SetStateAction<string>) => setUserId(text)} />
        <TextInput 
        placeholder="비밀번호"
        value={password}
        onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
        secureTextEntry
        />
      </View>
      <View style={styles.textArea}>
        <Text>App이름 회원이 아니신가요?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('UserType');
          }}>
          <Text>회원가입 하기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}>
        <Text style={styles.btnText}>확인!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 25,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoText: {
    fontSize: 26,
    marginTop: 30,
    marginBottom: 20,
    color: '#35562F',
    fontWeight: 'bold',
  },
  formArea: {
    marginTop: 40,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 130,
  },
  button: {
    backgroundColor: '#AADF98',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  btnText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default LoginPage;
