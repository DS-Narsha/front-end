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

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 63,
    width: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#E3F1A9',
  },
  cmtUserImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default function PostDetail() {
  return (
    <View>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Arrow style={{margin: 20}} />
        </TouchableOpacity>
        <Text style={{margin: 20, marginLeft: 110, fontSize: 18}}>게시물</Text>
      </View>

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
