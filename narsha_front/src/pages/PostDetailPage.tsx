import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import heartDesel from '../assets/heart-desel.png';
import heartSel from '../assets/heart-sel.png';
import {ScrollView} from 'react-native-gesture-handler';
import SEND from '../assets/send-btn.svg';
import {TextInput} from 'react-native-gesture-handler';
import Swiper from 'react-native-web-swiper';
import basicProfile from '../assets/graphic/basic-profile.jpg';
import Config from 'react-native-config';
import store, {turn} from '../../Achievement';
import {useDispatch} from 'react-redux';

type Comment = {
  userId: {
    userId: string;
    profileImage: string;
  };
  content: string;
  createAt: string;
};

type UserData = {
  userId: string;
  groupCode: string;
};

//@ts-ignore
export default function PostDetail({route, navigation}) {
  const id = route.params.detail.postId;
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [userProfileImage, setUserProfileImage] = useState('');

  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get like list
  const getLikeList = async () => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/like/list?postId=${id}`,
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

  const likeQuery = useQuery(['likes'], getLikeList);

  // get post detail
  const getPostDetail = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/post/detail?postId=${id}&groupCode=${userData.groupCode}&userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      if (res.ok) {
        setProfileImage(data.data.writer.profileImage);
        return data;
      } else throw new Error(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // 포스트에 해당되는 댓글 목록 불러오기
  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/comment/list?postId=${id}`,
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

  const ac = store.getState().achieve;
  const dispatch = useDispatch();

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
          postId: id,
        }),
      });
      const json = await res.json();
      console.log('like' + ac);
      // !(ac.include(2))? handleLikeAchi():null;
      console.log('done');
      return json;
    } catch (err) {
      console.log(err);
    }
  });

  //좋아요 여부 확인하기
  const getLike = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/like/check?userId=${userData.userId}&groupCode=${userData.groupCode}&postId=${id}`,
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

  // get profile
  const getProfileDetail = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/detail?userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      if (data.status == 200) {
        setUserProfileImage(data.data.profileImage);
        return data;
      } else throw new Error(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  //좋아요 취소하기
  const deleteLike = useMutation(async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/like/delete?userId=${userData.userId}&groupCode=${userData.groupCode}&postId=${id}`,
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

  //좋아요 개수
  const countLike = useMutation(async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/like/count?groupCode=${userData.groupCode}}&postId=${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  });

  const commentMutation = useMutation(async () => {
    const response = await fetch(
      `http://${Config.HOST_NAME}/api/comment/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: id,
          userId: userData.userId,
          content: commentContent,
        }),
      },
    );

    const data = await response.json();
    return data;
  });

  // 댓글 생성
  const handleCommentSubmit = async () => {
    try {
      //setLoadingModalVisible(true);
      await commentMutation.mutateAsync();

      // setLoadingModalVisible(false);
      setModalVisible(false);
      queryClient.invalidateQueries(['comments']);

      setCommentContent('');
      // !(ac.include(3))? console.log("none 3"):null;
    } catch (error) {
      Alert.alert('오류');

      setModalVisible(false);
    }
  };

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery(['comments'], fetchComments);

  const len = comments ? comments.length : 0;

  // query
  const postQuery = useQuery({
    queryKey: ['post-detail'],
    queryFn: getPostDetail,
  });

  const checkLikeQuery = useQuery({
    queryKey: ['check-like'],
    queryFn: getLike,
  });

  const profileQuery = useQuery({
    queryKey: ['profile-detail'],
    queryFn: getProfileDetail,
  });

  const uploadLike = async () => {
    try {
      const data = await createLike.mutateAsync();

      if (data.status === 200) {
        checkLikeQuery.refetch();
        queryClient.invalidateQueries(['likes']);
        // likeQuery.refetch(); // refetch
        //await countLike.mutateAsync();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startDeleteLike = async () => {
    const data = await deleteLike.mutateAsync();
    checkLikeQuery.refetch();
    queryClient.invalidateQueries(['likes']);
    // likeQuery.refetch(); // refetch
    //await countLike.mutateAsync();
  };

  const [a, setA] = useState<string[]>([]);

  useEffect(() => {
    const makeArr = async () => {
      const data = await getPostDetail();
      if (data) {
        const str = data ? data.data.imageArray.slice(1, -1) : '';
        const arr = str.split(', ');

        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].toString();
        }

        setA(arr);
      }
    };

    makeArr();
  }, [postQuery.data]);

  const dateToStr = date => {
    var week = new Array('일', '월', '화', '수', '목', '금', '토');

    var localTime = date.toLocaleTimeString();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayName = week[date.getDay()];

    return (
      year +
      '년 ' +
      month +
      '월 ' +
      day +
      '일 ' +
      dayName +
      '요일 ' +
      localTime.substring(0, 5)
    );
  };

  // update comment achievement
  const updateCmtAchi = useMutation(async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/check-achieve?userId=${
          userData.userId
        }&achieveNum=${3}`,
        {
          method: 'PUT',
        },
      );

      const json = await res.json();
      dispatch(turn(3));
      return json;
    } catch (err) {
      console.log(err);
    }
  });

  const handleCmtAchi = async () => {
    try {
      await updateCmtAchi.mutateAsync();
    } catch (error) {}
  };

  // update Like achievement
  const updateLikeAchi = useMutation(async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/check-achieve?userId=${
          userData.userId
        }&achieveNum=${2}`,
        {
          method: 'PUT',
        },
      );

      const json = await res.json();
      dispatch(turn(2));
      return json;
    } catch (err) {
      console.log(err);
    }
  });

  const handleLikeAchi = async () => {
    try {
      await updateLikeAchi.mutateAsync();
    } catch (error) {}
  };

  return (
    <View>
      {!postQuery.isLoading &&
        postQuery.data &&
        !checkLikeQuery.isLoading &&
        !countLike.isLoading && (
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.userInfo}>
                {profileImage !== '' && profileImage ? (
                  <Image source={{uri: profileImage}} style={styles.userImg} />
                ) : (
                  <Image source={basicProfile} style={styles.userImg} />
                )}
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 18,
                    fontFamily: 'NanumSquareB',
                  }}>
                  {postQuery.data.data.writer.userId}
                </Text>
              </View>

              <View style={styles.imgContainer}>
                {a.length > 0 ? (
                  <Swiper
                    loop
                    controlsEnabled={false}
                    containerStyle={{width: 350, height: 350}}>
                    {a.map((item, index) => (
                      <View key={index}>
                        <Image
                          key={index}
                          source={{uri: item}}
                          style={styles.pickImg}
                        />
                      </View>
                    ))}
                  </Swiper>
                ) : (
                  <View />
                )}
              </View>

              <View style={styles.likeContainer}>
                {/* 여기에서 하트 처리 */}
                {checkLikeQuery.data.data === true ? (
                  <TouchableOpacity onPress={startDeleteLike}>
                    <Image source={heartSel} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={uploadLike}>
                    <Image source={heartDesel} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate('LikeListPage', {id: id})}>
                  {likeQuery.data && likeQuery.data.length !== 0 ? (
                    <Text style={styles.likeText}>
                      {likeQuery.data[likeQuery.data.length - 1].userId.userId}
                      님
                      {likeQuery.data.length - 1 == 0 ? (
                        <Text>이 좋아합니다.</Text>
                      ) : (
                        <Text>
                          외 {likeQuery.data.length - 1}명이 좋아합니다.{' '}
                        </Text>
                      )}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#909090',
                        margin: 10,
                        fontFamily: 'NanumSquareR',
                      }}>
                      좋아요를 눌러주세요!
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.postContent}>
                  {postQuery.data.data.content}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: '#909090',
                    marginTop: 0,
                    margin: 10,
                    fontFamily: 'NanumSquareR',
                  }}>
                  {dateToStr(new Date(postQuery.data.data.createAt))}
                </Text>
              </View>

              <View style={styles.commentContainer}>
                <View style={styles.line} />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CommentListPage', {id: id})
                  }>
                  <Text
                    style={{
                      marginTop: 5,
                      color: '#61A257',
                      fontFamily: 'NanumSquareR',
                    }}>
                    댓글 {len}개 전체 보기
                  </Text>
                </TouchableOpacity>

                <View>
                  {comments ? (
                    comments.map((comment: Comment, index: number) =>
                      index < 5 ? (
                        <View style={styles.cmtBody} key={index}>
                          {comment.userId.profileImage ? (
                            <Image
                              source={{uri: comment.userId.profileImage}}
                              style={styles.cmtUserImg2}
                            />
                          ) : (
                            <Image
                              source={basicProfile}
                              style={styles.cmtUserImg2}
                            />
                          )}

                          <View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                fontFamily: 'NanumSquareB',
                              }}>
                              {comment.userId.userId}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'NanumSquareR',
                                marginRight: 50,
                              }}>
                              {comment.content}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View key={index}></View>
                      ),
                    )
                  ) : (
                    <View />
                  )}
                </View>
              </View>
            </ScrollView>

            {/* 모달창 */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.modalTitleArea}>
                    <Text style={styles.modalTitleText}>
                      여러분들의 댓글을 수정해주세요!
                    </Text>
                  </View>
                  <Text style={styles.modalText}>
                    색깔로 표시된 글자를 모두 수정해야
                  </Text>
                  <Text style={styles.modalText}>
                    SNS에 게시글을 올릴 수 있어요.
                  </Text>
                  <Text style={styles.modalText}>
                    여러분의 댓글을 수정해볼까요?
                  </Text>

                  <View style={styles.modalAlertArea}>
                    <View style={styles.alertBody}>
                      <Text style={styles.red}></Text>
                      <Text style={styles.alertText}>
                        개인정보, 민간한 정보가 포함되었을 경우
                      </Text>
                    </View>
                    <View style={styles.alertBody}>
                      <Text style={styles.blue}></Text>
                      <Text style={styles.alertText}>
                        욕설, 비속어의 말이 포함되었을 경우
                      </Text>
                    </View>
                  </View>
                  <View style={styles.modalBtnArea}>
                    <TouchableOpacity
                      style={[styles.button]}
                      onPress={handleCommentSubmit}>
                      <Text style={styles.textStyle}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View style={styles.inputBody}>
              {userProfileImage !== '' && userProfileImage ? (
                <Image
                  source={{uri: userProfileImage}}
                  style={styles.cmtUserImg3}
                />
              ) : (
                <Image source={basicProfile} style={styles.cmtUserImg3} />
              )}
              <TextInput
                onChangeText={(text: React.SetStateAction<string>) =>
                  setCommentContent(text)
                }
                value={commentContent}
                style={styles.input}
                placeholder={'@' + userData.userId + '로 댓글 남기기'}
              />
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <SEND style={{top: 5}} />
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 10,
  },
  commentContainer: {
    marginHorizontal: 10,
    marginBottom: 200,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    fontFamily: 'NanumSquareR',
    marginTop: 15,
  },
  likeText: {
    fontSize: 13,
    color: '#909090',
    margin: 10,
    fontFamily: 'NanumSquareR',
  },
  imgContainer: {
    // display:'flex',
    // height:'auto',
    // alignItems:'center',
    // marginBottom:-15,
    // marginLeft:50
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: 5,
    marginTop: 15,
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  pickImg: {
    height: 350,
    width: 350,
    borderRadius: 10,
  },
  postContent: {
    fontSize: 15,
    marginTop: 0,
    margin: 10,
    fontFamily: 'NanumSquareR',
  },
  cmtUserImg1: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  cmtUserImg2: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  cmtBody: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'flex-start',
  },
  inputBody: {
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    bottom: 0,
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
  cmtUserImg3: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
  },
  input: {
    width: '75%',
    fontFamily: 'NanumSquareB',
  },
  line: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#c0c0c0',
    marginVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalTitleArea: {
    backgroundColor: '#AADF98',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
    width: '121%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitleText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'NanumSquareB',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtnArea: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#AADF98',
    width: 115,
    marginTop: 20,
    marginRight: 15,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#D9D9D9',
    width: 115,
    marginTop: 20,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 2,
    fontFamily: 'NanumSquareB',
  },
  modalText: {
    marginBottom: 3,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'NanumSquareR',
  },
  modalAlertArea: {
    marginTop: 25,
  },
  alertBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  red: {
    backgroundColor: 'red',
    width: 14,
    height: 14,
    borderRadius: 50,
  },
  blue: {
    backgroundColor: 'blue',
    width: 14,
    height: 14,
    borderRadius: 50,
  },
  alertText: {
    color: 'black',
    fontSize: 12,
    marginLeft: 7,
    paddingBottom: 5,
    fontFamily: 'NanumSquareR',
  },
});
