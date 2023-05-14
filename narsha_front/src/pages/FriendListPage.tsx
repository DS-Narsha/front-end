import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import userImage from '../assets/user-image.png';
import DS from '../assets/ds.png';

const styles = StyleSheet.create({
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
  container: {
    padding: 15,
    marginTop: 10,
    marginHorizontal: 8,
    flexDirection: 'row',
  },
  item: {
    margin: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowOffset: {height: 10, width: 10},
        shadowRadius: 10,
      },

      android: {
        elevation: 20,
      },
    }),
  },
  user_id: {
    margin: 3,
    fontSize: 16,
    fontWeight: 'bold',
  },
  user_name: {
    margin: 3,
    fontSize: 14,
  },
});

export default function FriendList() {
  return (
    <View>
      <View style={styles.ds_container}>
        <Image style={styles.ds_image} source={DS} />
        <Text
          style={
            styles.ds_text
          }>{`같은 그룹의 친구들을 이 곳에서 볼 수 있답니다!
친구들의 게시글을 구경하러 가볼까요?`}</Text>
      </View>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.container}>
        <Image source={userImage} style={styles.image} />
        <View style={styles.item}>
          <Text style={styles.user_id}>User_ID</Text>
          <Text style={styles.user_name}>User_Name</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
