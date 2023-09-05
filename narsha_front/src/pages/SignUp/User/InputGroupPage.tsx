import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  BackHandler,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import BackSvg from '../../../assets/back.svg';
import MyTextInput from '../../../components/MyTextInput';
import CustomButton from '../../../components/CustomButton';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useFocusEffect} from '@react-navigation/native';
import Config from 'react-native-config';

// 사용자_그룹 코드 입력하는 페이지

//@ts-ignore
const InputGroupPage = ({navigation, route}) => {
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
    }, []),
  );

  // userId
  const {res} = route.params;
  const [groupCode, setGroupCode] = useState('');

  const groupMutation = useMutation(async () => {
    const response = await fetch(`http://${Config.HOST_NAME}/api/user/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: res.userId,
        groupCode,
      }),
    });

    const data = await response.json();
    return data;
  });

  const handleGroup = async () => {
    try {
      const data = await groupMutation.mutateAsync();

      if (data.status === 200) {
        navigation.navigate('SignUp', {
          userId: res.userId,
          userType: 'student',
        }); // userType 값을 함께 전달
      } else {
        console.log(data.message);
        Alert.alert('그룹 가입 실패', data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '그룹 가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.roundBtnContainer}>
          <Text style={styles.roundGreen}></Text>
          <Text style={styles.roundGreen}></Text>
          <Text style={styles.roundGreen}></Text>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.title}>그룹코드를 입력해주세요.</Text>
        </View>

        <View style={styles.formArea}>
          <Text style={styles.formText}>그룹 코드</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputText}
              value={groupCode}
              onChangeText={(text: React.SetStateAction<string>) =>
                setGroupCode(text)
              }
            />
          </View>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.text}>
            선생님이 알려주신 그룹 코드를 입력하면
          </Text>
          <Text style={styles.text}>반 친구들과 SNS에서</Text>
          <Text style={styles.text}>나의 이야기를 공유할 수 있어요!</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleGroup} style={styles.nextButton}>
            <Text style={styles.buttonText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>

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

              <Text style={styles.modalText}>
                아직 그룹에 가입되지 않았습니다.
              </Text>
              <Text style={styles.modalText}>
                정말로 앱을 종료하시겠습니까?
              </Text>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>취소</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    BackHandler.exitApp();
                  }}
                  style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>종료</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 160,
  },
  title: {
    fontSize: 24,
    color: '#35562F',
    fontWeight: 'bold',
    fontFamily: 'NanumSquareB',
  },
  formArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
    fontFamily: 'NanumSquareR',
  },
  text: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'NanumSquareR',
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    width: '100%',
    height: 48,
    marginBottom: 20,
    marginTop: 10,
  },
  inputText: {
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'NanumSquareR',
  },
  nextButton: {
    backgroundColor: '#AADF98',
    borderRadius: 30,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
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
    fontSize: 16,
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
    fontFamily: 'NanumSquareB',
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

export default InputGroupPage;
