import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, TextInput} from 'react-native';
import SingleTextInput from '../components/SingleTextInput';
import MultiTextInput from '../components/MultiTextInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 공지 작성 페이지

export default function NoticeWritePage({navigation}: any) {

  const queryClient = useQueryClient();

  const createNotice = useMutation(async () => {
    try{ 
      const res = await fetch(`http://localhost:8080/api/notice/create`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupCode: "InzSpQxr1Z",
          noticeTitle: textTitle,
          noticeContent: textContent,
          writer: "narsha2222"
        }),
      })
      const data = await res.json();
      return data;
    } catch(err){
      console.log(err);
    }
  })

  const uploadNotice = async () => {
    try {
      const data = await createNotice.mutateAsync();

      queryClient.setQueryData(["noticeTitle"], textTitle);
      queryClient.setQueryData(["noticeContent"], textContent);
      
      if(data.success === true) {
        navigation.navigate('NoticeList');
      } else {
        console.log(data.message);
        Alert.alert('공지 등록 실패', data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '공지 등록 중 오류가 발생했습니다.');
    }
  };

  const [textTitle, setTextTitle] = useState("");
  const [textContent, setTextContent] = useState("");

  return (
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
              onChangeText={setTextTitle}/>
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
              onChangeText={setTextContent} />
          </View>
          
        </View>
      </View>
      <TouchableOpacity onPress={uploadNotice}>
        <View style={styles.updatebtn}>
          <Text style={styles.btntitle}>공지 올리기</Text>
        </View>
      </TouchableOpacity>
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
    marginTop: 55,
  },
  textinput: {
    width: 350,
    margin: 10,
  },
  title: {
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
    marginTop: 40,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  btntitle: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  titleTextContainer: {
    backgroundColor: "#ffffff",
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
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
  },
  contentInputText: {
    width: 250,
    height: 250,
    fontSize: 14,
    marginLeft: 10,
    textAlignVertical: 'top',
  },
});
