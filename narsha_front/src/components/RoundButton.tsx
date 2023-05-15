import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 페이지에 단계를 나타내고 있는 점 컴포넌트
// 색깔을 속성을 받아와 색깔을 변화시키는 것을 구현해야 함

interface Props {
    step: ReactNode;
}

function RoundButton({step} : Props) {
    return(
        <View style={styles.container}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    button: {
        backgroundColor: "#98DC63",
        borderRadius: 50,
        width: 18,
        height: 18,
        marginLeft: 25,
        marginRight: 25
    },
    buttonG: {
        backgroundColor: "#98DC63",
        borderRadius: 50,
        width: 18,
        height: 18,
        marginLeft: 25,
        marginRight: 25
    },
})

export default RoundButton;