import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StudentSvg from "../assets/student.svg";

interface Props {
    title: ReactNode;
}

// 사용자 타입을 선택하는 페이지에서의 학생 버튼

function UserButton({title}: Props) {
    return (
        <View style={styles.button}>
            <StudentSvg />
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F9FAC8",
        borderRadius: 30,
        height: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 3
    },
})

export default UserButton;