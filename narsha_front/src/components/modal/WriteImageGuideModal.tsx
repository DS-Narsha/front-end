import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Check from '../../assets/ic-check.svg';


export default function WriteImageGuideModal({guideModalVisible}:any) {

  return(
    <Modal
        animationType="fade"
        transparent={true}
        visible={guideModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalBody}>
              <Check style={styles.modalIcon} />
              <View style={styles.modalText}>
                <Text style={styles.strongText}>
                  이미지에서 여러분의 민감한 정보들을 가리는 과정이 끝났어요!{' '}
                  {'\n'}어떤 이미지가 가려졌는지 확인해볼까요?
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