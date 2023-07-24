import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, ImageBackground, Modal, PermissionsAndroid, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import EditButton from '../../assets/editButton.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import CameraIcon from '../../assets/ic-camera.svg'

type UserData = {
  userId: string;
  userType: string;
};

//@ts-ignore
export default function EditProfile({navigation}) {
  // queryClient
  const queryClient = useQueryClient();

  // queryClient에서 userId와 userType을 가져오는 로직
  const { data: userData } = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as { data: UserData };

  const getProfileDetail = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/user/detail?userId=${userData.userId}`,{
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

  const updateProfile = async () => {
    try{ 
      let formData = new FormData(); // from-data object
      console.log(profileImgUri)
      formData.append("image", {
        uri: profileImgUri,
        name: profileImg.fileName,
        type: profileImg.type,
      })
      formData.append("content", JSON.stringify({          
        userId: "narsha5555",
        birth: textBirthday,
        nikname:textNickname,
        intro:textIntro
      }))

      const res = await fetch(`http://localhost:8080/api/user/update`, {
        method:"PUT",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      })
      console.log(formData);
      const json = await res.json();
      console.log(json);
      return json;
    } catch(err){
      console.log(err);
    }
  }

  const mutateProfile = async () => {
    // get old data
    const oldData = await queryClient.getQueryData(['profile-detail'])
    // setting datas at UI, 특정 속성 수정
    queryClient.setQueryData(['profile-detail', "data", "profileImage"], profileImgUri);
    queryClient.setQueryData(['profile-detail', "data", "nikname"], textNickname);
    queryClient.setQueryData(['profile-detail', "data", "birth"], textBirthday);
    queryClient.setQueryData(['profile-detail', "data", "intro"], textIntro);
    // if error -> rollback
    return () => queryClient.setQueryData(['profile-detail'], oldData);
  }

  // useQuery: get
  const {status, data, error, isLoading} = useQuery({
    queryKey: ["profile-detail"], 
    queryFn: getProfileDetail,
  })
  
  // useMutation: post
  const {mutate} = useMutation(['profile-update'], {
    mutationFn: () => updateProfile(),
    onMutate: mutateProfile,
    onError: (error, variable, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['profile-detail']);
    }
  })

  const [profileImgUri, setProfileImageUri] = useState(data.data.profileImage); // image uri
  const [profileImg, setProfileImg] = useState(""); // image object
  const [textBirthday, onChangeTextBirthday] = useState(data.data.birth);
  const [textNickname, onChangeTextNickname] = useState(data.data.nikname);
  const [textIntro, onChangeTextIntro] = useState(data.data.intro);

//달력 모달 설정
  const FormatDate = (day: any) => {
    let dateString =
      day.getFullYear() +
      '.' +
      (day.getMonth() + 1) +
      '.' +
      day.getDate();

    return dateString; 
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    onChangeTextBirthday(FormatDate(date));
    hideDatePicker();
  };

  //이미지 선택
  const [modalVisible, setModalVisible] = useState(false);
  
  const options ={
    mediaType : 'photo', 
    cameraType : 'back',
    saveToPhotos : true,
  }

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setProfileImg(result.assets[0]); // save image
      setProfileImageUri(result.assets[0].uri); // save uri
      setModalVisible(!modalVisible);
    }
  }
  
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setProfileImageUri(result.assets[0].uri); // save uri
    setProfileImg(result.assets[0]); // save image
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      {!isLoading && (
        <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <View style={styles.modalHead}>
                <Text style={styles.btnText}>프로필 수정</Text>
              </View> */}
              <View style={styles.modalBody}>
                <Pressable
                onPress={openCamera}>
                  <View style={styles.modalText}>
                    <Text style={styles.strongText}>카메라</Text>
                  </View>
                </Pressable>
                <Pressable
                onPress={openGallery}>
                  <View style={styles.modalText}>
                    <Text style={styles.strongText}>갤러리</Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.modalEnd}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <View style={styles.btn}>
                    <Text style={styles.strongText}>취소</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <Pressable onPress={() => setModalVisible(true)}>
          <View style={styles.photo}>
            <ImageBackground 
              source = {{uri : profileImgUri}}
              imageStyle={{borderRadius: 20}}
              style={[{width: 115, height: 115, borderRadius: 20}, styles.editPhoto]}>
                <CameraIcon />
              </ImageBackground>
            
          </View>
        </Pressable>

        
        <TextInput
          editable={false}
          style={styles.text}
          placeholder={"@" + data.data.userId}
        />
        <TextInput
          style={styles.text}
          placeholder="생일"
          value={textBirthday}
          onTouchStart={showDatePicker}
          onChangeText={onChangeTextBirthday}
        />
        <View>
          {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <TextInput
          style={styles.text}
          placeholder="닉네임"
          value={textNickname}
          onChangeText={onChangeTextNickname}
        />
        <TextInput
          style={styles.text}
          placeholder="소개"
          value={textIntro}
          onChangeText={onChangeTextIntro}
        />
        <TouchableOpacity onPress={() => { 
          mutate(), navigation.navigate('MyPage')
          }}>
          <View style={styles.edit}>
            <EditButton />
          </View>
        </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    margin: 10,
  },
  photo: {
    marginBottom: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  edit: {
    marginTop: 70,
  },
  editPhoto:{
    opacity: 0.9,
    justifyContent: 'center',
    alignItems:'center'
  },

  //모달
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
    flex: 2,
    width: '100%',
    alignItems: 'center',//'flex-start',
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
    // marginLeft: 20,
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
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  modalContainer: {
    margin: 10,
    width: 350,
    height: 70,
    backgroundColor: '#F9FAC8',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  strongText: {
    fontSize: 14,
    fontWeight: '200',
    color: '#000000',
  },
})