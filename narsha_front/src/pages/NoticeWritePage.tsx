import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SingleTextInput from '../components/SingleTextInput';
import MultiTextInput from '../components/MultiTextInput';

// 공지 작성 페이지

export default function NoticeWritePage({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.writingNoticeContainer}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>공지 제목</Text>
        </View>
        <View style={styles.textinput}>
          <SingleTextInput placeholder="" />
        </View>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>공지 내용</Text>
        </View>
        <View style={styles.textinput}>
          <MultiTextInput placeholder="" />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('InfoList')}>
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
});
