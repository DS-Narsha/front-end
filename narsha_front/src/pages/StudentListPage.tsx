import React from 'react';
import {View, StyleSheet} from 'react-native';

import StudentListModal from '../components/StudentListModal';
import { TouchableOpacity } from 'react-native-gesture-handler';

// 업적 스크린 페이지

export default function StudentListPage({navigation}: any) {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
          <TouchableOpacity><StudentListModal /></TouchableOpacity>
      </View>
    </View>
        
    );
};

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#FFFFFF',
  },
  container2:{
      marginTop: 60,
      flexDirection: 'column',
      alignItems: 'center',
  }
})
