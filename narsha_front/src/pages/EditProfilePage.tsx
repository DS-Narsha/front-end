import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import ProfilePhoto from "../assets/profilePhoto.svg"
import EditButton from "../assets/editButton.svg"
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EditProfile() {

  const [textId, onChangeTextid] = React.useState('');
  const [textBirthday, onChangeTextBirthday] = React.useState('');
  const [textNickname, onChangeTextNickname] = React.useState('');
  const [textIntro, onChangeTextIntro] = React.useState('');

  return (
    <View style={styles.container}>
        <View style={styles.photo}><ProfilePhoto /></View>
      <TextInput
        style={styles.text}
        placeholder="@아이디"
        value={textId}
        onChangeText={onChangeTextid}
      />
      <TextInput
        style={styles.text}
        placeholder="생일"
        value={textBirthday}
        onChangeText={onChangeTextBirthday}
      />
      <TextInput
        style={styles.text}
        placeholder="닉네임"
        value={textNickname}
        onChangeText={onChangeTextNickname}
      />
      <TextInput
        style={styles.text}
        placeholder="소개"
        value={textIntro}
        onChangeText={onChangeTextIntro}
      />
      <TouchableOpacity>
        <View style={styles.edit}><EditButton /></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderLeftWidth:0,
    borderRightWidth:0,
    borderTopWidth:0,
    borderBottomWidth: 1,
    margin: 10
  },
  photo: {
    marginBottom: 20 
  },
  edit: {
    marginTop: 70
  }
})