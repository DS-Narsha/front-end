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

// 관리자_그룹 만들기 페이지

const GroupPage = () => {
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
                <Text style={styles.text1}>학교명과 그룹 이름을</Text>
                <Text style={styles.text2}>입력하세요.</Text>
            </View>
            <View style={styles.formArea}>
                <Text style={styles.formText}>학교명</Text>
                <MyTextInput />
                <Text style={styles.formText}>그룹 이름</Text>
                <MyTextInput />
                <Text style={styles.classTitle}>학년/반</Text>
                <View style={styles.classForm}>
                    <Text style={styles.classText}>학년</Text>
                    <MyTextInput />
                </View>
                <View style={styles.classForm}>
                    <Text style={styles.classText}>  반  </Text>
                    <MyTextInput />
                </View>
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
    },
    text1: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
    },
    text2: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
        marginBottom: 50 
    },
    formArea: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40
    },
    formText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5
    },
    classTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20
    },
    classForm: {
        flexDirection: "row",
        width: "100%",
        paddingRight: 85,
        paddingLeft: 30
    }, 
    classText: {
        fontSize: 16,
        fontWeight: "bold",
        paddingRight: 30,
        paddingTop:10
    },
})


export default GroupPage;