import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import GroupButton from '../../../components/GroupButton';
import { useMutation, useQuery } from "@tanstack/react-query";

//@ts-ignore
const SelectGroupPage = ({navigation, route}) => {

  const { userId } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [groupList, setGroupList] = useState<{ groupCode: { groupName: string } }[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<{ groupCode: { groupName: string } } | null>(null);

  const fetchGroupList = async () => {
    const response = await fetch(`http://localhost:8080/api/user-group/join-group-list?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setGroupList(data);
  };

  useEffect(() => {
    fetchGroupList();
  }, []);

  const handleGroupClick = (group: { groupCode: { groupName: string } }) => {
    setSelectedGroup(group);
  };

  const handleSelectClick = () => {
    if (selectedGroup) {
      console.log('Selected Group:', selectedGroup.groupCode.groupName);
      // 여기에서 선택된 그룹을 사용하거나 저장하는 로직을 추가할 수 있습니다.
      navigation.navigate('MainNavigator', { selectedGroup });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>그룹을 선택하세요</Text>
        <TouchableOpacity>
          <View style={styles.plusBtn}>
            <Text style={styles.plusText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* 모달창 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleArea}>
              <Text style={styles.modalTitleText}>그룹명</Text>
            </View>
            <Text style={styles.modalText}>그룹명 SNS에 들어가시겠습니따?</Text>
            <View style={styles.modalBtnArea}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleSelectClick();}}>
                <Text style={styles.textStyle}>확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button2]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => {
          setCancelModalVisible(!cancelModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTitleArea}>
              <Text style={styles.modalTitleText}>그룹명</Text>
            </View>
            <Text style={styles.modalText}>
              정말로 그룹이름 삭제하시겠습니까?
            </Text>
            <View style={styles.modalBtnArea}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setCancelModalVisible(!cancelModalVisible)}>
                <Text style={styles.textStyle}>삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button2]}
                onPress={() => setCancelModalVisible(!cancelModalVisible)}>
                <Text style={styles.textStyle}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.groupArea}>
      {groupList && groupList.map((group, index) => (
        <TouchableOpacity
        key={index}
        onPress={() => handleGroupClick(group)}
        style={[
          styles.groupButton,
          selectedGroup?.groupCode.groupName === group.groupCode.groupName && styles.selectedGroupButton,
        ]}
      >
        <GroupButton title={group.groupCode.groupName} />
      </TouchableOpacity>
      ))}
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.selectBtn}>
            <Text style={styles.btnText}>선택</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCancelModalVisible(!cancelModalVisible)}>
          <View style={styles.cancelBtn}>
            <Text style={styles.btnText}>삭제</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 25,
  },
  titleArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#35562F',
    fontWeight: 'bold',
  },
  plusBtn: {
    backgroundColor: '#AADF98',
    borderRadius: 13,
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 11,
    marginTop: 3,
  },
  plusText: {
    fontSize: 30,
    color: '#ffffff',
  },
  groupArea: {
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
  },
  groupButton: {
    height: 100,
    marginBottom: 8,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'transparent',
  },
  selectedGroupButton: {
    borderColor: '#AADF98',
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  selectBtn: {
    backgroundColor: '#AADF98',
    height: 55,
    width: 133,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 6,
    borderRadius: 20,
    marginRight: 35,
  },
  cancelBtn: {
    backgroundColor: '#D9D9D9',
    height: 55,
    width: 133,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 6,
    borderRadius: 20,
  },
  btnText: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalTitleArea: {
    backgroundColor: '#AADF98',
    width: '121%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
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
  modalBtnArea: {
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
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#D9D9D9',
    width: 115,
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

export default SelectGroupPage;
