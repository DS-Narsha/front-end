import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import images from '../assets/images.jpeg';

const SingleBadge = props => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHead}>
                        <Text style={styles.btnText}>{props.name}</Text>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.strongText}>업적 달성 내용</Text>
                        </View>

                        <View style={styles.modalEnd}>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <View style={styles.btn}>
                            <Text style={styles.strongText}>확인</Text>
                            </View>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Pressable onPress={() => setModalVisible(true)}>
                <Image source={images} style={styles.img} />
                <Text style={{ textAlign:'center', fontSize:14, color:props.success?"black":"#909090"}}>{props.name}</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    img: {
        borderRadius: 10,
        width: 100,
        height: 100,
        margin:10,
    },
    text:{
        textAlign:'center', 
        fontSize:14
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: "68%",
        height: 220,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHead:{
        flex: 0.8,
        width: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
        backgroundColor: '#AADF98',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBody:{
        flex: 2,
        width: "100%",
        alignItems: "center",
        justifyContent:"center"
    },
    modalEnd:{
        flex: 0.8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    modalText: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
    },
    btn:{
        backgroundColor: '#AADF98',
        height: 30,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },
    btnText:{
        color: '#000000',
        fontSize: 15,
        fontWeight: '200',
    },
    container:{
        margin: 10,
        width: 350,
        height: 70,
        backgroundColor: "#F9FAC8",
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    strongText:{
        fontSize: 14,
        fontWeight: '200',
        color: '#000000',
    },
});

export default SingleBadge;