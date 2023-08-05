import React , { useState }from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    Alert,
    TextInput
} from 'react-native';
import BackSvg from "../../../assets/back.svg";
import MyTextInput from "../../../components/MyTextInput";
import CustomButton from "../../../components/CustomButton";
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 사용자_그룹 코드 입력하는 페이지

//@ts-ignore
const InputGroupPage = ( {navigation, route} ) => {

    // userId
    const { res } = route.params;
    const[groupCode, setGroupCode] = useState('')

    const groupMutation = useMutation(async () => {
        const response = await fetch(`http://localhost:8080/api/user/join`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: res.userId,
            groupCode,
          }),
        })
    
        const data = await response.json();
        return data;
    
    })

    const handleGroup = async () => {
        try {
          const data = await groupMutation.mutateAsync();
          
          if(data.status === 200) {
            navigation.navigate('SignUp', { userId: res.userId, userType: 'student' }); // userType 값을 함께 전달
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
                    onChangeText={(text: React.SetStateAction<string>) => setGroupCode(text)}
                    />
                </View>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.text}>선생님이 알려주신 그룹 코드를 입력하면</Text>
                <Text style={styles.text}>반 친구들과 SNS에서</Text>
                <Text style={styles.text}>나의 이야기를 공유할 수 있어요!</Text>
            </View>
            <View>
                <TouchableOpacity onPress={handleGroup} style={styles.nextButton}>
                    <Text style={styles.buttonText}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>          
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
        marginBottom: 160
    },
    title: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
    },
    formArea: {
        justifyContent: "center",
        alignItems: "center",
    },
    formText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#000000",
    },
    text: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "400",
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#C0C0C0',
        width: '100%',
        height: 48,
        marginBottom: 20,
        marginTop: 10
      },
      inputText: {
        fontSize: 14,
        marginLeft: 10,
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
      },
})


export default InputGroupPage;