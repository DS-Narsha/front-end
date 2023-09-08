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
import Line from '../assets/Line.svg';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Heart from '../assets/heart.svg';
import HeartFill from '../assets/heartFill.svg';
import {ScrollView} from 'react-native-gesture-handler';
import SEND from '../assets/send-btn.svg';
import {TextInput} from 'react-native-gesture-handler';
import Swiper from 'react-native-web-swiper';
import basicProfile from '../assets/graphic/basic-profile.jpg';
import Config from 'react-native-config';

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

  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

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
      const json = await res.json();
      return json;
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

  const uploadLike = async () => {
    try {
      const data = await createLike.mutateAsync();

      if (data.status === 200) {
        checkLikeQuery.refetch();
        await countLike.mutateAsync();
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
    await countLike.mutateAsync();
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

  return (
    <View>
      {!postQuery.isLoading &&
        postQuery.data &&
        !checkLikeQuery.isLoading &&
        !countLike.isLoading && (
          <>
            <ScrollView>
              <View style={styles.txtContainer}>
                <Image
                  source={{uri: postQuery.data.data.writer.profileImage}}
                  style={styles.userImg}
                />
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
                    containerStyle={{width: 300, height: 325}}>
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

              <View style={styles.txtContainer}>
                {/* 여기에서 하트 처리 */}
                {checkLikeQuery.data.data === true ? (
                  <TouchableOpacity onPress={startDeleteLike}>
                    <HeartFill style={{marginLeft: 10}} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={uploadLike}>
                    <Heart style={{marginLeft: 10}} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => navigation.navigate('LikeListPage', {id: id})}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#909090',
                      marginTop: 0,
                      margin: 10,
                      fontFamily: 'NanumSquareR',
                    }}>
                    Narsha님 외 56명이 좋아합니다
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.contentContainer}>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 0,
                    margin: 10,
                    fontFamily: 'NanumSquareR',
                  }}>
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

              <View style={{margin: 15, marginLeft: 35, marginBottom: 200}}>
                <Line />

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CommentListPage', {id: id})
                  }>
                  <Text
                    style={{
                      marginTop: 15,
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

                          <View style={{marginTop: 5}}>
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
              <Image
                source={{uri: postQuery.data.data.writer.profileImage}}
                style={styles.cmtUserImg3}
              />
              <TextInput
                onChangeText={(text: React.SetStateAction<string>) =>
                  setCommentContent(text)
                }
                value={commentContent}
                style={styles.input}
                placeholder="@아이디 로 글 남기기"
              />
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <SEND style={{top: 5}} />
              </TouchableOpacity>
            </View>
          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  txtContainer: {
    flexDirection: 'row',
    marginLeft: 35,
    marginTop: 15,
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
    marginLeft: 35,
    marginTop: 15,
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  pickImg: {
    height: 300,
    width: 300,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  cmtUserImg1: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  cmtUserImg2: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  cmtBody: {
    flexDirection: 'row',
    marginTop: 15,
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
    marginLeft: 10,
  },
  input: {
    width: '75%',
    fontFamily: 'NanumSquareB',
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
