import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import InfoIcon from '../../assets/info-icon.svg';
import Hamburger from '../../assets/hamburger.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginTop: 14,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 13,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 5,
    shadowRadius: 10,
    borderColor: '#D9D9D9',
    borderWidth: 1,
  },
  titleText: {
    fontFamily: 'NanumSquareB',
    color: '#000000',
    marginTop: -5,
    marginBottom: 3,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  InfoTitle: {
    fontFamily: 'NanumSquareR',
    marginTop: 0,
    marginLeft: 10,
    fontSize: 12,
    color: '#909090',
  },
  hamburgerview: {
    flex:1,
    flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
  },
  noticeContent: {
    flex:8,
  }
});

type UserData = {
  groupCode: string;
};

//@ts-ignore
export default function NoticeModal({navigation}) {
  const queryClient = useQueryClient();

  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  const getRecentNotice = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/notice/recent-one?groupCode=${userData.groupCode}`,
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

  const recentNoticeQuery = useQuery({
    queryKey: ['recent-notice'],
    queryFn: getRecentNotice,
  });

  return (
    <View style={styles.container}>
      {!recentNoticeQuery.isLoading && recentNoticeQuery.data.data && (
          <>
      <InfoIcon />
      <View style={styles.noticeContent}>
        <Text style={styles.titleText}>공지 사항</Text>
        <Text style={styles.InfoTitle} numberOfLines={1}>
        {recentNoticeQuery.data.data === null
                    ? '아직 등록된 공지가 없습니다.'
                    : recentNoticeQuery.data.data.noticeTitle}
                    {/* // : "일단 이렇게"} */}
        </Text>
      </View>
      <View style={styles.hamburgerview}>
      <Hamburger
        style={{margin: 5}}
        onPress={() => navigation.navigate('NoticeList')}
      />
      </View>
      </>
        )}
    </View>
  );
}
