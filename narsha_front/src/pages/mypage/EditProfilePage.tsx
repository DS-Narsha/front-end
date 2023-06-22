import React, {useRef, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query';
import ProfilePhoto from '../../assets/profilePhoto.svg';
import EditButton from '../../assets/editButton.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

//@ts-ignore
export default function EditProfile({navigation}) {
  // queryClient
  const queryClient = useQueryClient();
  const getProfileDetail = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/profile/detail?profileId=${1}`,{
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
      formData.append("content", JSON.stringify({          
        userGroupId: 1,
        // profileImg: profileImage,
        birth: textBirthday,
        nikname:textNickname,
        intro:textIntro
      })) // image 속성은 imagePicker 구현 후 추가

      const res = await fetch(`http://localhost:8080/api/profile/update`, {
        method:"PUT",
        headers: {
        },
        body: formData,
      })
      const json = await res.json();
      return json;
    } catch(err){
      console.log(err);
    }
  }

  const mutateProfile = async () => {
    // get old data
    const oldData = await queryClient.getQueryData(['profile-detail'])
    // setting datas at UI, 특정 속성 수정
    // queryClient.setQueryData(['profile-detail', "profileImg"], profileImage);
    queryClient.setQueryData(['profile-detail', "nikname"], textNickname);
    queryClient.setQueryData(['profile-detail', "birth"], textBirthday);
    queryClient.setQueryData(['profile-detail', "intro"], textIntro);
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

  // const [profileImage, onChangeProfileImage] = useState(data.profileImg)
  const [textBirthday, onChangeTextBirthday] = useState(data.birth);
  const [textNickname, onChangeTextNickname] = useState(data.nikname);
  const [textIntro, onChangeTextIntro] = useState(data.intro);

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
    // console.warn("A date has been picked: ", date);
    onChangeTextBirthday(FormatDate(date));
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {!isLoading && (
        <>
        <View style={styles.photo}>
          <Image 
            source = {{uri : "https://img1.daumcdn.net/thumb/C176x176/?fname=https://blog.kakaocdn.net/dn/bhrekR/btqzQtNHiXU/G6qSoOJdxcsfcri8lRGc9K/img.png"}}
            style={{width: 115, height: 115}} />
        </View>
        <TextInput
          editable={false}
          style={styles.text}
          placeholder={"@" + data.userGroup.user.userId}
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
          mutate()
          navigation.navigate('MyPage')}
          }>
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
    marginBottom: 20,
  },
  edit: {
    marginTop: 70,
  },
});
