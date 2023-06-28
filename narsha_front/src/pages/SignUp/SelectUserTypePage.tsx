import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import BackSvg from '../../assets/back.svg';
import TeacherSvg from '../../assets/teacher.svg';
import StudentSvg from '../../assets/student.svg';

// 선생님/학생 사용자 타입을 선택하는 페이지


//@ts-ignore
const UserPage = ({navigation}) => {
  const [modalTVisible, setModalTVisible] = useState(false);
  const [modalSVisible, setModalSVisible] = useState(false);

// InputUserInfoPage 이동 시 타입까지 전달
const navigateToUserInfo = (userType: any) => {
  navigation.navigate('InputUserInfoPage', {userType});
};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <BackSvg />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.roundBtnContainer}>
          <Text style={styles.roundGreen}></Text>
          <Text style={styles.roundGray}></Text>
          <Text style={styles.roundGray}></Text>
        </View>
        <View style={styles.textArea}>
          <Text style={styles.textTitle}>회원가입</Text>
          <Text style={styles.textBody}>사용자를 선택하세요.</Text>
        </View>
        {/* 모달창 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTVisible}
          onRequestClose={() => {
            setModalTVisible(!modalTVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitleArea}>
                <Text style={styles.modalTitleText}>선생님</Text>
              </View>
              <Text style={styles.modalText}>학생들의 SNS 활동을 확인하고</Text>
              <Text style={styles.modalText}>관리할 수 있습니다.</Text>
              <Text style={styles.modalText}>
                SNS 교육을 핀즈와 함께 체험해보세요!
              </Text>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  setModalTVisible(!modalTVisible);
                  navigateToUserInfo('teacher');
                }}>
                <Text style={styles.textStyle}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSVisible}
          onRequestClose={() => {
            setModalSVisible(!modalSVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalTitleArea}>
                <Text style={styles.modalTitleText}>학생</Text>
              </View>
              <Text style={styles.modalText}>
                반 친구들과 SNS 활동을 체험할 수 있습니다!
              </Text>
              <Text style={styles.modalText}>
                활동을 통해 SNS를 하면서 지켜야 할
              </Text>
              <Text style={styles.modalText}>
                기본적인 에티켓을 배울 수 있습니다.
              </Text>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  setModalSVisible(!modalSVisible);
                  navigateToUserInfo('student');
                }}>
                <Text style={styles.textStyle}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <TouchableOpacity onPress={() => setModalTVisible(true)}>
            <View style={styles.teacherBtn}>
              <TeacherSvg />
              <Text style={styles.btnText}>선생님</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalSVisible(true)}>
            <View style={styles.studentBtn}>
              <StudentSvg />
              <Text style={styles.btnText}>학생</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 20,
  },
  content: {
    padding: 20,
  },
  roundBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 15,
  },
  roundGreen: {
    backgroundColor: '#98DC63',
    borderRadius: 50,
    width: 18,
    height: 18,
    marginLeft: 25,
    marginRight: 25,
  },
  roundGray: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    width: 18,
    height: 18,
    marginLeft: 25,
    marginRight: 25,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 28,
    color: '#35562F',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textBody: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 110,
  },
  teacherBtn: {
    backgroundColor: '#E3F1A9',
    borderRadius: 30,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  btnText: {
    fontSize: 24,
    fontWeight: '900',
    marginTop: 5,
  },
  studentBtn: {
    backgroundColor: '#F9FAC8',
    borderRadius: 30,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalTitleArea: {
    backgroundColor: '#AADF98',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
    width: '121%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitleText: {
    color: 'black',
    fontSize: 18,
  },
  modalView: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#AADF98',
    width: 125,
    marginTop: 20,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 2,
  },
  modalText: {
    marginBottom: 3,
    textAlign: 'center',
    color: 'black',
  },
});

export default UserPage;
