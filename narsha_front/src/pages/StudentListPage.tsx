import React from 'react';
import {View, StyleSheet} from 'react-native';

import StudentListModal from '../components/modal/StudentListModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';

// 업적 스크린 페이지

export default function StudentListPage({navigation}: any) {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.studentListContainer}>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
        <TouchableOpacity>
          <StudentListModal />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  studentListContainer: {
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
