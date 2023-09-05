import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import SingleTextInput from '../components/SingleTextInput';
import MultiTextInput from '../components/MultiTextInput';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {ScrollView} from 'react-native-gesture-handler';
import Config from 'react-native-config';

type UserData = {
  userId: string;
  groupCode: string;
};

// 공지 작성 페이지

export default function NoticeWritePage({navigation}: any) {
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  const userId = userData.userId;
  const groupCode = userData.groupCode;

  const createNotice = useMutation(async () => {
    try {
      const res = await fetch(`http://${Config.HOST_NAME}/api/notice/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupCode: groupCode,
          noticeTitle: textTitle,
          noticeContent: textContent,
          writer: userId,
        }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  const uploadNotice = async () => {
    try {
      const data = await createNotice.mutateAsync();

      queryClient.setQueryData(['noticeTitle'], textTitle);
      queryClient.setQueryData(['noticeContent'], textContent);

      if (data.status === 200) {
        setModalVisible(!modalVisible);
        navigation.reset({routes: [{name: 'Main'}]});
      } else {
        console.log(data.message);
        Alert.alert('공지 등록 실패', data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '공지 등록 중 오류가 발생했습니다.');
    }
  };

  const [textTitle, setTextTitle] = useState('');
  const [textContent, setTextContent] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{backgroundColor: '#FCFDE1'}}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}>
        <View style={styles.container}>
          <View style={styles.writingNoticeContainer}>
            <View style={styles.titlecontainer}>
              <Text style={styles.title}>공지 제목</Text>
            </View>
            <View style={styles.textinput}>
              <View style={styles.titleTextContainer}>
                <TextInput
                  style={styles.titleInputText}
                  value={textTitle}
                  onChangeText={setTextTitle}
                />
              </View>
            </View>
            <View style={styles.titlecontainer}>
              <Text style={styles.title}>공지 내용</Text>
            </View>
            <View style={styles.textinput}>
              <View style={styles.contentTextContainer}>
                <TextInput
                  style={styles.contentInputText}
                  multiline={true}
                  value={textContent}
                  onChangeText={setTextContent}
                />
              </View>
            </View>
          </View>

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
                  <Text style={styles.btnText}>알림</Text>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.modalText}>
                    <Text style={styles.contentText}>
                      공지는 등록 후 삭제가 불가능 합니다.
                    </Text>
                    <Text style={styles.contentText}>
                      정말로 공지를 등록하시겠습니까?
                    </Text>
                  </View>
                </View>
                <View style={styles.modalEnd}>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.btn}>
                      <Text style={styles.strongText}>취소</Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={uploadNotice}>
                    <View style={styles.btn}>
                      <Text style={styles.strongText}>공지 올리기</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Pressable onPress={() => setModalVisible(true)}>
            <View style={styles.updatebtn}>
              <Text style={styles.btntitle}>공지 올리기</Text>
            </View>
          </Pressable>

          {/* <TouchableOpacity onPress={uploadNotice}>
            
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDE1',
    flexDirection: 'column',
    alignItems: 'center',
  },
  writingNoticeContainer: {
    marginTop: 45,
  },
  textinput: {
    width: 350,
    margin: 10,
  },
  title: {
    fontFamily: 'NanumSquareB',
    fontWeight: '200',
    fontSize: 15,
    color: '#000000',
  },
  titlecontainer: {
    marginHorizontal: 20,
  },
  updatebtn: {
    backgroundColor: '#AADF98',
    height: 51,
    width: 195,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  btntitle: {
    fontFamily: 'NanumSquareB',
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  titleTextContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '100%',
    height: 48,
    marginBottom: 20,
    elevation: 5,
  },
  titleInputText: {
    fontSize: 14,
    marginLeft: 10,
  },
  contentTextContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 30,
    elevation: 5,
  },
  contentInputText: {
    width: 250,
    height: 250,
    fontSize: 14,
    marginLeft: 10,
    textAlignVertical: 'top',
  },
  content: {
    padding: 30,
  },

  //모달
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalView: {
    margin: 20,
    width: '68%',
    height: 160,
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
    flex: 1.5,
    width: '100%',
    alignItems: 'center', //'flex-start',
  },
  modalEnd: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalText: {
    alignItems: 'center',
    // flexDirection: 'row',
    // marginLeft: 20,
    marginTop: 20,
  },
  strongText: {
    fontFamily: 'NanumSquareB',
    fontSize: 13,
    fontWeight: '200',
    color: '#000000',
  },
  btnText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  btn: {
    backgroundColor: '#AADF98',
    height: 30,
    width: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  contentText: {
    fontFamily: 'NanumSquareR',
    fontSize: 13,
    color: '#000000',
    marginBottom: 3,
  },
});
