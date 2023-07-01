import React, { useCallback, useState } from 'react';
import {FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PencilIcon from '../../assets/pencil-icon.svg';
import FriendList from '../../assets/friend-list.svg';
import BadgeList from '../../assets/badge-list.svg';
import { useQuery } from '@tanstack/react-query';
import Config from "react-native-config";

//@ts-ignore
export default function MyPage({navigation}) {
  const [pageSize, setPageSize] = useState(24);

  // get profile
  const getProfileDetail = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/profile/detail?profileId=${1}`,{
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

  // get post list
  const getPostingList = async () =>{
    try{
      const res = await fetch(`http://localhost:8080/api/post/user-list?userId=${"narsha3333"}`,{
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

  const _RenderItem = useCallback(({ item }: any) => {
    const imageArray = item.imageArray.substring(1,item.imageArray.length-2).split(', ')
    return (
      <TouchableOpacity onPress={() => {
          navigation.navigate("PostDetailPage", {"detail": item})
        }}>
        <ImageBackground
          source={{ uri: imageArray[0] }}
          style={[styles.img]}
          imageStyle={{borderRadius: 10}}
        >
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

  const profileQuery = useQuery({
    queryKey: ["profile-detail"], 
    queryFn: getProfileDetail
  })

  const postQuery = useQuery({
    queryKey: ["posting-list"], 
    queryFn: getPostingList
  })

  
  return (
    <View style={styles.container}>
      {!profileQuery.isLoading && (
      <>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageContianer}>
            <Image 
              source = {{uri : profileQuery.data.profileImage}}
              style={styles.profile}/>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 15, padding: 2}}>
            {profileQuery.data.nikname}
          </Text>
          <Text style={{fontSize: 12, padding: 1}}>
            {profileQuery.data.birth}
          </Text>
          <Text style={{fontSize: 13, padding: 2}}>
            {profileQuery.data.intro}
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row', marginTop: 5}}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 10,
                padding: 2,
              }}>
              프로필 수정
            </Text>
            <View style={{paddingTop: 20, }}>
              <PencilIcon />
            </View>
          </TouchableOpacity>
        </View>
        {postQuery.data ? (
        <View style={{marginTop: 20}}>
        <FlatList
          data={postQuery.data}
          renderItem={_RenderItem}
          key={'#'}
          keyExtractor={(item, index) => '#' + index.toString()}
          // 페이징 처리
          onEndReached={() => {
            setPageSize(pageSize + 24);
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 0.5,
            justifyContent: 'space-around',
            alignSelf:'center'
          }}
          numColumns={3}
        />
        </View>
      ) : (<Text>이미지가 없습니다.</Text>)}
        <View style={styles.btnbox}>
          <TouchableOpacity onPress={() => navigation.navigate('FriendList')}>
            <View style={styles.btn}>
              <FriendList />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BadgeList')}>
            <View style={styles.btn}>
              <BadgeList />
            </View>
          </TouchableOpacity>
        </View>
      </>
      )}
    </View> 
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 90,
    height: 90,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
  },
  profileImageContianer:{
    backgroundColor: '#D9D9D9',
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  profileContainer: {
    backgroundColor: '#FCFDE1',
    width: '100%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  postingListContentContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    paddingTop: 40,
  },
  content: {
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderRadius: 10,
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  image: {
    borderRadius: 10,
    width: 110,
    height: 110,
  },
  postingListContainer: {
    flex: 1,
  },
  btnbox: {
    flexDirection: 'column',
    position: 'absolute',
    top: '29%',
    left: '70%',
  },
  btn: {
    padding: 2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginHorizontal: 5
  },
});
