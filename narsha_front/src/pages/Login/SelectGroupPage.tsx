import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import PlusButton from "../../components/PlusButton";
import GroupButton from "../../components/GroupButton";
import CustomButton from "../../components/CustomButton";

const SelectGroupPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>그룹을 선택하세요</Text>
                <PlusButton />
            </View>

            <View style={styles.groupArea}>
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/> 
                <GroupButton title="그룹명"/>     
            </View>

            <View style={styles.btnArea}>
                
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
        marginTop: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 24,
        color: "#35562F",
        fontWeight: "bold",
    },
    groupArea: {
        padding: 5
    },
    btnArea: {
        
    }

    
})


export default SelectGroupPage;