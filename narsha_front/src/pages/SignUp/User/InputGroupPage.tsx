import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import BackSvg from "../../../assets/back.svg";
import MyTextInput from "../../../components/MyTextInput";
import CustomButton from "../../../components/CustomButton";

// 사용자_그룹 코드 입력하는 페이지

const InputGroupPage = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
            <BackSvg />
        </TouchableOpacity>
        <View style={styles.content}>
            <View style={styles.roundBtnContainer}>
                <Text style={styles.round1}></Text>
                <Text style={styles.round1}></Text>
                <Text style={styles.round1}></Text>
            </View>
            <View style={styles.textArea}>
                <Text style={styles.title}>그룹코드를 입력해주세요.</Text>
            </View>

            <View style={styles.formArea}>
                <Text style={styles.formText}>그룹 코드</Text>
                <MyTextInput />
            </View>
            <View style={styles.textArea}>
                <Text style={styles.text}>선생님이 알려주신 그룹 코드를 입력하면</Text>
                <Text style={styles.text}>반 친구들과 SNS에서</Text>
                <Text style={styles.text}>나의 이야기를 공유할 수 있어요!</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <CustomButton title="다음"/>
                </TouchableOpacity>
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
        padding: 20,
    },
    roundBtnContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30,
        marginTop: 15
    },
    round1: {
        backgroundColor: "#98DC63",
        borderRadius: 50,
        width: 18,
        height: 18,
        marginLeft: 25,
        marginRight: 25
    },
    textArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 170
    },
    title: {
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
        marginBottom: 5,
        color: "#000000"
    },
    text: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "400"
    }
})


export default InputGroupPage;