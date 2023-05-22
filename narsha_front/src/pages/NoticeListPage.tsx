import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import DS from '../assets/DS.png';
import {Svg} from 'react-native-svg';
import Arrow from '../assets/arrow-left.svg';
import Write from '../assets/write.svg';
import SingleInfo from '../components/SingleInfo';
import NoticeWritePage from './NoticeWritePage';

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 63,
    width: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#E3F1A9',
  },
  body: {
    backgroundColor: '#FCFDE1',
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
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 8,
    color: '#61A257',
  },
});

export default function InfoList({navigation}: any) {
  return (
    <View style={styles.body}>
      <View style={styles.top}>
        <Arrow style={{margin: 20}} />
        <Text
          style={{
            margin: 20,
            marginLeft: 80,
            fontSize: 18,
            textAlign: 'center',
          }}>
          공지 목록 페이지
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('NoticeWritePage')}>
          <Image source={Write} style={{margin: 20, marginLeft: 60}} />
        </TouchableOpacity>
      </View>

      <View style={styles.ds_container}>
        <Image style={styles.ds_image} source={DS} />
        <Text
          style={styles.ds_text}>{`선생님이 여러분 모두에게 알리기 위한 내용들은
이 곳에 올라온답니다.`}</Text>
      </View>

      <SingleInfo />
      <SingleInfo />
      <SingleInfo />
      <SingleInfo />
    </View>
  );
}
