import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import GroupButton from "../../components/GroupButton";

const SelectGroupPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>그룹을 선택하세요</Text>
                <TouchableOpacity>
                    <View style={styles.plusBtn}>
                        <Text style={styles.plusText}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.groupArea}>
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/>     
            </View>

            <View style={styles.btnArea}>
                <TouchableOpacity>
                    <View style={styles.selectBtn}>
                        <Text style={styles.btnText}>선택</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.cancelBtn}>
                        <Text style={styles.btnText}>취소</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCFDE1",
        height: "100%",
        padding: 25
    },
    titleArea: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 30
    },
    title: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
    },
    plusBtn: {
        backgroundColor: "#AADF98",
        borderRadius: 13,
        height: 42,
        width: 42,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 11,
        marginTop: 3
    },
    plusText: {
        fontSize: 30,
        color: "#ffffff",
    },
    groupArea: {
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8
    },
    btnArea: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    selectBtn: {
        backgroundColor: "#AADF98",
        height: 55,
        width: 130,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 6,
        borderRadius: 20,
        marginRight: 40
    },
    cancelBtn: {
        backgroundColor: "#D9D9D9",
        height: 55,
        width: 130,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 6,
        borderRadius: 20,
    },
    btnText: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "500"
    }

    
})


export default SelectGroupPage;