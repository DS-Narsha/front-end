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
} from 'react-native';
import BackSvg from "../../../assets/back.svg";
import MyTextInput from "../../../components/MyTextInput";
import CustomButton from "../../../components/CustomButton";
import { useMutation } from "@tanstack/react-query";

// 관리자_그룹 만들기 페이지

//@ts-ignore
const GroupPage = ({navigation, route}) => {

    const { res } = route.params;

    const[schoolName, setSchoolName] = useState('');
    const[groupName, setGroupName] = useState('');
    const[grade, setGrade] = useState('');
    const[groupClass, setGroupClass] = useState('');

    const groupMutation = useMutation(async () => {
        const response = await fetch(`http://localhost:8080/api/group/create`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            groupName,
            userId: res,
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
          console.log(res);
          if(data.message === "그룹 생성 성공") {
            navigation.navigate('SignUp', { userType: 'teacher', userGroupId: data['user-groupId'] });
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
      </KeyboardAvoidingView>        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCFDE1",
        height: "100%",
        padding: 20
    },
    content: {
        padding: 20,
    },
    roundBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30,
        marginTop: 30
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
    },
    textBody: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
        marginBottom: 60 
    },
    formArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    formText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    classTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20
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
        paddingTop:10
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
      },
      buttonText: {
        fontSize: 18,
        color: '#000000',
      },
})


export default GroupPage;