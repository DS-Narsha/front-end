import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

//@ts-ignore
const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (userId == '') {
      Alert.alert('아이디를 입력해주세요.');
      return;
    } else if (password == '') {
      Alert.alert('비밀번호를 입력해주세요.');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>로그인</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.formArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="아이디"
              value={userId}
              onChangeText={(text: React.SetStateAction<string>) =>
                setUserId(text)
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              placeholder="비밀번호"
              value={password}
              onChangeText={(text: React.SetStateAction<string>) =>
                setPassword(text)
              }
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.textContent}>뭉게뭉게 회원이 아니신가요?</Text>
          <TouchableOpacity>
            <Text style={styles.textContent}>회원가입 하기</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnText}>확인!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 25,
  },
  content: {
    padding: 5,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logoText: {
    fontSize: 26,
    marginTop: 30,
    marginBottom: 25,
    color: '#35562F',
    fontWeight: 'bold',
    fontFamily: 'NanumSquareB',
  },
  formArea: {
    marginTop: 40,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 110,
  },
  textContent: {
    fontFamily: 'NanumSquareR',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    width: '100%',
    height: 48,
    marginBottom: 35,
  },
  inputText: {
    fontSize: 14,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#AADF98',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'NanumSquareB',
  },
});

export default LoginPage;
