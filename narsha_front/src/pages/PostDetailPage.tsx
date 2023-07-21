import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import userImg from '../assets/user-image.png';
import Line from '../assets/Line.svg';
import { useQuery } from '@tanstack/react-query';
import images from '../assets/images.jpeg';
import Heart from '../assets/heart.svg';
import {ScrollView} from 'react-native-gesture-handler';
import SEND from '../assets/send-btn.svg';
import { TextInput } from 'react-native-gesture-handler';
import Swiper from 'react-native-web-swiper';



//@ts-ignore
export default function PostDetail({route, navigation}) {
    // const postId = route.params.postId
    // get post detail
    const getPostDetail = async () =>{
      try{
        const res = await fetch(`http://localhost:8080/api/post/detail?postId=${1}&groupCode=${"qkt1wKVnDt"}&userId=${"narsha1111"}`,{
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

    // query
    const postQuery = useQuery({
      queryKey: ["post-detail"], 
      queryFn: getPostDetail
    })
  
    
    const str = postQuery.data? postQuery.data.data.imageArray.slice(1,-1):""
    const arr = str.split(', ')
    for(let i=0; i<arr.length;i++){
      arr[i]=arr[i].toString()
    }


  return (
    <View>
      {!postQuery.isLoading && postQuery.data && (
      <>

      <ScrollView>
        <View style={styles.txtContainer}>
          <Image
            source = {{uri : postQuery.data.data.writer.profileImage}} 
            style={styles.userImg} 
          />
          <Text style={{fontWeight: '600', fontSize: 18}}>
            {postQuery.data.data.writer.userId}
          </Text>
        </View>
          
        <View style={styles.imgContainer}>
        <Swiper
          loop
          controlsEnabled={false}
          containerStyle={{width:350, height:350}}
         >
            {arr.map((item) =>
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

        <View style={styles.txtContainer}>
            <Heart style={{marginLeft: 10}} />
            <Text
              style={{fontSize: 13, color: '#909090', marginTop: 0, margin: 10}}>
              Narsha님 외 56명이 좋아합니다
            </Text>
        </View>

        <View style={styles.contentContainer}>
            <Text
              style={{fontSize: 15, marginTop: 0, margin: 10}}>
              {postQuery.data.data.content}
            </Text>
            <Text style={{fontSize: 10,color: '#909090', marginTop: 0, margin: 10}}>{postQuery.data.data.createAt}</Text>
        </View>

        <View style={styles.txtContainer}>
          <Image source={userImg} style={styles.cmtUserImg1} />
          <View style={{marginTop: -5}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
            <Text>댓글 내용</Text>
          </View>
        </View>

        <View style={{margin: 15, marginLeft: 35, marginBottom:200}}>
          <Line />

          <Text style={{marginTop: 15, color: '#61A257'}}>
            댓글 17개 전체 보기
          </Text>

          <View style={styles.cmtBody}>
            <Image source={userImg} style={styles.cmtUserImg2} />
            <View style={{marginTop: -5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
              <Text>댓글 내용</Text>
            </View>
          </View>

          <View style={styles.cmtBody}>
            <Image source={userImg} style={styles.cmtUserImg2} />
            <View style={{marginTop: -5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
              <Text>댓글 내용</Text>
            </View>
          </View>

          <View style={styles.cmtBody}>
            <Image source={userImg} style={styles.cmtUserImg2} />
            <View style={{marginTop: -5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
              <Text>댓글 내용</Text>
            </View>
          </View>

          <View style={styles.cmtBody}>
            <Image source={userImg} style={styles.cmtUserImg2} />
            <View style={{marginTop: -5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
              <Text>댓글 내용</Text>
            </View>
          </View>

          <View style={styles.cmtBody}>
            <Image source={userImg} style={styles.cmtUserImg2} />
            <View style={{marginTop: -5}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
              <Text>댓글 내용</Text>
            </View>
          </View>
        </View>       
      </ScrollView>
      
        <View style={styles.inputBody}>
              <Image source = {{uri : postQuery.data.data.writer.profileImage}} style={styles.cmtUserImg3} />
              <TextInput style={styles.input} placeholder='@아이디 로 글 남기기' />
              <SEND style={{top:5}}/>
        </View>
        </>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  txtContainer:{
    flexDirection: 'row', 
    marginLeft: 35,
    marginTop:15,
  },
  imgContainer:{
    display:'flex',
    height:'auto',
    alignItems:'center',
    marginBottom:-15,
    marginLeft:50
  },
  contentContainer:{
    marginLeft: 35,
    marginTop:15,
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,

  },
  pickImg: {
    height: 300,
    width: 300,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,    
  },
  cmtUserImg1: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  cmtUserImg2: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  cmtBody:{
    flexDirection: 'row', 
    marginTop: 15
  },
  inputBody:{
    width:'100%',
    height:60,
    padding:10,
    flexDirection:'row',
    borderRadius:10,
    bottom:0,
    backgroundColor: '#ffffff',
    position:'absolute'
},
cmtUserImg3:{
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10
},
input:{
    width:'75%',
}
});