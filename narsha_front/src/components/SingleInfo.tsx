import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import InfoIcon from '../assets/info-icon.svg';

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginTop: 13,
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 13,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  topItem: {
    flexDirection: 'row',
  },
  bottomItem: {
    marginTop: 17,
    fontSize: 12,
    color: '#909090',
  },
  titleText: {
    marginTop: -5,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    marginTop: 0,
    marginLeft: 10,
    fontSize: 12,
    color: '#909090',
  },
});

export default function SingleInfo() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.topItem}>
        <InfoIcon />
        <View>
          <Text style={styles.titleText}>공지 제목</Text>
          <Text style={styles.dateText}>작성 날짜</Text>
        </View>
      </View>
      <Text
        style={styles.bottomItem}
        numberOfLines={2}
        ellipsizeMode="tail">{`훈민정음 해례본]은 세종이 직접 서문을 쓰고 정인지 같은 신하들에게 글자에 대한 설명을 적게 한 것입니다. 
    이 책이 1940년에 안동에서 발견될 때까지 우리는 한글의 창제 원리에 대해 전혀 모르고 있었습니다. 
    그러다 이 책이 발견됨으로 해서 한글이 얼마나 과학적인 원리로 만들어졌는지 알게 되었답니다. `}</Text>
    </TouchableOpacity>
  );
}
