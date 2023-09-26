import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import StudentListModal from '../components/modal/StudentListModal';
import Config from 'react-native-config';

type UserData = {
  groupCode: string;
};

export default function StudentListPage({navigation}: any) {
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  //모달
  const [pageSize, setPageSize] = useState(10);

  //getStudentList
  const getStudentList = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/student-list?groupCode=${userData.groupCode}`,
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
    return <StudentListModal item={item} />;
  }, []);

  const studentQuery = useQuery({
    queryKey: ['student-list'],
    queryFn: getStudentList,
  });

  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      {!studentQuery.isLoading && (
        <>
          {studentQuery.data ? (
            <View>
              <FlatList
                data={studentQuery.data.data}
                renderItem={_RenderItem}
                // extraData={this.state}
                key={'#'}
                keyExtractor={(item, index) => '#' + index.toString()}
                // 페이징 처리
                onEndReached={() => {
                  setPageSize(pageSize + 10);
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 40,
                  paddingBottom: 500,
                  flexGrow: 0.5,
                  justifyContent: 'space-around',
                  alignSelf: 'center',
                  backgroundColor: '#FFFFFF',
                }}
                numColumns={1}
              />
            </View>
          ) : (
            <Text>등록된 학생이 없습니다.</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  studentListContainer: {
    marginTop: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
