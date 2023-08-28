import React, {useCallback, useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PencilIcon from '../../assets/pencil-icon.svg';
import FriendList from '../../assets/friend-list.svg';
import BadgeList from '../../assets/badge-list.svg';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Config from 'react-native-config';

type UserData = {
  userId: string;
  userType: string;
  groupCode: string;
};

//@ts-ignore
export default function MyPage({navigation}) {
  const [pageSize, setPageSize] = useState(24);
  const queryClient = useQueryClient();

  // queryClient에서 userId와 userType을 가져오는 로직
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get profile
  const getProfileDetail = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/user/detail?userId=${userData.userId}`,
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

  // get post listd
  const getPostingList = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/post/user-post-list?userId=${userData.userId}`,
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

  const _RenderItem = useCallback(({item}: any) => {
    const imageArray = item.imageArray
      .substring(1, item.imageArray.length - 1)
      .split(', ');

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PostDetailPage', {detail: item});
        }}
        style={styles.imgShadow}>
        <ImageBackground
          source={{uri: imageArray[0]}}
          style={[styles.img]}
          imageStyle={{borderRadius: 10}}
        />
      </TouchableOpacity>
    );
  }, []);

  const profileQuery = useQuery({
    queryKey: ['profile-detail'],
    queryFn: getProfileDetail,
  });

  const PostQuery = useQuery({
    queryKey: ['posting-list'],
    queryFn: getPostingList,
  });

  return (
    <View style={styles.container}>
      {!profileQuery.isLoading && (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContianer}>
              <Image
                source={
                  profileQuery.data.data.profileImage !== null
                    ? {uri: profileQuery.data.data.profileImage}
                    : require('../../assets/graphic/basic-profile.jpg')
                }
                style={styles.profile}
              />
            </View>
            <Text
              style={{
                fontFamily: 'NanumSquareB',
                color: '#000000',
                fontSize: 15,
                padding: 2,
              }}>
              {profileQuery.data.data.nikname === null
                ? '닉네임을 작성해주세요.'
                : profileQuery.data.data.nikname}
            </Text>
            <Text
              style={{
                fontFamily: 'NanumSquareR',
                color: '#000000',
                fontSize: 12,
                padding: 2,
              }}>
              {profileQuery.data.data.birth === null
                ? '생일을 아직 등록하지 않았어요.'
                : profileQuery.data.data.birth}
            </Text>
            <Text
              style={{
                fontFamily: 'NanumSquareR',
                color: '#000000',
                fontSize: 12.5,
                padding: 3,
              }}>
              {profileQuery.data.data.intro === null
                ? '소개글을 아직 쓰지 않았어요.'
                : profileQuery.data.data.intro}
            </Text>
            <TouchableOpacity
              style={{flexDirection: 'row', marginTop: 5}}
              onPress={() => navigation.navigate('EditProfile')}>
              <Text
                style={{
                  fontFamily: 'NanumSquareB',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: 10,
                  padding: 2,
                }}>
                프로필 수정
              </Text>
              <View style={{paddingTop: 3}}>
                <PencilIcon />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{height: 10}} />
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
          {PostQuery.data.data ? (
            <View style={{marginTop: 10}}>
              <FlatList
                data={PostQuery.data.data}
                renderItem={_RenderItem}
                key={'#'}
                keyExtractor={(item, index) => '#' + index.toString()}
                // 페이징 처리
                onEndReached={() => {
                  setPageSize(pageSize + 24);
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 400,
                  marginHorizontal: 30,
                  flexGrow: 0.5,
                  justifyContent: 'flex-start',
                  alignContent: 'flex-start',
                  // flexDirection: 'column-reverse',
                  backgroundColor: '#FFFFFF',
                }}
                numColumns={3}
                // columnWrapperStyle={{ flexDirection: 'row-reverse' }}
              />
            </View>
          ) : (
            <Text>이미지가 없습니다.</Text>
          )}
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
  profileImageContianer: {
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
    backgroundColor: '#FFFFFF',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    // margin:5,
  },
  imgShadow: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    elevation: 2,
  },
});
