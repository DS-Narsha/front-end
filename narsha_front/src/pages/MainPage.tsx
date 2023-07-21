import React, { useCallback, useEffect, useState } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import NoticeModal from '../components/modal/NoticeModal';
import MainPost from '../components/post/MainPost';
import NEW from '../assets/new-btn.svg';
import RecentPost from '../components/post/RecentPost';
import {ScrollView} from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';


//@ts-ignore
const MainScreen = ({navigation}) => {
  // get post listd
  const getPostingList = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/post/user-list?groupCode=${"qkt1wKVnDt"}`,{
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
  
  const postQuery = useQuery({
    queryKey: ["posting-list"], 
    queryFn: getPostingList
  })


  return (
      <View>
        <NoticeModal navigation={navigation} />
            <View>
              {!postQuery.isLoading && (
              <>
                {postQuery.data ? (
                  <View>
                    <FlatList
                        data={postQuery.data.data}
                        renderItem={({ item }) => {
                          const { content, imageArray, user } = item;

                          // imageArray를 문자열 배열로 만듦
                          const str = imageArray.slice(1,-1)
                          const arr = str.split(', ')
                          for(let i=0; i<arr.length;i++){
                            arr[i]=arr[i].toString()
                          }

                          return (
                              <MainPost content={content} imageArray={arr} user={user}/>
                            )
                        }}
                    />
                  </View>
                ):
                <View></View>}
              </>
              )}
            </View>

          <TouchableOpacity style={styles.absolute}>
            <RecentPost />
          </TouchableOpacity>

      </View>
  );
};


const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    right: 10,
    bottom: 50,
    paddingHorizontal: 10,
  },
});

export default MainScreen;
