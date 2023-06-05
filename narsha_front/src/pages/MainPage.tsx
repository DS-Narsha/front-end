import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import NoticeModal from '../components/modal/NoticeModal';
import MainPost from '../components/post/MainPost';
import NEW from '../assets/new-btn.svg';
import RecentPost from '../components/post/RecentPost';

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    paddingHorizontal: 10,
  },
});

//@ts-ignore
const MainScreen = ({navigation}) => {
  return (
    <View>
      <View>
        <NoticeModal navigation={navigation} />
        <MainPost />
      </View>

      <TouchableOpacity style={styles.absolute}>
        <RecentPost />
      </TouchableOpacity>

      {/* <RecentPost /> */}
    </View>
  );
};

export default MainScreen;
