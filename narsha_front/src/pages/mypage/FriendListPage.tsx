import React , { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Image, FlatList} from 'react-native';
import DS from '../../assets/DS.png';
import Arrow from '../../assets/arrow-left.svg';
import SingleFriend from '../../components/SingleFriend';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import userImg from '../../assets/user-image.png';
import { useQuery } from '@tanstack/react-query';

//@ts-ignore
export default function FriendList({navigation}) {
      // get friends list
      const getFriendsList = async () =>{
        try{
          const res = await fetch(`http://localhost:8080/api/user/student-list?groupCode=${"qkt1wKVnDt"}`,{
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

      const FriendsQuery = useQuery({
        queryKey: ["friends-list"], 
        queryFn: getFriendsList
      })

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
      
      <View>
      {!FriendsQuery.isLoading && (
        <>
        {FriendsQuery.data ? (
          <View>
            <FlatList
                data={FriendsQuery.data.data}
                renderItem={({ item }) => {
                  const { userId, nikname, profileImage } = item;
                    return (
                      <TouchableOpacity style={styles.container}>
                        <Image 
                          source={profileImage? {uri : profileImage}: userImg}
                          style={styles.image} 
                        />
                        <View style={styles.item}>
                          <Text style={styles.user_id}>{userId}</Text>
                          <Text style={styles.user_name}>{nikname}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                }}
            />
          </View>
        ):
        <View></View>}
        </>
        )}
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 63,
    width: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#E3F1A9',
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