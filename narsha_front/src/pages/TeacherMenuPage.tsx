import React, { Component } from 'react';
import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import Notification from '../assets/teacherMenu/notification.svg';
import StudentList from '../assets/teacherMenu/studentList.svg';
import AppTime from '../assets/teacherMenu/appTime.svg';
// import GroupCode from '../assets/teacherMenu/groupCode.svg';
import DeleteGroup from '../assets/teacherMenu/deleteGroup.svg';
import Undefinedfunc from '../assets/teacherMenu/undefinedSetting.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GroupCodeModal from '../components/modal/GroupCodeModal';
import GroupDeleteModal from '../components/modal/GroupDeleteModal';

export default function TeacherMenu({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.firstRowContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NoticeList')}>
          <View style={{padding: 15}}>
            <Notification />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('StudentListPage')}>
          <View style={{padding: 15}}>
            <StudentList />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TimeSelectPage')}>
          <View style={{padding: 15}}>
            <AppTime />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.secondRowContainer}>
        <TouchableOpacity>
          <View style={{padding: 15}}>
            {/* <GroupCode /> */}
            <GroupCodeModal/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{padding: 15}}>
            <GroupDeleteModal navigation={navigation}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{padding: 15}}>
            <Undefinedfunc />
          </View>
        </TouchableOpacity>
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
  firstRowContainer: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
  },
  secondRowContainer: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
  },
});
