import React,  {useState} from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import GroupButton from "../../components/GroupButton";

const Loading = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            {/* 모달창 */}
            <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <ActivityIndicator />
                <Text style={styles.modalText}>댓글에 부적절한 내용이 있는지 확인하고 있어요!잠시만 기다려주세요.</Text>
                </View>
                </View>
            </Modal>

            <View style={styles.btnArea}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.selectBtn}>
                        <Text style={styles.btnText}>선택</Text>
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
    btnArea: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    selectBtn: {
        backgroundColor: "#AADF98",
        height: 55,
        width: 133,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 6,
        borderRadius: 20,
        marginRight: 35
    },
    btnText: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "500"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(150, 150, 150, 0.5)"
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        width: "80%",
        flexDirection: "row",
        borderRadius: 20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 25,
        alignItems: 'center',
        justifyContent: "center",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalBtnArea: {
        flexDirection: "row"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#AADF98",
        width: 115,
        marginTop: 20,
        marginRight: 15
    },
    button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#D9D9D9",
        width: 115,
        marginTop: 20
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 2
    },
    modalText: {
        marginBottom: 3,
        textAlign: 'center',
        color: 'black',
        fontSize: 13
    },
    
})


export default Loading;