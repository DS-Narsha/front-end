import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import InfoIcon from '../../assets/info-icon.svg';
import Hamburger from '../../assets/hamburger.svg';

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginTop: 13,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 13,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
  },
  titleText: {
    marginTop: -5,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  InfoTitle: {
    marginTop: 0,
    marginLeft: 10,
    fontSize: 12,
    color: '#909090',
  },
});

//@ts-ignore
export default function NoticeModal({navigation}) {
  return (
    <View style={styles.container}>
      <InfoIcon />
      <View>
        <Text style={styles.titleText}>공지 사항</Text>
        <Text style={styles.InfoTitle} numberOfLines={1}>
          공지 제목만 1줄 보이도록 합니다.
        </Text>
      </View>
      <Hamburger
        style={{margin: 5, marginLeft: 80}}
        onPress={() => navigation.navigate('NoticeList')}
      />
    </View>
  );
}
