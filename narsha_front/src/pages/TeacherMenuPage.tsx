import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Notification from '../assets/teacherMenu/notification.svg';
import StudentList from '../assets/teacherMenu/studentList.svg';
import AppTime from '../assets/teacherMenu/appTime.svg';
import GroupCode from '../assets/teacherMenu/groupCode.svg';
import Undefinedfunc from '../assets/teacherMenu/undefinedSetting.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function TeacherMenu({navigation}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={() => navigation.navigate('InfoList')}>
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
      <View style={styles.container3}>
        <TouchableOpacity>
          <View style={{padding: 15}}>
            <GroupCode />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{padding: 15}}>
            <Undefinedfunc />
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
  container2: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
  },
  container3: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
  },
});
