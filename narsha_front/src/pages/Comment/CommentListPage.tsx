import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CommentSendSvg from '../../assets/comment-send.svg';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useQuery} from '@tanstack/react-query';
import basicProfile from '../../assets/graphic/basic-profile.jpg';
import Config from 'react-native-config';
import Arrow from '../../assets/text-arrow.svg';
import store, {turn} from '../../../Achievement';
import {useDispatch} from 'react-redux';
import LoadingModal from '../../components/modal/CommentLoadingModal';
import FilterModal from '../../components/modal/CommentFilterModal';

// 댓글 목록 페이지

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
  userType: string;
};

//@ts-ignore
const CommentListPage = ({route, navigation}) => {
  const postId = route.params.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [commentContent, setCommentContent] = useState('');
  // const [filteredText, setFilteredText] = useState('');
  const queryClient = useQueryClient();
  // let textFilterArray: string[] = [];
  let textIndexArray: any[] = [];
  let totalIndexArray: any[] = [];
  let personalIndexArray: any[] = [];
  let curseData: any;
  const [replaceWord, setReplaceWord] = useState('');
  const [replaceWordVisible, setReplaceWordVisible] = useState(false);

  // queryClient에서 userId와 userType을 가져오는 로직
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // 사용자 프로필 불러오기
  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/user/detail?userId=${userId}`,
      );
      const data = await response.json();
      if (response.ok) {
        setProfileImage(data.data.profileImage);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('사용자 프로필을 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    if (userData && userData.userId) {
      fetchUserProfile(userData.userId);
    }
  }, [userData]);

  // 포스트에 해당되는 댓글 목록 불러오기
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

  const commentMutation = useMutation(async () => {
    const response = await fetch(
      `http://${Config.HOST_NAME}/api/comment/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postId,
          userId: userData.userId,
          content: commentContent,
        }),
      },
    );

    const data = await response.json();
    return data;
  });

  //텍스트 필터링
  const textFilter = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/ai-flask/text-filter?text=${commentContent}`,
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

  const ac = store.getState().achieve;
  const dispatch = useDispatch();

  const handleCommentSubmit = async () => {
    try {
      startTextFilter();
      setModalVisible(false);

      !ac.includes(3) ? handleCmtAchi() : null;
    } catch (error) {
      Alert.alert('오류');
    }
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
      return json;
    } catch (err) {
      console.log(err);
    }
  });

  const handleCmtAchi = async () => {
    try {
      dispatch(turn(3));
      await updateCmtAchi.mutateAsync();
    } catch (error) {}
  };

  const textFilterQuery = useQuery({
    queryKey: ['text-filtering'],
    queryFn: textFilter,
    enabled: false,
  });

  const startTextFilter = async () => {
    try {
      setLoadingModalVisible(true);
      const resData = await textFilterQuery.refetch();
      setLoadingModalVisible(false);

      if (resData.data.status === 200) {
        const inputData = JSON.parse(resData['data']['data'])['input'];
        const resultData = JSON.parse(resData['data']['data'])['result'];
        curseData = resultData.curse;
        const totalData = resultData.total;
        const personalData = resultData.personal;

        let sentence = '';
        let midSentence = '';
        let lastSentence = '';

        //clean한 문장
        if (resultData === true) {
          setReplaceWordVisible(false);
          await commentMutation.mutateAsync();
          queryClient.invalidateQueries(['comments']);
          setCommentContent('');
        } else {
          //bad한 문장

          // curse에 대한 처리
          if (curseData !== null) {
            const curseKeys = Object.keys(curseData);
            //시작 인덱스 가져오기
            for (let i = 0; i < curseKeys.length; i++) {
              const index = inputData.indexOf(curseKeys[i]);
              textIndexArray.push(index);
            }

            //문자열 위치에 맞게 정렬
            const combinedArray = curseKeys.map((item, index) => ({
              curseKeysItem: item,
              textIndexArrayItem: textIndexArray[index],
            }));
            combinedArray.sort(
              (a, b) => a.textIndexArrayItem - b.textIndexArrayItem,
            );
            const sortedcurseKeys = combinedArray.map(
              item => item.curseKeysItem,
            );
            const sortedtextIndexArray = combinedArray.map(
              item => item.textIndexArrayItem,
            );

            let num = 0;
            for (let i = 0; i < sortedtextIndexArray.length; i++) {
              sentence +=
                inputData.slice(num, sortedtextIndexArray[i]) +
                '{' +
                inputData.slice(
                  sortedtextIndexArray[i],
                  sortedtextIndexArray[i] + sortedcurseKeys[i].length,
                ) +
                '}';
              num += sortedtextIndexArray[i] + sortedcurseKeys[i].length;
              if (i == sortedtextIndexArray.length - 1) {
                sentence += inputData.slice(
                  sortedtextIndexArray[i] + sortedcurseKeys[i].length,
                  inputData.length,
                );
              }
            }
          } else {
            sentence = inputData;
          }
          if (totalData[0] !== null) {
            //문장의 시작 인덱스 가져오기
            for (let i = 0; i < totalData.length; i++) {
              const index = sentence.indexOf(totalData[i]);
              totalIndexArray.push(index);
            }

            //문장 배열들 정렬
            const combinedArray = totalData.map((item, index) => ({
              totalDataItem: item,
              totalIndexArrayItem: totalIndexArray[index],
            }));
            combinedArray.sort(
              (a, b) => a.totalIndexArrayItem - b.totalIndexArrayItem,
            );
            const sortedtotalData = combinedArray.map(
              item => item.totalDataItem,
            );
            const sortedtotalIndexArray = combinedArray.map(
              item => item.totalIndexArrayItem,
            );

            //문자 삽입
            let num = 0;
            for (let i = 0; i < sortedtotalIndexArray.length; i++) {
              midSentence +=
                sentence.slice(num, sortedtotalIndexArray[i]) +
                '{' +
                sentence.slice(
                  sortedtotalIndexArray[i],
                  sortedtotalIndexArray[i] + sortedtotalData[i].length,
                ) +
                '}';
              num += sortedtotalIndexArray[i] + sortedtotalData[i].length;
              if (i == sortedtotalIndexArray.length - 1) {
                midSentence += sentence.slice(
                  sortedtotalIndexArray[i] + sortedtotalData[i].length,
                  sentence.length,
                );
              }
            }
          } else {
            midSentence = sentence;
          }
          if (personalData[0] !== null) {
            //개인정보 시작 인덱스 가져오기
            for (let i = 0; i < personalData.length; i++) {
              const index = midSentence.indexOf(personalData[i]);
              personalIndexArray.push(index);
            }

            //개인정보 배열 정렬
            const combinedArray = personalData.map((item, index) => ({
              personalDataItem: item,
              personalIndexArrayItem: personalIndexArray[index],
            }));
            combinedArray.sort(
              (a, b) => a.personalIndexArrayItem - b.personalIndexArrayItem,
            );
            const sortedpersonalData = combinedArray.map(
              item => item.personalDataItem,
            );
            const sortedpersonalIndexArray = combinedArray.map(
              item => item.personalIndexArrayItem,
            );

            //문자 삽입
            let num = 0;
            for (let i = 0; i < sortedpersonalIndexArray.length; i++) {
              lastSentence +=
                midSentence.slice(num, sortedpersonalIndexArray[i]) +
                '*' +
                midSentence.slice(
                  sortedpersonalIndexArray[i],
                  sortedpersonalIndexArray[i] + sortedpersonalData[i].length,
                ) +
                '*';
              num += sortedpersonalIndexArray[i] + sortedpersonalData[i].length;
              if (i == sortedpersonalIndexArray.length - 1) {
                lastSentence += midSentence.slice(
                  sortedpersonalIndexArray[i] + sortedpersonalData[i].length,
                  midSentence.length,
                );
              }
            }
          } else {
            lastSentence = midSentence;
          }

          setCommentContent(lastSentence);
          setReplaceWord(curseData);
          //대체단어 리스트 보이는 코드
          if (curseData === null) {
            setReplaceWordVisible(false);
          } else {
            setReplaceWordVisible(true);
          }
          setModalVisible(true);
        }

        // console.log(res);
      } else {
        setLoadingModalVisible(false);
        console.log(resData.data.message);
        Alert.alert('텍스트 필터링 실패', resData.data.message);
      }
    } catch (error) {
      setLoadingModalVisible(false);
      console.log(error);
      Alert.alert('오류', '텍스트 필터링 중 오류 발생');
    }
  };

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery(['comments'], fetchComments);

  if (isLoading) {
    return (
      <View style={styles.container}>{/* <Text>로딩 중...</Text> */}</View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>댓글을 불러오는 중 오류가 발생했습니다</Text>
      </View>
    );
  }

  const keyboardBehavior =
    Platform.OS === 'ios'
      ? 'position'
      : Platform.OS === 'android'
      ? 'height'
      : 'height';
  // 뒤로가기 버튼을 눌렀을 때 현재 스택의 정보 출력
  const handleGoBack = () => {
    console.log('뒤로가기');
    navigation.pop();
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.commentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          {comments.length !== 0 ? (
            comments.map((comment: Comment, index: number) => (
              <View style={styles.commentItem} key={index}>
                {comment.userId.profileImage ? (
                  <Image
                    source={{uri: comment.userId.profileImage}}
                    style={styles.commentImage}
                  />
                ) : (
                  <Image source={basicProfile} style={styles.commentImage} />
                )}

                <View style={styles.commentTextBox}>
                  <Text style={styles.commentID}>{comment.userId.userId}</Text>
                  <View style={{marginRight: 35}}>
                    <Text style={styles.commentText}>{comment.content}</Text>
                  </View>
                  <Text style={styles.commentDay}>
                    {comment.createAt.replace('T', ' ').slice(0, 16)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.nonComment}>
              아직 댓글이 없네요~!{'\n'}여러분이 게시글에 첫 번째 댓글을
              작성해볼까요?
            </Text>
          )}
        </ScrollView>
      </View>

      {/* 모달창 */}
      <FilterModal modalVisible={modalVisible}/>

      {/* loading modal */}
      <LoadingModal loadingModalVisible={loadingModalVisible}/>

      <View
        style={[
          styles.replaceWordContainer,
          {display: replaceWordVisible ? 'flex' : 'none'},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.uploadContentTitle}>대체어 목록</Text>
          {replaceWord &&
            Object.keys(replaceWord).map((key, index) => {
              const value = replaceWord[key as keyof typeof replaceWord];
              if (value !== null) {
                return (
                  <View
                    key={index}
                    style={styles.replaceWordTextContainer}>
                    <Text style={[styles.replaceWordText, {color: '#FF0000'}]}>{`${key}`}</Text>
                    <Arrow style={{marginHorizontal: 13, marginVertical: 3}} />
                    <Text style={[styles.replaceWordText, {color: '#000000'}]}>{`${value}`}</Text>
                  </View>
                );
              } else {
                return (
                  <View
                    key={index}
                    style={styles.replaceWordTextContainer}>
                    <Text style={[styles.replaceWordText, {color: '#FF0000'}]}>{`${key}`}</Text>
                    <Arrow style={{marginHorizontal: 13, marginVertical: 3}} />
                    <Text style={[styles.replaceWordText, {color: '#0000FF'}]}>삭제</Text>
                  </View>
                );
              }
            })}
        </ScrollView>
      </View>
      <View style={styles.inputBody}>
        {profileImage !== '' && profileImage ? (
          <Image source={{uri: profileImage}} style={styles.userProfileImage} />
        ) : (
          <Image source={basicProfile} style={styles.userProfileImage} />
        )}
        <TextInput
          onChangeText={(text: React.SetStateAction<string>) =>
            setCommentContent(text)
          }
          value={commentContent}
          style={styles.input}
          placeholder={'@' + userData.userId + '로 댓글 남기기'}
        />
        <TouchableOpacity onPress={handleCommentSubmit}>
          <CommentSendSvg />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  nonComment: {
    fontFamily: 'NanumSquareB',
    textAlign: 'center',
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
  input: {
    width: '80%',
    fontFamily: 'NanumSquareB',
  },
  commentContainer: {
    backgroundColor: '#ffffff',
    height: '92%',
    marginBottom: 0,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
    padding: 10,
  },
  commentImage: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  userProfileImage: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  commentTextBox: {
    marginLeft: 20,
  },
  commentID: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'NanumSquareB',
  },
  commentText: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'NanumSquareR',
  },
  commentDay: {
    fontSize: 14,
    fontFamily: 'NanumSquareR',
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomInputText: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    width: '68%',
    height: 42,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 10,
    fontFamily: 'NanumSquareR',
  },
  uploadContentTitle: {
    fontSize: 16,
    color: '#61A257',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    fontWeight: '700',
    fontFamily: 'NanumSquareB',
  },
  replaceWordContainer: {
    backgroundColor: '#F9FAC8',
    left: 0,
    right: 0,
    height: 100,
    position: 'absolute',
    bottom: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  replaceWordTextContainer: {
    flexDirection: 'row', 
    marginLeft: 25
  },
  replaceWordText: {
    fontFamily: 'NanumSquareB',
    marginVertical: 3,
  },
});

export default CommentListPage;
