import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import TeacherButton from "../../components/TeacherButton";
import StudentButton from "../../components/StudentButton";
import RoundButton from "../../components/RoundButton";
import ArraowSvg from "../../assets/arrow.svg";

// 선생님/학생 사용자 타입을 선택하는 페이지
// 모달창 구현해야 함

const UserPage = () => {
    return (
      <View style={styles.container}>
        <ArraowSvg />
        <View style={styles.content}>
            <View style={styles.roundBtnContainer}>
                <RoundButton step="1"/>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.text1}>회원가입</Text>
                <Text style={styles.text2}>사용자를 선택하세요.</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <TeacherButton title="선생님"/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <StudentButton title="학생" />
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
        padding: 20
    },
    content: {
        padding: 20
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
    text1: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
        marginBottom: 10
    },
    text2: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 110
    },
    
})


export default UserPage;