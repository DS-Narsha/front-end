import React from "react";
import {
    StyleSheet,
    TextInput, 
    View,
} from 'react-native';

// 텍스트 입력 받는 창(아이디는 제외, 비밀번호 등등)

const MyTextInput = ({...otherProps}) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputText} {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#C0C0C0",
        width: '100%',
        height: 48,
        marginBottom: 20,
    },
    inputText: {
        fontSize: 14,
        marginLeft: 10,
    },
})



export default MyTextInput;