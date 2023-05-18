import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import BackSvg from "../../assets/back.svg";
import TeacherSvg from "../../assets/teacher.svg";
import StudentSvg from "../../assets/student.svg";

// 선생님/학생 사용자 타입을 선택하는 페이지
// 모달창 구현해야 함

const UserPage = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
            <BackSvg />
        </TouchableOpacity>
        <View style={styles.content}>
            <View style={styles.roundBtnContainer}>
                <Text style={styles.round1}></Text>
                <Text style={styles.round2}></Text>
                <Text style={styles.round2}></Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.text1}>회원가입</Text>
                <Text style={styles.text2}>사용자를 선택하세요.</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <View style={styles.teacherBtn}>
                        <TeacherSvg />
                        <Text style={styles.btnText}>선생님</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.studentBtn}>
                        <StudentSvg />
                        <Text style={styles.btnText}>학생</Text>
                    </View>
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
        marginBottom: 30,
        marginTop: 15
    },
    round1: {
        backgroundColor: "#98DC63",
        borderRadius: 50,
        width: 18,
        height: 18,
        marginLeft: 25,
        marginRight: 25
    },
    round2: {
        backgroundColor: "#D9D9D9",
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
    text1: {
        fontSize: 28,
        color: "#35562F",
        fontWeight: "bold",
        marginBottom: 10
    },
    text2: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 110
    },
    teacherBtn: {
        backgroundColor: "#E3F1A9",
        borderRadius: 30,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    btnText: {
        fontSize: 24,
        fontWeight: "900",
        marginTop: 5,
    },
    studentBtn: {
        backgroundColor: "#F9FAC8",
        borderRadius: 30,
        height: 150,
        justifyContent: "center",
        alignItems: "center"
    },
})


export default UserPage;