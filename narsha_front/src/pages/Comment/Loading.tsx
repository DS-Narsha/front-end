import React,  {useState} from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';

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
                <View  style={styles.modalTextArea}>
                    <Text style={styles.modalText}>댓글에 부적절한 내용이 있는지 확인하고 있어요!</Text>
                    <Text style={styles.modalText}>잠시만 기다려주세요.</Text>
                </View>
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
    },
    btnText: {
        fontSize: 20,
        color: "#000000",
        fontWeight: "500"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: "rgba(150, 150, 150, 0.5)"
    },
    modalView: {
        bottom: 40,
        backgroundColor: 'white',
        width: "85%",
        flexDirection: "row",
        borderRadius: 20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15,
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
    modalText: {
        marginBottom: 3,
        textAlign: 'center',
        color: 'black',
        fontSize: 13,
    },
    modalTextArea: {
        marginLeft: 13,
        justifyContent: "center",
        alignItems: "flex-start",
    }
})


export default Loading;