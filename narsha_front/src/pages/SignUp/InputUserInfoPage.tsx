import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BackSvg from '../../assets/back.svg';
import MyTextInput from '../../components/MyTextInput';
import CustomButton from '../../components/CustomButton';

// 이름, 닉네임, 아이디, 비밀번호와 같은 정보 입력하는 페이지
// 아이디 중복확인 부분 아직 구현 안 함

//@ts-ignore
const InputUserInfoPage = ({navigation, route}) => {

  // 사용자 타입
  const userType = route.params?.userType;

  const[username, setUsername] = useState('');
  const[userId, setUserId] = useState('');
  const[password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const registerMutation = useMutation(async () => {
    const response = await fetch(`http://localhost:8080/api/user/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        password,
        userType,
        name: username
      }),
    })

    const data = await response.json();
    return data;

  })

  const handleRegister = async () => {
    try {
      const data = await registerMutation.mutateAsync();
      
      if(data.message === "회원가입 완료") {
        // 회원가입 성공시 캐시에 로그인 성공을 저장
        queryClient.setQueryData(['isLoggedIn'], true);
        // userType에 따라 그룹 생성 / 입력 페이지로 이동
        if (userType === 'teacher') {
          navigation.navigate('Group', {res: data.res});
        } else if (userType === 'student') {
          navigation.navigate('InputGroup', {res: data.res});
        }
      } else {
        console.log(data.message);
        Alert.alert('회원가입 실패', data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <BackSvg />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.roundBtnContainer}>
          <Text style={styles.roundGreen}></Text>
          <Text style={styles.roundGreen}></Text>
          <Text style={styles.roundGray}></Text>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.text}>정보를 입력하세요.</Text>
        </View>
        <View style={styles.formArea}>
          <Text style={styles.formText}>이름</Text>
          <View style={styles.inputContainer}>
            <TextInput 
            style={styles.inputText} 
            value={username}
            onChangeText={(text: React.SetStateAction<string>) => setUsername(text)} />
          </View>
          <Text style={styles.formText}>아이디</Text>
          <View style={styles.inputContainer}>
            <TextInput 
            style={styles.inputText} 
            placeholder="중복확인"
            value={userId}
            onChangeText={(text: React.SetStateAction<string>) => setUserId(text)} />
            <Text style={styles.warningText}>*이미 존재하는 아이디입니다.</Text>
          </View>
          <Text style={styles.formText}>비밀번호</Text>
          <View style={styles.inputContainer}>
            <TextInput 
            style={styles.inputText} 
            secureTextEntry
            value={password}
            onChangeText={(text: React.SetStateAction<string>) => setPassword(text)} />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleRegister} style={styles.nextButton}>
            <Text style={styles.buttonText}>다음</Text>
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
  roundGreen: {
    backgroundColor: '#98DC63',
    borderRadius: 50,
    width: 18,
    height: 18,
    marginLeft: 25,
    marginRight: 25,
  },
  roundGray: {
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
    marginBottom: 60,
  },
  formArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
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
  nextButton: {
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
    marginTop: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default InputUserInfoPage;
