import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import GroupCode from '../../assets/teacherMenu/groupCode.svg';
import { useQuery } from '@tanstack/react-query';

export default function GroupCodeModal() {
  const getGroupCode = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/user/detail?userId=${narsha1111}`,{
        method:"GET",
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

  const {status, data, error, isLoading} = useQuery({
    queryKey: ["group-code"], 
    queryFn: getGroupCode
  })

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      {!isLoading &&(
      <>
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
              <Text style={styles.modalTitleText}>그룹 코드</Text>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.modalText}>
                <Text style={styles.strongText}>그룹 코드: </Text>
                <Text style={styles.content}>{data.userGroupId.groupCode.groupCode}</Text>
              </View>
            </View>

            <View style={styles.modalEnd}>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.btn}>
                  <Text style={styles.strongText}>닫기</Text>
                </View>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <View>
          <View>
            <GroupCode />
          </View>
        </View>
      </Pressable>
    </View>
      </>
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalView: {
    margin: 20,
    width: '68%',
    height: 130,
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
    flex: 0.8,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  modalEnd: {
    flex: 0.9,
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
  modalTitleText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  container: {
  },
  strongText: {
    fontSize: 14,
    fontWeight: '200',
    color: '#000000',
  },
  content: {
    marginLeft: 10,
    fontSize: 14,
    color: '#909090',
  },
});
