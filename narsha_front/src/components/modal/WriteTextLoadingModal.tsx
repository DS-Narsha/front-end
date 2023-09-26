import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";


export default function WriteTextLoadingModal({loadingModalVisible}:any) {

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={loadingModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalBody}>
              <ActivityIndicator
                size="large"
                color="#98DC63"
                style={styles.modalIcon}
              />
              <View style={styles.modalText}>
                <Text style={styles.strongText}>
                  게시글에 부적절한 내용이 있는지 확인 중이에요!
                  {'\n'}잠시만 기다려주세요.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalView: {
    display: 'flex',
    margin: 20,
    width: '90%',
    height: 80,
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
  modalBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalIcon: {
    marginRight: 15,
  },
  modalText: {
    flexDirection: 'row',
    flex: 1,
    fontFamily: 'NanumSquareR',
  },
  strongText: {
    fontSize: 13,
    fontWeight: '200',
    color: '#000000',
    fontFamily: 'NanumSquareR',
  },
})