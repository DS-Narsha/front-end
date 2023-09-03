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
import GuidePage from './GuidePage';
import Config from 'react-native-config';

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

  //console.log(Config.APP_ID, Config.HOST_NAME);

  // get post listd
  const getPostingList = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/post/main-list?groupCode=${userData.groupCode}&userId=${userData.userId}`,
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
        {/* guide page */}
        <TouchableOpacity
          style={styles.floating}
          onPress={() => navigation.navigate('GuidePage')}>
          <Text style={styles.floatingText}>둥실둥실{'\n'}사용법</Text>
        </TouchableOpacity>

        {/* recent post modal */}
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
  floating: {
    width: 58,
    height: 58,
    marginBottom: 15,
    justifyContent: 'center',
    backgroundColor: '#FFB4B4',
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 5,
    shadowRadius: 10,
  },
  floatingText: {
    fontSize: 12,
    fontFamily: 'NanumSquareR',
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default MainScreen;
