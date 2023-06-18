import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PencilIcon from '../../assets/pencil-icon.svg';
import FriendList from '../../assets/friend-list.svg';
import BadgeList from '../../assets/badge-list.svg';
import {ScrollView} from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import Config from "react-native-config";

//@ts-ignore
export default function MyPage({navigation}) {
  const getProfileDetail = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/profile/detail?profileId=${1}`,{
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
        },
     })
     const json = await res.json();
     return json;
    } catch(err){
      console.log(err);
    }

  }

  const {status, data, error, isLoading} = useQuery({
    queryKey: ["profile-detail"], 
    queryFn: getProfileDetail
  })
  return (
    <View style={styles.container}>
      {!isLoading && (
      <>
        <View style={styles.container2}>
          <View style={styles.profile} />
          <Text style={{fontWeight: 'bold', fontSize: 15, padding: 2}}>
            {data.nikname}
          </Text>
          <Text style={{fontSize: 12, padding: 1}}>{data.birth}</Text>
          <Text style={{fontSize: 13, padding: 2}}>
            {data.intro}
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 5}}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 10,
                padding: 2,
              }}>
              프로필 수정
            </Text>
            <View style={{paddingTop: 2}}>
              <PencilIcon />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.postingListContainer}>
          <View style={styles.container3}>
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images.jpeg')}
                  style={styles.image}
                />
              </View>
            </View>
            {/* height */}
            <View style={{height: 100}} />
          </View>
        </ScrollView>
        <View style={styles.btnbox}>
          <TouchableOpacity onPress={() => navigation.navigate('FriendList')}>
            <View style={styles.btn}>
              <FriendList />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BadgeList')}>
            <View style={styles.btn}>
              <BadgeList />
            </View>
          </TouchableOpacity>
        </View>
      </>
      )}
    </View> 
  );
}

const styles = StyleSheet.create({
  profile: {
    backgroundColor: '#D9D9D9',
    width: 90,
    height: 90,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  container2: {
    backgroundColor: '#FCFDE1',
    width: '100%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  container3: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    paddingTop: 40,
  },
  content: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderRadius: 10,
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  image: {
    borderRadius: 10,
    width: 110,
    height: 110,
  },
  postingListContainer: {
    flex: 1,
  },
  btnbox: {
    flexDirection: 'column',
    position: 'absolute',
    top: '29%',
    left: '70%',
  },
  btn: {
    padding: 2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
});
