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
import SEND from '../assets/send-btn.svg';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    body:{
        width:'100%',
        height:60,
        padding:10,
        flexDirection:'row',
        marginBottom:10,
        borderRadius:10,
        bottom:0,
        backgroundColor: '#ffffff',
        position:'absolute'
    },
    userImg:{
        width: 40,
        height: 40,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10
    },
    input:{
        width:280,
    }
})


export default function CommentInput() {
    return (
        <View style={styles.body}>
            <Image source={userImg} style={styles.userImg} />
            <TextInput style={styles.input} placeholder='@아이디 로 글 남기기' />
            <SEND style={{top:5}}/>
        </View>
    );
}
