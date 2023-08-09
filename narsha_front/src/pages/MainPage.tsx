import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import NoticeModal from '../components/modal/NoticeModal';
import MainPost from '../components/post/MainPost';
import RecentPost from '../components/post/RecentPost';
import {useQuery, useQueryClient} from '@tanstack/react-query';

type UserData = {
  userId: string;
  groupCode: string;
};

//@ts-ignore
const MainScreen = ({navigation}) => {
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get post listd
  const getPostingList = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/post/main-list?groupCode=${userData.groupCode}&userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const postQuery = useQuery({
    queryKey: ['posting-list'],
    queryFn: getPostingList,
  });

  return (
    <View style={{height: '100%'}}>
      <NoticeModal navigation={navigation} />

      <View>
        {!postQuery.isLoading && (
          <>
            {postQuery.data ? (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={postQuery.data.data}
                  contentContainerStyle={{
                    paddingBottom: 170,
                  }}
                  renderItem={({item}) => {
                    const {content, imageArray, user} = item;

                    // imageArray를 문자열 배열로 만듦
                    const str = imageArray.slice(1, -1);
                    const arr = str.split(', ');
                    for (let i = 0; i < arr.length; i++) {
                      arr[i] = arr[i].toString();
                    }

                    return (
                      <MainPost
                        content={content}
                        imageArray={arr}
                        user={user}
                      />
                    );
                  }}
                />
              </View>
            ) : (
              <View></View>
            )}
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
    bottom: 70,
    paddingHorizontal: 10,
    fontFamily: 'NanumSquareR',
  },
});

export default MainScreen;
