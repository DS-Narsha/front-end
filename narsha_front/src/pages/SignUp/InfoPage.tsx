import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import ArraowSvg from "../../assets/arrow.svg";
import RoundButton from "../../components/RoundButton";
import MyTextInput from "../../components/MyTextInput";
import CustomButton from "../../components/CustomButton";

// 이름, 닉네임, 아이디, 비밀번호와 같은 정보 입력하는 페이지
// 아이디 중복확인 부분 아직 구현 안 함

const InfoPage = () => {
    return (
      <View style={styles.container}>
        <ArraowSvg />
        <View style={styles.content}>
            <View style={styles.roundBtnContainer}>
                <RoundButton step="2"/>
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
                <MyTextInput />
                <Text style={styles.formText}>비밀번호</Text>
                <MyTextInput />
            </View>
            <View>
                <CustomButton title="다음"/>
            </View>
        </View>
      </View>          
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCFDE1",
        height: "100%",
        padding: 20
    },
    content: {
        padding: 25,
    },
    roundBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30
    },
    textArea: {
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
        marginBottom: 50
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
    }
})


export default InfoPage;