import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BackSvg from '../../assets/back.svg';
import { useFocusEffect } from '@react-navigation/native';

// 이름, 닉네임, 아이디, 비밀번호와 같은 정보 입력하는 페이지
// 뒤로가기 못하게

//@ts-ignore
const InputUserInfoPage = ({navigation, route}) => {

  const [isModalVisible, setModalVisible] = useState(false);
  
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // 특정 페이지에서 뒤로가기 막기
        setModalVisible(true); // 모달 창 표시
        return true; // 뒤로가기 막기
      };
  
      // 뒤로가기 이벤트 리스너 추가
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
      // useFocusEffect의 클린업 함수로서, 화면이 focus를 잃었을 때 실행
      return () => {
        // 뒤로가기 이벤트 리스너 제거
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  // 사용자 타입
  const userType = route.params?.userType;

  const[username, setUsername] = useState('');
  const[userId, setUserId] = useState('');
  const[password, setPassword] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(false); // 중복 여부 상태

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
    if (username && userId && password) {
      if (isIdAvailable) {
        try {
          const data = await registerMutation.mutateAsync();

          if (data.status === 200) {
            // 회원가입 성공시 캐시에 로그인 성공을 저장
            queryClient.setQueryData(['isLoggedIn'], true);
            // userType에 따라 그룹 생성 / 입력 페이지로 이동
            if (userType === 'teacher') {
              navigation.navigate('Group', { res: data.data });
            } else if (userType === 'student') {
              navigation.navigate('InputGroup', { res: data.data });
            }
          } else {
            console.log(data.message);
            Alert.alert('회원가입 실패', data.message);
          }
        } catch (error) {
          console.log(error);
          Alert.alert('오류', '회원가입 중 오류가 발생했습니다.');
        }
      } else {
        Alert.alert('중복된 아이디', '아이디를 다시 입력해주세요');
      }
    } else {
      Alert.alert('누락된 정보', '모든 정보를 입력해주세요');
    }
  };

  const handleCheckAvailability = async () => {
    try {
      console.log("check")
      const response = await fetch(`http://localhost:8080/api/user/check-userId?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

      const data = await response.json();

      if (data.status === 200) {
        setIsIdAvailable(true);
        } else {
        setIsIdAvailable(false);
        }
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '중복 확인 중 오류가 발생했습니다.');
    }
  };

  const keyboardBehavior =
    Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : 'height';

  return (
    <KeyboardAvoidingView behavior={keyboardBehavior}
    style={styles.container}>
      <ScrollView 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
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
          <View style={styles.inputContainerID}>
            <TextInput 
            style={styles.inputText} 
            value={userId}
            onChangeText={(text: React.SetStateAction<string>) => setUserId(text)} />
            <TouchableOpacity style={styles.checkButton} onPress={handleCheckAvailability}>
              <Text style={styles.checkButtonText}>중복 확인</Text>
            </TouchableOpacity>
          </View>
          {!isIdAvailable && (
            <Text style={styles.warningText}>* 이미 존재하는 아이디입니다.</Text>
          )}
          {isIdAvailable && (
            <Text style={styles.passText}>* 사용 가능한 아이디입니다.</Text>
          )}
          <Text style={styles.formText}>비밀번호</Text>
          <View style={styles.inputContainer}>
            <TextInput 
            style={{ ...styles.inputText, fontFamily: undefined }}
            value={password}
            secureTextEntry
            onChangeText={(text: React.SetStateAction<string>) => setPassword(text)} />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={handleRegister} style={styles.nextButton}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 모달 컴포넌트 */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitleArea}>
                <Text style={styles.modalTitleText}>앱 종료</Text>
              </View>

              <Text style={styles.modalText}>정말로 앱을 종료하시겠습니까?</Text>
              <Text style={styles.modalText}>회원 정보가 저장되지 않습니다.</Text>

              <View style={styles.modalButtonContainer}>
              <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                BackHandler.exitApp();
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>종료</Text>
            </TouchableOpacity>
            </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>

      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 25,
    
  },
  content: {
    padding: 5
  },
  roundBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 50,
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
    fontFamily: 'NanumSquareB',
  },
  formArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 55,
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
  inputContainerID: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    width: '100%',
    height: 48,
    marginBottom: 6,

  },
  inputText: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'NanumSquareR',
  },
  checkButton: {
    position: 'absolute',
    top: 8,
    right: 3,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    
  },
  checkButtonText: {
    fontSize: 13,
    color: '#000000',
    fontFamily: 'NanumSquareR',
  },
  warningText: {
    marginRight: 170,
    marginTop: 2,
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 45,
    fontFamily: 'NanumSquareR',
  },
  passText: {
    marginRight: 170,
    marginTop: 2,
    color: '#0000FF',
    fontSize: 12,
    marginBottom: 45,
    fontFamily: 'NanumSquareR',
  },
  nextButton: {
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
    marginBottom: 7
  },
  buttonText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'NanumSquareB',
  },

  modalText: {
    marginBottom: 8,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'NanumSquareR',
    fontSize: 16
  },
  modalButtonContainer: {
    flexDirection: 'row', 
    marginTop: 5, 
    width: '90%',
    justifyContent: 'space-between', // 버튼 사이의 간격 균등 분할
  },
  modalButton: {
    backgroundColor: '#AADF98',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    width: '46%',
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'black',
    fontFamily: 'NanumSquareB',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalTitleArea: {
    backgroundColor: '#AADF98',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
    width: '121%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitleText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'NanumSquareB'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default InputUserInfoPage;
