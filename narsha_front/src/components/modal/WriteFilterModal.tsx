import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function WriteFilterModal({modalVisible}: any) {
  const [filterModalVisible, setFilterModalVisible] = useState(modalVisible);

  useEffect(() => {
    setFilterModalVisible(modalVisible);
  }, [modalVisible]);

  return(
    <Modal
        animationType="fade"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!filterModalVisible);
        }}>
        <View style={styles.filterModalCenteredView}>
          <View style={styles.filterModalView}>
            <View style={styles.filterModalTitleArea}>
              <Text style={styles.filterModalTitleText}>
                여러분들의 게시글을 수정해주세요!
              </Text>
            </View>
            <Text style={styles.filterModalText}>
              기호로 감싸진 글자를 모두 수정해야
            </Text>
            <Text style={styles.filterModalText}>
              SNS에 게시글을 올릴 수 있어요.
            </Text>
            <Text style={styles.filterModalText}>
              여러분의 게시글 내용을 수정해볼까요?
            </Text>

            <View style={styles.filterModalAlertArea}>
              <View style={styles.alertBody}>
                <Text style={styles.alertInfo}>*개인정보*</Text>
                <Text style={styles.alertText}>
                  개인정보, 민간한 정보가 포함되었을 경우
                </Text>
              </View>
              <View style={styles.alertBody}>
                <Text style={styles.alertInfo}>
                  {'{'}욕설{'}'}
                </Text>
                <Text style={styles.alertText}>
                  욕설, 비속어의 말이 포함되었을 경우
                </Text>
              </View>
            </View>
            <View style={styles.filterModalBtnArea}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setFilterModalVisible(false)}>
                <Text style={styles.filterTextStyle}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  filterModalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  filterModalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterModalTitleArea: {
    backgroundColor: '#AADF98',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
    width: '121%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  filterModalTitleText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'NanumSquareB',
  },
  filterModalText: {
    marginBottom: 3,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'NanumSquareR',
  },
  filterModalAlertArea: {
    marginTop: 25,
  },
  alertBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  alertInfo: {
    color: 'black',
    fontSize: 12.5,
    marginLeft: 7,
    paddingBottom: 5,
    fontFamily: 'NanumSquareB',
  },
  alertText: {
    color: 'black',
    fontSize: 12,
    marginLeft: 7,
    paddingBottom: 5,
    fontFamily: 'NanumSquareR',
  },
  filterModalBtnArea: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#AADF98',
    width: 115,
    marginTop: 20,
    marginRight: 15,
  },
  filterTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 2,
    fontFamily: 'NanumSquareB',
  },
})