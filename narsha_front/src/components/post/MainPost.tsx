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


const MainPost = (props) => {

  
  return (
    <View>
      {props.user && (
      <View style={{margin: 20, marginTop: 10}}>
      <View style={{flexDirection: 'row', marginBottom:15}}>
        <Image source = {props.user.profileImage? {uri : props.user.profileImage}: userImg} style={styles.userImg} />
        <Text style={{fontWeight: '600', fontSize: 18}}>{props.user.userId}</Text>
      </View>
      
      <View style={styles.pickImg}>
        <Swiper
          loop
          controlsEnabled={false}
          containerStyle={{width:350, height:350}}
         >
            {props.imageArray.map((item) =>
              <View>
                <Image
                  key={item}
                  source = {{uri:item}}
                  style={styles.pickImg} 
                  />
              </View>
            )}
        </Swiper>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Heart style={{marginLeft: 10}} />
        <Chat style={{marginLeft: 20}} />
      </View>
      <Text style={{fontSize: 13, color: '#909090', marginTop: 5, margin: 10}}>
        Narsha님 외 56명이 좋아합니다
      </Text>

      <Text style={{fontSize: 16,  marginTop: 5, margin: 10}}>
        {props.content}
      </Text>

      <View style={{flexDirection: 'row', marginTop: 15}}>
        <Image source={userImg} style={styles.cmtUserImg} />
        <View style={{marginTop: -5}}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
          <Text>댓글 내용</Text>
        </View>
      </View>
    </View>
    )}
    </View>
  );
}


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

export default MainPost;