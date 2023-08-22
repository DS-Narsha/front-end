import React , { useState } from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    BackHandler,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import BackSvg from "../../../assets/back.svg";
import MyTextInput from "../../../components/MyTextInput";
import CustomButton from "../../../components/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { useFocusEffect } from "@react-navigation/native";

// 관리자_그룹 만들기 페이지

//@ts-ignore
const GroupPage = ({navigation, route}) => {

    const { res } = route.params;

    const[schoolName, setSchoolName] = useState('');
    const[groupName, setGroupName] = useState('');
    const[grade, setGrade] = useState('');
    const[groupClass, setGroupClass] = useState('');
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

    const groupMutation = useMutation(async () => {
        const response = await fetch(`http://localhost:8080/api/group/create`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            groupName,
            userId: res.userId,
            school: schoolName,
            grade,
            group_class: groupClass
          }),
        })
    
        const data = await response.json();
        return data;
    
    })

    const handleGroup = async () => {
      if (schoolName && groupName && grade && groupClass) {
        try {
          const data = await groupMutation.mutateAsync();
          if(data.status === 200) {
            const userId = data.data;
            console.log(userId);
            navigation.navigate('SignUp', { userType: 'teacher', userId });
          } else {
            console.log(data.message);
            Alert.alert('그룹 생성 실패', data.message);
          }
        } catch (error) {
          console.log(error);
          Alert.alert('오류', '그룹 생성 중 오류가 발생했습니다.');
        }
      } else {
        Alert.alert('누락된 정보', '모든 정보를 입력해주세요');
      }
    };

    const keyboardBehavior =
    Platform.OS === 'ios' ? 'padding' : Platform.OS === 'android' ? 'height' : 'height';


    return (
      <KeyboardAvoidingView 
      behavior={keyboardBehavior}
      style={styles.container}>
        <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
            <View style={styles.roundBtnContainer}>
                <Text style={styles.roundGreen}></Text>
                <Text style={styles.roundGreen}></Text>
                <Text style={styles.roundGreen}></Text>
            </View>
            
            <View style={styles.textArea}>
                <Text style={styles.textTitle}>학교명과 그룹 이름을</Text>
                <Text style={styles.textBody}>입력하세요.</Text>
            </View>
            <View style={styles.formArea}>
                <Text style={styles.formText}>학교명</Text>
                <View style={styles.inputContainer}>
                <TextInput
                style={styles.inputText}  
                value={schoolName}
                onChangeText={(text: React.SetStateAction<string>) => setSchoolName(text)} />
                </View>
                <Text style={styles.formText}>그룹 이름</Text>
                <View style={styles.inputContainer}>
                <TextInput 
                style={styles.inputText} 
                value={groupName}
                onChangeText={(text: React.SetStateAction<string>) => setGroupName(text)} />
                </View>
                <Text style={styles.classTitle}>학년/반</Text>
                <View style={styles.classForm}>
                    <Text style={styles.classText}>학년</Text>
                    <View style={styles.inputContainer}>
                    <TextInput 
                    style={styles.inputText} 
                    value={grade}
                    onChangeText={(text: React.SetStateAction<string>) => setGrade(text)} />
                    </View>
                </View>
                <View style={styles.classForm}>
                    <Text style={styles.classText}>  반  </Text>
                    <View style={styles.inputContainer}>
                    <TextInput 
                    style={styles.inputText} 
                    value={groupClass}
                    onChangeText={(text: React.SetStateAction<string>) => setGroupClass(text)} />
                    </View>
                </View>
            </View>
            <View>
                <TouchableOpacity  onPress={handleGroup} style={styles.nextButton}>
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
              <Text style={styles.modalText}>그룹 정보가 저장되지 않습니다.</Text>

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
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCFDE1",
        height: "100%",
        padding: 25
    },
    content: {
      padding: 5
    },
    roundBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30,
        marginTop: 50
    },
    roundGreen: {
        backgroundColor: "#98DC63",
        borderRadius: 50,
        width: 18,
        height: 18,
        marginLeft: 25,
        marginRight: 25
    },
    textArea: {
        justifyContent: "center",
        alignItems: "center",
    },
    textTitle: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
        fontFamily: 'NanumSquareB',
    },
    textBody: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
        marginBottom: 35,
        fontFamily: 'NanumSquareB',
    },
    formArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    formText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        fontFamily: 'NanumSquareR',
    },
    classTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: 'NanumSquareR',
    },
    classForm: {
        flexDirection: "row",
        width: "100%",
        paddingRight: 85,
        paddingLeft: 30
    }, 
    classText: {
        fontSize: 16,
        fontWeight: "bold",
        paddingRight: 30,
        paddingTop:10,
        fontFamily: 'NanumSquareR',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#C0C0C0',
        width: '100%',
        height: 48,
        marginBottom: 22,
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
})


export default GroupPage;