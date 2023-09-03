import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import DS from '../assets/DS.png';
import SingleInfo from '../components/SingleInfo';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Config from 'react-native-config';

type UserData = {
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

  return (
    <View style={styles.body}>
      {!noticeQuery.isLoading && (
        <>
          <View style={styles.ds_container}>
            <Image style={styles.ds_image} source={DS} />
            <Text
              style={
                styles.ds_text
              }>{`선생님이 여러분 모두에게 알리기 위한 내용들은 이 곳에 올라온답니다.`}</Text>
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
  ds_container: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  ds_image: {
    width: 49,
    height: 49,
    borderRadius: 50,
  },
  ds_text: {
    flex: 1,
    marginLeft: 7,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 8,
    fontFamily: 'NanumSquareB',
    color: '#61A257',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
});
