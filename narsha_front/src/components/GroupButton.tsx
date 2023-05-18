import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 그룹명 버튼

interface Props {
    title: ReactNode;
}

function GroupButton({title}: Props) {
    return (
        <View style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#E3F1A9",
        borderRadius: 30,
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },
    text: {
        fontSize: 24,
        color: "#000000",
        fontWeight: "bold"
    },
})

export default GroupButton;