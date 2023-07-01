import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import userImg from '../assets/user-image.png';
import DetailPost from '../components/post/DetailPost';
import Arrow from '../assets/arrow-left.svg';
import Line from '../assets/Line.svg';
import CommentInput from '../components/CommentInput';
import { useQuery } from '@tanstack/react-query';

const styles = StyleSheet.create({
  cmtUserImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
});

//@ts-ignore
export default function PostDetail({route, navigation}) {
    const postId = route.params.postId
    // get post detail
    const getPostDetail = async () =>{
      try{
        const res = await fetch(`http://localhost:8080/api/post/detaill?postId=${postId}&groupCode=${"l0uYU6P$LP"}$LP`,{
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
    const profileQuery = useQuery({
      queryKey: ["post-detail"], 
      queryFn: getPostDetail
    })
  

  return (
    <View>
      <DetailPost />
      <View style={{margin: 10, marginLeft: 35}}>
        <Line />
        <Text style={{marginTop: 15, color: '#61A257'}}>
          댓글 5개 전체 보기
        </Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Image source={userImg} style={styles.cmtUserImg} />
          <View style={{marginTop: -5}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>comment_User</Text>
            <Text>댓글 내용</Text>
          </View>
        </View>
      </View>

      <CommentInput />
    </View>
  );
}
