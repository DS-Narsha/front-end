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
import HeartFill from '../../assets/heartFill.svg';
import Chat from '../../assets/chat.svg';
import Swiper from 'react-native-web-swiper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type UserData = {
  userId: string;
  groupCode: string;
};


const MainPost = ({postId, content, imageArray, user}: any) => {

  const queryClient = useQueryClient();

  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  //좋아요 누르기
  const createLike = useMutation(async () => {
    try{ 
      const res = await fetch(`http://localhost:8080/api/like/create`, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.userId,
          groupCode: userData.groupCode,
          postId: postId,
        }),
      })
      const data = await res.json();
      return data;
    } catch(err){
      console.log(err);
    }
  })

  //좋아요 여부 확인하기
  const getLike = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/like/check?userId=${userData.userId}&groupCode=${userData.groupCode}&postId=${postId}`,{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json();
      return json;
    } catch(err){
      console.log(err);
    }
  }

  //좋아요 취소하기
  const deleteLike = useMutation(async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/like/delete?userId=${userData.userId}&groupCode=${userData.groupCode}&postId=${postId}`,{
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json();
      return json;
    } catch(err){
      console.log(err);
    }
  })

  const checkLikeQuery = useQuery({
    queryKey: ['check-like'],
    queryFn: getLike,
  });

  const uploadLike = async () => {
    try {
      const data = await createLike.mutateAsync();
      
      if(data.status === 200) {
        checkLikeQuery.refetch();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startDeleteLike = async () => {
    const data = await deleteLike.mutateAsync();
    checkLikeQuery.refetch();
  }

  return (
    <View>
      {user && !checkLikeQuery.isLoading && checkLikeQuery.data &&(
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Image
              source={
                user.profileImage
                  ? {uri: user.profileImage}
                  : userImg
              }
              style={styles.userImg}
            />
            <Text style={{fontWeight: '600', fontSize: 18, fontFamily: 'NanumSquareR'}}>
              {user.userId}
            </Text>
          </View>

          <View style={styles.pickImg}>
            <Swiper
              loop
              controlsEnabled={false}
              containerStyle={{width: 350, height: 350}}>
              {imageArray.map((item, index) => (
                <View key={index}>
                  <Image source={{uri: item}} style={styles.pickImg} />
                </View>
              ))}
            </Swiper>
          </View>

          <View style={{flexDirection: 'row'}}>
            {/* 하트 작업 */}
            {checkLikeQuery.data.data === true
                  ? <TouchableOpacity onPress={startDeleteLike}><HeartFill style={{marginLeft: 10}} /></TouchableOpacity>
                  : <TouchableOpacity onPress={uploadLike}><Heart style={{marginLeft: 10}} /></TouchableOpacity>}
            <Chat style={{marginLeft: 20}} />
          </View>
          <Text
            style={{fontSize: 13, color: '#909090', marginTop: 5, margin: 10, fontFamily: 'NanumSquareR'}}>
            Narsha님 외 56명이 좋아합니다
          </Text>

          <Text style={{fontSize: 16, marginTop: 5, margin: 10, fontFamily: 'NanumSquareR'}}>
            {content}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Image source={userImg} style={styles.cmtUserImg} />
            <View style={{marginTop: -5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'NanumSquareB'}}>
                comment_User
              </Text>
              <Text style={{fontFamily: 'NanumSquareR'}}>댓글 내용</Text>
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
    fontFamily: 'NanumSquareR',
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
