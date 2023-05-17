import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import DS from '../assets/DS.png';
import Arrow from '../assets/arrow-left.png';
import SingleFriend from './SingleFriend';

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 63,
    width: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#E3F1A9',
  },
  ds_container: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 30,
  },
  ds_image: {
    width: 49,
    height: 49,
    borderRadius: 50,
  },
  ds_text: {
    marginTop: -3,
    marginLeft: 7,
    backgroundColor: '#fbffe1',
    borderRadius: 20,
    padding: 8,
    color: '#61A257',
  },
});

export default function FriendList() {
  return (
    <View>
      <View style={styles.top}>
        <Image source={Arrow} style={{margin: 20}} />
        <Text style={{margin: 20, marginLeft: 100, fontSize: 18}}>
          친구 목록
        </Text>
      </View>

      <View style={styles.ds_container}>
        <Image style={styles.ds_image} source={DS} />
        <Text
          style={
            styles.ds_text
          }>{`같은 그룹의 친구들을 이 곳에서 볼 수 있답니다!
친구들의 게시글을 구경하러 가볼까요?`}</Text>
      </View>

      <SingleFriend/>
      <SingleFriend/>
      <SingleFriend/>
      <SingleFriend/>
      <SingleFriend/>
      <SingleFriend/>
    </View>
  );
}
