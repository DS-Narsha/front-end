import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import ArraowSvg from "../../../assets/arrow.svg";
import RoundButton from "../../../components/RoundButton";
import MyTextInput from "../../../components/MyTextInput";
import CustomButton from "../../../components/CustomButton";

// 사용자_그룹 코드 입력하는 페이지

const InputGroupPage = () => {
    return (
      <View style={styles.container}>
        <ArraowSvg />
        <View style={styles.content}>
            <View style={styles.roundBtnContainer}>
                <RoundButton step="3"/>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.text}>그룹코드를 입력해주세요.</Text>
            </View>

            <View style={styles.formArea}>
                <Text style={styles.formText}>그룹 코드</Text>
                <MyTextInput />
            </View>
            <View style={styles.textArea}>
                <Text>선생님이 알려주신 그룹 코드를 입력하면</Text>
                <Text>반 친구들과 SNS에서</Text>
                <Text>나의 이야기를 공유할 수 있어요!</Text>
                </View>
            <View>
                <CustomButton title="다음"/>
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
        padding: 25,
    },
    roundBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 20
    },
    textArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 170
    },
    text: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
    },
    formArea: {
        justifyContent: "center",
        alignItems: "center",
    },
    formText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    
})


export default InputGroupPage;