import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import DeleteGroup from '../../assets/teacherMenu/deleteGroup.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AuthStack from '../navigation/AuthStack';

type UserData = {
  userId: string;
  userType: string;
  groupCode: string;
};

export default function GroupCodeModal({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  // queryClient에서 userId와 userType을 가져오는 로직
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  const deleteGroup = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/group/delete?groupCode=${userData.groupCode}`,{
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json();
      return json;
    } catch(err){
      console.log(err);
    }

  }

  const deleteGroupQuery = useQuery({
    queryKey: ["group-delete"], 
    queryFn: deleteGroup,
    enabled: false,
  });  

  const startDeleteGroup = async () => {
    deleteGroupQuery.refetch();
    navigation.reset({
      routes: [{ name: 'AuthStack' }],
    });
    // <AuthStack />
  }

  return (
    <View>
      {/* {!isLoading &&(
      <> */}
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
              <Text style={styles.modalTitleText}>그룹 삭제</Text>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.modalText}>
                <Text style={styles.boldText}>정말로 그룹을 삭제하시겠습니까?</Text>
                <Text style={styles.content}>(그룹을 삭제하면 해당 그룹의 모든 활동</Text>
                <Text style={styles.content}>내역이 삭제되며,</Text>
                <Text style={styles.content}>삭제 후에 복구는 불가능 합니다.)</Text>
              </View>
            </View>

            <View style={styles.modalEnd}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.btn}>
                  <Text style={styles.strongText}>닫기</Text>
                </View>
              </Pressable>
              <Pressable onPress={startDeleteGroup}>
                <View style={styles.btn}>
                  <Text style={styles.strongText}>삭제하기</Text>
                </View>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <View>
          <View>
            <DeleteGroup />
          </View>
        </View>
      </Pressable>
    </View>
      {/* </>
      )} */}
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
    height: 230,
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
    flex: 0.7,
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  modalEnd: {
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalText: {
    fontFamily: 'NanumSquareR',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000000',
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: 20,
  },
  btn: {
    backgroundColor: '#AADF98',
    height: 30,
    width: 100,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  modalTitleText: {
    fontFamily: 'NanumSquareB',
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  container: {
  },
  strongText: {
    fontFamily: 'NanumSquareB',
    fontSize: 14,
    fontWeight: '200',
    color: '#000000',
  },
  content: {
    fontFamily: 'NanumSquareR',
    marginVertical: 2,
    fontSize: 14,
    color: '#909090',
  },
  boldText: {
    fontFamily: 'NanumSquareB',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '200',
    color: '#000000',
  },
});