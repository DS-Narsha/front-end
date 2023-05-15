import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 초록색 버튼(다음 버튼, 확인 버튼)

interface Props {
    title: ReactNode;
}

function CustomButton({title}: Props) {
    return (
        <View style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#AADF98",
        borderRadius: 30,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 18
    },
})

export default CustomButton;