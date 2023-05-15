import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';

import MyPage from './MyPage';

import Notification from "../assets/teacherMenu/notification.svg";
import StudentList from "../assets/teacherMenu/studentList.svg";
import AppTime from "../assets/teacherMenu/appTime.svg";
import GroupCode from "../assets/teacherMenu/groupCode.svg";
import Undefinedfunc from "../assets/teacherMenu/undefinedSetting.svg" 

export default function TeacherMenu({ navigation }: any) {
  return(
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={{padding: 15}}><Notification /></View>
        <View style={{padding: 15}}><StudentList /></View>
        <View style={{padding: 15}}><AppTime /></View>
      </View>
      <View style={styles.container3}>
        <View style={{padding: 15}}><GroupCode /></View>
        <View style={{padding: 15}}><Undefinedfunc /></View>
        <View style={{padding: 15}}><Undefinedfunc /></View>
      </View>
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
  container2: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
  },
  container3: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
  }
})