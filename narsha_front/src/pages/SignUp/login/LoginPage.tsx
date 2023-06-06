import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import MyTextInput from '../../../components/MyTextInput';
import AppLogo from '../../../assets/app-logo.svg';
import CustomButton from '../../../components/CustomButton';

//@ts-ignore
const LoginPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AppLogo />
        <Text style={styles.logoText}>로그인</Text>
      </View>
      <View style={styles.formArea}>
        <MyTextInput placeholder="아이디" />
        <MyTextInput placeholder="비밀번호" />
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
      <CustomButton
        title="로그인"
        color={'#AADF98'}
        stack={'Main'}
        navi={navigation}
      />
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
    marginTop: 30,
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
});

export default LoginPage;
