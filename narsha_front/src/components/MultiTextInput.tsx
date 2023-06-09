import React from "react";
import { StyleSheet, TextInput, View } from 'react-native';



const MultiTextInput = ({...otherProps}) => {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.inputText}
                multiline={true}
                {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        marginBottom: 20,
        elevation: 5,
    },
    inputText: {
        width: 250,
        height: 250,
        fontSize: 14,
        marginLeft: 10,
        textAlignVertical: 'top',
    },
})



export default MultiTextInput;