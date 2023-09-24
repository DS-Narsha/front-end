import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import SingleInfo from '../components/SingleInfo';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Config from 'react-native-config';
import store, { turn } from '../../Achievement'
import { useDispatch } from "react-redux";


type UserData = {
  userId:String,
  groupCode: string;
};

// @ts-ignore
export default function NoticeList({navigation}) {
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  const [pageSize, setPageSize] = useState(5);

  //getNoticeList
  const getNoticeList = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/notice/list?groupCode=${userData.groupCode}`,
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

  //모달로 보여줄 아이템 가져오기
  const _RenderItem = useCallback(({item}: any) => {
    return <SingleInfo item={item} />;
  }, []);

  const noticeQuery = useQuery({
    queryKey: ['notice-list'],
    queryFn: getNoticeList,
  });

  // get Achievement
  const ac = store.getState().achieve
  const dispatch = useDispatch();

  // update achievement
  const updateAchi = useMutation(async (num) => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/check-achieve?userId=${
          userData.userId
        }&achieveNum=${num}`,
        {
          method: 'PUT',
        },
      );

      const json = await res.json();

      if (res.ok) {
        dispatch(turn(num));
      } else {
        throw new Error(json.message);
      }

    } catch (err) {
      console.log(err);
    }
  });

  const handleAchi = async () => {
    try {
      await updateAchi.mutateAsync(9);
    } catch (error) {}
  };

  // handleAchi();
  useEffect(()=> {
    !(ac.includes(9)) && handleAchi();
  }, [])

  return (
    <View style={styles.body}>
      {!noticeQuery.isLoading && (
        <>
          <View style={styles.dsContainer}>
            <Image
              style={styles.dsImage}
              source={require('../assets//graphic/applogo.png')}
            />
            <Text
              style={
                styles.dsText
              }>{`선생님이 여러분 모두에게 알리기 위한 내용들은 \n이 곳에 올라온답니다.`}</Text>
          </View>
          <View style={{backgroundColor: '#FCFDE1'}}>
            {noticeQuery.data ? (
              <View>
                <FlatList
                  data={noticeQuery.data.data}
                  renderItem={_RenderItem}
                  // extraData={this.state}
                  key={'#'}
                  keyExtractor={(item, index) => '#' + index.toString()}
                  // 페이징 처리
                  onEndReached={() => {
                    setPageSize(pageSize + 5);
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingTop: 10,
                    paddingBottom: 500,
                    flexGrow: 0.5,
                    justifyContent: 'space-around',
                    alignSelf: 'center',
                    flexDirection: 'column-reverse',
                    backgroundColor: '#FCFDE1',
                  }}
                  numColumns={1}
                />
              </View>
            ) : (
              <Text>등록된 공지가 없습니다.</Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flexDirection: 'column',
    backgroundColor: '#FCFDE1',
  },
  dsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  dsImage: {
    width: 49,
    height: 49,
    borderRadius: 50,
  },
  dsText: {
    flex: 1,
    marginLeft: 7,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    fontSize: 13,
    fontFamily: 'NanumSquareB',
    color: '#61A257',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
});
