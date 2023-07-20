import React, { useCallback, useState } from 'react';
import {View, StyleSheet, Modal, Text, Pressable, ImageBackground, FlatList} from 'react-native';
import InitialProfileImage from '../assets/initial-profile-image.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import StudentListModal from '../components/modal/StudentListModal';


export default function StudentListPage({navigation}: any) {

  //모달
  const [pageSize, setPageSize] = useState(10);

  //getStudentList
  const getStudentList = async () =>{
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

  //모달로 보여줄 아이템 가져오기
  const _RenderItem = useCallback(({ item }: any) => {
    return (
      <StudentListModal item={item} />
    );
  }, []);

  const studentQuery = useQuery({
    queryKey: ["student-list"], 
    queryFn: getStudentList
  })

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
            alignSelf:'center',
            backgroundColor: '#FFFFFF'
          }}
          numColumns={1}
          />
        </View>
      ) : (<Text>등록된 학생이 없습니다.</Text>)}
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
