import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import userImage from '../assets/user_image.png';

const styles = StyleSheet.create({
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

export default function SingleFriend() {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={userImage} style={styles.image} />
      <View style={styles.item}>
        <Text style={styles.user_id}>User_ID</Text>
        <Text style={styles.user_name}>User_Name</Text>
      </View>
    </TouchableOpacity>
  );
}
