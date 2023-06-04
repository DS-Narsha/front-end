import React from 'react';
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

const styles = StyleSheet.create({
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  pickImg: {
    height: 350,
    width: 350,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  cmtUserImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default function MainPost() {
  return (
    <View style={{margin: 20, marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Image source={userImg} style={styles.userImg} />
        <Text style={{fontWeight: '600', fontSize: 18}}>userName</Text>
      </View>
      <Image source={images} style={styles.pickImg} />

      <View style={{flexDirection: 'row'}}>
        <Heart style={{marginLeft: 10}} />
        <Chat style={{marginLeft: 20}} />
      </View>
      <Text style={{fontSize: 13, color: '#909090', marginTop: 5, margin: 10}}>
        Narsha님 외 56명이 좋아합니다
      </Text>

      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Image source={userImg} style={styles.cmtUserImg} />
        <View style={{marginTop: -5}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
          <Text>댓글 내용</Text>
        </View>
      </View>
    </View>
  );
}
