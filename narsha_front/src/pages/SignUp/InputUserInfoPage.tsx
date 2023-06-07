import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import BackSvg from '../../assets/back.svg';
import MyTextInput from '../../components/MyTextInput';
import CustomButton from '../../components/CustomButton';

// 이름, 닉네임, 아이디, 비밀번호와 같은 정보 입력하는 페이지
// 아이디 중복확인 부분 아직 구현 안 함

//@ts-ignore
const InputUserInfoPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <BackSvg />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.roundBtnContainer}>
          <Text style={styles.round1}></Text>
          <Text style={styles.round1}></Text>
          <Text style={styles.round2}></Text>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.text}>정보를 입력하세요.</Text>
        </View>
        <View style={styles.formArea}>
          <Text style={styles.formText}>이름</Text>
          <MyTextInput />
          <Text style={styles.formText}>닉네임</Text>
          <MyTextInput />
          <Text style={styles.formText}>아이디</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText} placeholder="중복확인" />
            <Text style={styles.warningText}>*이미 존재하는 아이디입니다.</Text>
          </View>
          <Text style={styles.formText}>비밀번호</Text>
          <MyTextInput />
        </View>
        <View>
          <TouchableOpacity>
            <CustomButton
              title="다음"
              stack={'SignUp'}
              navi={navigation}
              color={'#AADF98'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 20,
  },
  content: {
    padding: 20,
  },
  roundBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 15,
  },
  round1: {
    backgroundColor: '#98DC63',
    borderRadius: 50,
    width: 18,
    height: 18,
    marginLeft: 25,
    marginRight: 25,
  },
  round2: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    width: 18,
    height: 18,
    marginLeft: 25,
    marginRight: 25,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#35562F',
    fontWeight: '800',
    marginBottom: 50,
  },
  formArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  formText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    width: '100%',
    height: 48,
    marginBottom: 45,
  },
  inputText: {
    fontSize: 14,
    marginLeft: 10,
  },
  warningText: {
    marginLeft: 15,
    marginTop: 2,
    color: '#FF0000',
    fontSize: 12,
  },
});

export default InputUserInfoPage;
