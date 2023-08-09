import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, ImageBackground} from 'react-native';
import InitialProfileImage from '../../assets/initial-profile-image.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function StudentListModal({ item }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const length = item.profileImage.length;
  const profileImage = item.profileImage.substring(0,length);

  return (
    <View style={styles.container}>
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
              <Text style={styles.btnText}>{item.userName}</Text>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.modalText}>
                <Text style={styles.strongText}>아이디</Text>
                <Text style={styles.content}>{item.userId}</Text>
              </View>
              <View style={styles.modalText}>
                <Text style={styles.strongText}>비밀번호</Text>
                <Text style={styles.content}>{item.password}</Text>
              </View>
              <View style={styles.modalText}>
                <Text style={styles.strongText}>생일</Text>
                <Text style={styles.content}>{item.birth}</Text>
              </View>
            </View>
            <View style={styles.modalEnd}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.btn}>
                  <Text style={styles.strongText}>확인</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.studentContentContainer}>
          <View>
            <ImageBackground
              source={{ uri: profileImage }}
              style={[styles.img]}
              imageStyle={{ borderRadius: 10 }} />
          </View>
          <View>
            <View style={styles.textcontainer}>
              <Text style={styles.strongText}>{item.userName}</Text>
            </View>
            <View style={styles.textcontainer}>
              <Text style={styles.nickname}>{item.nikname}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalView: {
    margin: 20,
    width: '68%',
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
  modalHead: {
    flex: 0.8,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#AADF98',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    flex: 2,
    width: '100%',
    alignItems: 'flex-start',
  },
  modalEnd: {
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
  btn: {
    backgroundColor: '#AADF98',
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  btnText: {
    fontFamily: 'NanumSquareB',
    color: '#000000',
    fontSize: 15,
    fontWeight: '300',
  },
  container: {
    margin: 10,
    width: 350,
    height: 70,
    backgroundColor: '#F9FAC8',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentContentContainer: {
    margin: 10,
    width: 350,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textcontainer: {
    marginHorizontal: 10,
  },
  strongText: {
    fontFamily: 'NanumSquareB',
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
    paddingBottom: 2,
  },
  nickname: {
    fontSize: 12,
    color: '#909090',
  },
  content: {
    fontFamily: 'NanumSquareR',
    marginLeft: 10,
    fontSize: 14,
    color: '#909090',
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
});
