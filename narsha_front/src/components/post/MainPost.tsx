import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import basicProfile from '../../assets/graphic/basic-profile.jpg';
import images from '../../assets/images.jpeg';
import Chat from '../../assets/chat.svg';
import heartDesel from '../../assets/heart-desel.png';
import heartSel from '../../assets/heart-sel.png';
import Swiper from 'react-native-web-swiper';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Config from 'react-native-config';

type UserData = {
  userId: string;
  groupCode: string;
};

// @ts-ignore
const MainPost = ({item, navigation}: any) => {
  const postId = item.postId;
  const image = item.imageArray;
  const str = image.slice(1, -1);
  const imageArray = str.split(', ');
  for (let i = 0; i < imageArray.length; i++) {
    imageArray[i] = imageArray[i].toString();
  }
  const queryClient = useQueryClient();
  const itemQueryKey = ['itemData', postId];
  const itemLikeQueryKey = ['itemLikeData', postId];
  const itemCountLikeQueryKey = ['itemCountLikeData', postId];
  const [isLiked, setIsLiked] = useState(false);

  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get like list
  const getLikeList = async () => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/like/list?postId=${postId}`,
      );
      const data = await response.json();
      if (data.status === 200) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };

  //좋아요 누르기
  const createLike = useMutation(async () => {
    try {
      const res = await fetch(`http://${Config.HOST_NAME}/api/like/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.userId,
          groupCode: userData.groupCode,
          postId: postId,
        }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  //좋아요 여부 확인하기
  const getLike = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/like/check?userId=${userData.userId}&groupCode=${userData.groupCode}&postId=${postId}`,
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

  //좋아요 취소하기
  const deleteLike = useMutation(async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/like/delete?userId=${userData.userId}&groupCode=${userData.groupCode}&postId=${postId}`,
        {
          method: 'DELETE',
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
  });

  //최신 댓글 1개 가져오기
  const getrecentComment = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/comment/recent?postId=${postId}`,
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

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/comment/list?postId=${postId}`,
      );
      const data = await response.json();
      if (data.status === 200) {
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  };

  // const likeQuery = useQuery(['likes'], getLikeList);

  const checkLikeQuery = useQuery({
    queryKey: ['check-like'],
    queryFn: getLike,
  });

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery(['comments'], fetchComments);

  const len = comments ? comments.length : 0;

  // const mainLikeQuery = useQuery(['mainLikes'], getLikeList);

  const uploadLike = async () => {
    try {
      const data = await createLike.mutateAsync();

      if (data.status === 200) {
        // checkLikeQuery.refetch();
        setIsLiked(true);
        // queryClient.invalidateQueries(['likes']);
        queryClient.invalidateQueries(['itemCountLikeData', postId]);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startDeleteLike = async () => {
    try {
      const data = await deleteLike.mutateAsync();
      setIsLiked(false);
      // queryClient.invalidateQueries(['mainLikes']);
      queryClient.invalidateQueries(['itemCountLikeData', postId]);
    } catch (error) {
      console.log(error);
    }
  };

  const {data: itemData} = useQuery(itemQueryKey, () => {
    return getrecentComment();
  });

  const {data: itemLikeData} = useQuery(itemLikeQueryKey, () => {
    return getLike();
  });

  const {data: itemCountLikeData} = useQuery(itemCountLikeQueryKey, () => {
    return getLikeList();
  });

  return (
    <View>
      {item.user &&
        !checkLikeQuery.isLoading &&
        checkLikeQuery.data &&
        itemData &&
        itemLikeData &&
        itemCountLikeData && (
          <View style={styles.container}>
            <View style={styles.userInfo}>
              <Image
                source={
                  item.user.profileImage
                    ? {uri: item.user.profileImage}
                    : basicProfile
                }
                style={styles.userImg}
              />
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 18,
                  fontFamily: 'NanumSquareR',
                }}>
                {item.user.userId}
              </Text>
            </View>

            <View style={styles.pickImg}>
              <Swiper
                loop
                controlsEnabled={false}
                containerStyle={{width: 350, height: 350}}>
                {imageArray.map((item, index) => (
                  <View key={index}>
                    <Image source={{uri: item}} style={styles.pickImg} />
                  </View>
                ))}
              </Swiper>
            </View>

            <View style={styles.likeContainer}>
              {/* 하트 작업 */}
              {isLiked === true ? (
                <TouchableOpacity onPress={startDeleteLike}>
                  <Image source={heartSel} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={uploadLike}>
                  <Image source={heartDesel} />
                </TouchableOpacity>
              )}
              {/* comment page */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('LikeListPage', {id: postId})
                }>
                {itemCountLikeData && itemCountLikeData.length !== 0 ? (
                  <Text style={styles.likeText}>
                    {
                      itemCountLikeData[itemCountLikeData.length - 1].userId
                        .userId
                    }
                    님
                    {itemCountLikeData.length - 1 == 0 ? (
                      <Text>이 좋아합니다.</Text>
                    ) : (
                      <Text>
                        외 {itemCountLikeData.length - 1}명이 좋아합니다.{' '}
                      </Text>
                    )}
                  </Text>
                ) : (
                  <Text style={styles.likeText}>좋아요를 눌러주세요!</Text>
                )}
              </TouchableOpacity>
            </View>

            <Text style={styles.postContent}>{item.content}</Text>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CommentListPage', {id: postId})
                }>
                <Text
                  style={{
                    marginTop: 15,
                    color: '#61A257',
                    fontFamily: 'NanumSquareR',
                    marginHorizontal: 10,
                  }}>
                  댓글 {len}개 전체 보기
                </Text>
              </TouchableOpacity>
            </View>
            {itemData.data === null ? (
              <View style={{flexDirection: 'row', marginTop: 15}}></View>
            ) : (
              <View style={styles.commentContainer}>
                <Image
                  source={{
                    uri: itemData.data.userId.profileImage.substring(
                      0,
                      itemData.data.userId.profileImage.length,
                    ),
                  }}
                  style={styles.cmtUserImg}
                />
                <View style={styles.commentBox}>
                  <Text style={styles.commentUserId}>
                    {itemData.data.userId.userId}
                  </Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={styles.commentContent}>
                    {itemData.data.content}
                  </Text>
                </View>
              </View>
            )}
            <View style={{flexDirection: 'row'}}>
              <View style={styles.line} />
            </View>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    fontFamily: 'NanumSquareR',
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  pickImg: {
    alignSelf: 'center',
    height: 350,
    width: 350,
    borderRadius: 10,
  },
  cmtUserImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  line: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#c0c0c0',
    marginVertical: 15,
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
  },
  likeText: {
    color: '#909090',
    marginLeft: 5,
    margin: 10,
    fontFamily: 'NanumSquareR',
    fontSize: 13,
  },
  postContent: {
    fontSize: 15,
    marginTop: 10,
    margin: 10,
    fontFamily: 'NanumSquareR',
  },
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 10,
    alignItems: 'flex-start',
  },
  commentBox: {
    flex: 1,
  },
  commentUserId: {
    fontSize: 16,
    fontFamily: 'NanumSquareB',
    marginBottom: 3,
  },
  commentContent: {
    fontFamily: 'NanumSquareR',
  },
});

export default MainPost;
