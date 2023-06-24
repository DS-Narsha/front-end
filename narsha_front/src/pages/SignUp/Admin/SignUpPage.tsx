import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AppLogo from '../../../assets/app-logo.svg';
import CustomButton from '../../../components/CustomButton';
import CopyGroup from '../../../assets/copy-group.svg';

// 관리자_회원가입 완료 페이지

//@ts-ignore
const SignUpPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AppLogo />
      </View>
      <View style={styles.textArea}>
        <Text style={styles.title}>가입을 완료했습니다!</Text>
        <Text style={styles.text1}>그룹 코드는</Text>
        <View style={styles.CodeContainer}>
          <Text style={styles.text2}>그룹 코드</Text>
          <CopyGroup />
        </View>
        <Text style={styles.text1}>입니다!</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.reset({routes: [{name: 'MainNavigator'}]})}>
        <Text style={styles.btnText}>확인!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 45,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
    marginBottom: 70,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 180,
  },
  title: {
    fontSize: 22,
    marginBottom: 18,
    color: '#000000',
  },
  text1: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
  },
  text2: {
    fontSize: 12,
    marginBottom: 8,
    paddingRight: 4,
    color: '#909090',
  },
  CodeContainer: {
    flexDirection: 'row',
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

export default SignUpPage;
