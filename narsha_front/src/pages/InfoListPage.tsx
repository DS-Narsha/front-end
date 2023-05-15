import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import InfoIcon from '../assets/info-icon.svg';
import DS from '../assets/DS.png';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F9FAC8',
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
  container: {
    padding: 22,
    marginTop: 13,
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 13,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
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

export default function InfoList() {
  return (
    <View style={styles.body}>
      <View style={styles.ds_container}>
        <Image style={styles.ds_image} source={DS} />
        <Text
          style={styles.ds_text}>{`선생님이 여러분 모두에게 알리기 위한 내용들은
이 곳에 올라온답니다.`}</Text>
      </View>

      <View style={styles.container}>
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
      </View>

      <View style={styles.container}>
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
      </View>

      <View style={styles.container}>
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
      </View>

      <View style={styles.container}>
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
      </View>

      <View style={styles.container}>
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
      </View>
    </View>
  );
}
