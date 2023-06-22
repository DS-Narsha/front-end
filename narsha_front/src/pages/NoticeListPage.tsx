import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import DS from '../assets/DS.png';
import SingleInfo from '../components/SingleInfo';
import {ScrollView} from 'react-native-gesture-handler';

// @ts-ignore
export default function NoticeList({navigation}) {
  return (
    <View style={styles.body}>
      <View style={styles.ds_container}>
        <Image style={styles.ds_image} source={DS} />
        <Text
          style={
            styles.ds_text
          }>{`선생님이 여러분 모두에게 알리기 위한 내용들은 이 곳에 올라온답니다.`}</Text>
      </View>
      <ScrollView>
        <SingleInfo />
        <SingleInfo />
        <SingleInfo />
        <SingleInfo />
        <SingleInfo />
        {/* height */}
        <View style={{height: 200}} />
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    backgroundColor: '#FCFDE1',
  },
  ds_container: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  ds_image: {
    width: 49,
    height: 49,
    borderRadius: 50,
  },
  ds_text: {
    flex: 1,
    marginLeft: 7,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 8,
    color: '#61A257',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
});