import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TeacherSvg from "../assets/teacher.svg";

interface Props {
    title: ReactNode;
}

// 사용자 타입을 선택하는 페이지에서의 선생님 버튼

function UserButton({title}: Props) {
    return (
        <View style={styles.button}>
            <TeacherSvg />
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#E3F1A9",
        borderRadius: 30,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 3
    },
})

export default UserButton;