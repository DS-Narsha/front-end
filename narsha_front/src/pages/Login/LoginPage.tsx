import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import MyTextInput from "../../components/MyTextInput";
import AppLogo from "../../assets/image 6.svg";
import CustomButton from "../../components/CustomButton";


const LoginPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <AppLogo />
                <Text style={styles.logoText}>로그인</Text>
            </View>
            <View style={styles.formArea}>
                <MyTextInput placeholder="아이디"/>
                <MyTextInput placeholder="비밀번호"/>
            </View>
            <View style={styles.textArea}>
                <Text>App이름 회원이 아니신가요?</Text>
                <Text>회원가입하기</Text>
            </View>
            <TouchableOpacity onPress={() => console.log("버튼 눌림")}>
                <CustomButton title="로그인" />
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCFDE1",
        height: "100%",
        padding: 25
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    },
    logoText: {
        fontSize: 28,
        marginTop: 30,
        marginBottom: 20
    },
    formArea: {
        marginTop: 40,
        
    },
    textArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 130
    },

    
})


export default LoginPage;