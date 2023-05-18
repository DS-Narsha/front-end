import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import EmptyPhoto from "../assets/empty.svg"
import ContentPhoto from "../assets/content.svg"
import PencilIcon from "../assets/pencil-icon.svg"
import FriendList from "../assets/friend-list.svg"
import BadgeList from "../assets/badge-list.svg"

export default function MyPage() {

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <EmptyPhoto />
        <Text style={{fontWeight: "bold", fontSize: 15, padding:2}}>나르샤</Text>
        <Text style={{fontSize: 12, padding:1}}>5월30일</Text>
        <Text style={{fontSize: 13, padding:2}}>안녕하세요~~나르샤 개인 페이지~~</Text>
        <View style={{flexDirection: 'row',}}>
          <Text style={{fontWeight: "bold", fontSize: 10, padding:2, marginRight: 2}}>프로필 수정</Text>
          <View style={{paddingTop: 2}}><PencilIcon /></View>
        </View>
      </View>
      <View style={styles.container3}>
        <View style={styles.content}>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
        </View>
        <View style={styles.content}>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
        </View>
        <View style={styles.content}>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
        </View>
        <View style={styles.content}>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
          <View style={styles.photo}><ContentPhoto /></View>
        </View>
      </View>
      <View style={styles.btnbox}>
        <TouchableOpacity>
          <View style={styles.btn}><FriendList /></View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.btn}><BadgeList /></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  container2:{
    backgroundColor: "#FCFDE1",
    width: "100%",
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    width: "100%",
    paddingTop: 40
  },
  content: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    padding: 5
  },
  btnbox: {
    flexDirection: 'column',
    position: 'absolute',
    top: '28%',
    left:'70%',
  },
  btn: {
    padding: 2
  }
})