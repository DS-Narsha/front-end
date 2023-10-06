import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Check from '../../assets/ic-check.svg';


export default function CopySuccessModal({copyModalVisible}:any) {

  return(
    <Modal
        animationType="fade"
        transparent={true}
        visible={copyModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalBody}>
              <Check style={styles.modalIcon} />
              <View style={styles.modalText}>
                <Text style={styles.strongText}>
                  복사가 완료되었습니다.
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
    height: 60,
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