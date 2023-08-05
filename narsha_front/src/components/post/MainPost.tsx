import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import userImg from '../../assets/user-image.png';
import images from '../../assets/images.jpeg';
import Heart from '../../assets/heart.svg';
import Chat from '../../assets/chat.svg';
import Swiper from 'react-native-web-swiper';

const MainPost = props => {
  return (
    <View>
      {props.user && (
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Image
              source={
                props.user.profileImage
                  ? {uri: props.user.profileImage}
                  : userImg
              }
              style={styles.userImg}
            />
            <Text style={{fontWeight: '600', fontSize: 18}}>
              {props.user.userId}
            </Text>
          </View>

          <View style={styles.pickImg}>
            <Swiper
              loop
              controlsEnabled={false}
              containerStyle={{width: 350, height: 350}}>
              {props.imageArray.map((item, index) => (
                <View key={index}>
                  <Image source={{uri: item}} style={styles.pickImg} />
                </View>
              ))}
            </Swiper>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Heart style={{marginLeft: 10}} />
            <Chat style={{marginLeft: 20}} />
          </View>
          <Text
            style={{fontSize: 13, color: '#909090', marginTop: 5, margin: 10}}>
            Narsha님 외 56명이 좋아합니다
          </Text>

          <Text style={{fontSize: 16, marginTop: 5, margin: 10}}>
            {props.content}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Image source={userImg} style={styles.cmtUserImg} />
            <View style={{marginTop: -5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                comment_User
              </Text>
              <Text>댓글 내용</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.line} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  pickImg: {
    alignSelf: 'center',
    height: 350,
    width: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
  cmtUserImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  line: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#c0c0c0',
    marginVertical: 15,
  },
});

export default MainPost;
