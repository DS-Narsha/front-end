import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 초록색 버튼(다음 버튼, 확인 버튼)


function PlusButton() {
    return (
        <View style={styles.button}>
            <Text style={styles.text}>+</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#E3F1A9",
        borderRadius: 13,
        height: 42,
        width: 42,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 11,
        marginTop: 3
    },
    text: {
        fontSize: 30,
        color: "#000000",
    },
})

export default PlusButton;