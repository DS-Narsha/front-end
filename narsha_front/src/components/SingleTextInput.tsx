import React from "react";
import {
    StyleSheet,
    TextInput, 
    View,
} from 'react-native';

// 공지작성 페이지 제목 텍스트 입력 받는 창

const SingleTextInput = ({...otherProps}) => {
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
        width: '100%',
        height: 48,
        marginBottom: 20,
        elevation: 5,
    },
    inputText: {
        fontSize: 14,
        marginLeft: 10,
    },
})



export default SingleTextInput;