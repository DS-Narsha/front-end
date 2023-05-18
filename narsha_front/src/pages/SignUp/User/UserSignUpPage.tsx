import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import AppLogo from "../../../assets/app-logo.svg";
import CustomButton from "../../../components/CustomButton";

// 사용자_회원가입 완료 페이지

const UserSignUpPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <AppLogo />
            </View>
            <View style={styles.textArea}>
                <Text style={styles.title}>가입을 완료했습니다!</Text>
            </View>
            <TouchableOpacity>
                <CustomButton title="확인" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCFDE1",
        height: "100%",
        padding: 45
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 75,
        marginBottom: 70
    },
    textArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 220
    },
    title: {
        fontSize: 22,
  
        marginBottom: 18,
        color: "#000000"
    },
})


export default UserSignUpPage;