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
import {useQuery, useQueryClient} from '@tanstack/react-query';
import GuidePage from './GuidePage';
import Config from 'react-native-config';
import store, { turn } from '../../Achievement'
import { useSelector, useDispatch } from "react-redux";

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

  // get user badgeList
  const getBadgeList = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/badge-list?userId=${userData.userId}`,
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
  
  const achieveQuery = useQuery({
    queryKey: ['badge-list'],
    queryFn: getBadgeList,
  });

  // get Achievement
  const ac = store.getState().achieve
  const dispatch = useDispatch();
     
  useEffect(() => {
    if (!achieveQuery.isLoading) {
      const arr = JSON.parse(achieveQuery.data.data.replace(/'/g, "\""));
      for (let i = 0; i < 10; i++) {
        if (arr[i]==true && !ac.includes(i+1)) {
          dispatch(turn(i + 1));
        }
      }
    }
  }, []);

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

  const [postId, setpostId] = useState(0);

  const mainPostQuery = useQuery({
    queryKey: ['main-posting-list'],
    queryFn: getPostingList,
  });

  const _RenderItem = useCallback(({item}: any) => {
    return <MainPost item={item} navigation={navigation} />;
  }, []);

  return (
    <View style={{height: '100%'}}>
      <NoticeModal navigation={navigation} />

      <View>
        {!mainPostQuery.isLoading && (
          <>
            {mainPostQuery.data ? (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={mainPostQuery.data.data}
                  contentContainerStyle={{
                    paddingBottom: 170,
                  }}
                  renderItem={_RenderItem}
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
