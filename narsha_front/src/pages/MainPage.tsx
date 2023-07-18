import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import NoticeModal from '../components/modal/NoticeModal';
import MainPost from '../components/post/MainPost';
import NEW from '../assets/new-btn.svg';
import RecentPost from '../components/post/RecentPost';
import {ScrollView} from 'react-native-gesture-handler';


//@ts-ignore
const MainScreen = ({navigation, route}) => {

  const userId = route.params?.userId;
  const userType = route.params?.userType;

  return (
      <View>
          <View>
            <NoticeModal navigation={navigation} /> 
            <ScrollView>
              <MainPost />
              <MainPost />
              <MainPost />
              <MainPost />
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.absolute}>
            <RecentPost />
          </TouchableOpacity>

          {/* <RecentPost /> */}
      </View>
  );
};


const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    paddingHorizontal: 10,
  },
});

export default MainScreen;
