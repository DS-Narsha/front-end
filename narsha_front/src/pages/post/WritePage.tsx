import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import SendBtn from '../../assets/send-btn.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Check from '../../assets/ic-check.svg';
import ObjectLabel from '../../data/objectLabel.json';
import Config from 'react-native-config';
import basicProfile from '../../assets/graphic/basic-profile.jpg';
import Arrow from '../../assets/text-arrow.svg';
import ImageGuideModal from '../../components/modal/WriteImageGuideModal';
import TextLoadingModal from '../../components/modal/WriteTextLoadingModal';
import FilterModal from '../../components/modal/WriteFilterModal';

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
  groupCode: string;
};

//@ts-ignore
const WritePage = ({route, navigation}) => {
  const resPhoto = JSON.parse(route.params['objectDetect']['data'])['image'];
  const objectDetect = JSON.parse(route.params['objectDetect']['data'])[
    'result'
  ];
  const objectImgSize = JSON.parse(route.params['objectDetect']['data'])[
    'size'
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // 선택된 이미지의 인덱스 상태

  // 현재 선택된 이미지의 데이터를 저장할 상태 추가
  const [selectedImage, setSelectedImage] = useState(resPhoto[0]);
  // 프로필 이미지
  const [profileImage, setProfileImage] = useState('');
  // badge
  const [badgeList, setBadgeList] = useState([]);

  const [content, onChangeContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  let textIndexArray: any[] = [];
  let totalIndexArray: any[] = [];
  let personalIndexArray: any[] = [];
  let curseData: any;
  const [replaceWord, setReplaceWord] = useState('');
  // const [postId, onChangePostId] = useState();
  // let postId = 0;

  const [clickLabel, setClickLabel] = useState(true);

  // modal state
  const [guideModalVisible, setGuideModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  // 사용자 아이디, 그룹 코드 가져오기
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // 이미지 선택 시 호출되는 함수
  const handleImageSelect = (index: number) => {
    setSelectedImage(resPhoto[index]);
    setSelectedImageIndex(index);
  };

  // 모달 타이머
  useEffect(() => {
    setGuideModalVisible(true);
    guideTimeout;
    return () => {
      clearTimeout(guideTimeout);
    };
  }, []);
  // modal timer
  const guideTimeout = setTimeout(() => {
    setGuideModalVisible(false);
  }, 3000);

  // 사용자 프로필 불러오기
  const fetchUserProfile = async (userId: string) => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/user/detail?userId=${userId}`,
      );
      const data = await response.json();
      if (response.ok) {
        setProfileImage(data.data.profileImage);
        setBadgeList(data.data.badgeList);
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

  const uploadPostMutation = useMutation((formData: FormData) =>
    fetch(`http://${Config.HOST_NAME}/api/post/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then(response => response.json()),
  );

  const handlePostUpload = async () => {
    // fromData 만들기
    try {
      let formData = new FormData(); // from-data object
      for (let i in resPhoto) {
        formData.append(
          'images',
          resPhoto.length && {
            uri: `data:image/jpeg;base64,${resPhoto[i]}`,
            name: `image${i}.jpg`,
            type: 'image/jpg',
          },
        );
      }
      formData.append(
        'info',
        JSON.stringify({
          groupCode: userData.groupCode,
          writer: userData.userId,
          content: content,
        }),
      );
      formData.append('fileType', 'png');

      // useMutation으로 업로드 함수 실행
      const postData = await uploadPostMutation.mutateAsync(formData);

      if (postData.status === 200) {
        // AI 댓글 달기
        const postId = postData.data.postId;
        getAIComment(postId);
        // 업적(첫 게시물) 완료
        AchieveMutateFunc.mutate();
        // setLoadingModalVisible(true);
        navigation.reset({routes: [{name: 'MainNavigator'}]});
      } else {
        console.log('포스트 업로드 중 오류가 발생했습니다.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  // AI 댓글 달기
  const getAIComment = async (postId: number) => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/comment/create/chat?postId=${postId}`,
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

  // 포스트가 업로드될 때마다 실행
  // const AICommentQuery = useQuery({
  //   queryKey: ['AI-comment'],
  //   queryFn: getAIComment,
  //   enabled: false,
  // });

  // achieve mutate //
  // uploading post
  const updateWriteAchieve = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/check-achieve?userId=${
          userData.userId
        }&achieveNum=${1}`,
        {
          method: 'PUT',
        },
      );

      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  // onMutate
  const mutateAchieve = async () => {
    // get old data
    const oldData = await queryClient.getQueryData(['badge-list']);
    // setting datas at UI, 특정 속성 수정
    queryClient.setQueryData(['badge-list', 'data', 'data'], userData.userId);
    // if error -> rollback
    return () => queryClient.setQueryData(['badge-list'], oldData);
  };

  // useMutation: post
  const AchieveMutateFunc = useMutation(['update-badge'], {
    mutationFn: () => updateWriteAchieve(),
    onMutate: mutateAchieve,
    onError: (error, variable, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['badge-list']);
    },
  });

  //텍스트 필터링
  const fetchTextFilter = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/ai-flask/text-filter?text=${content}`,
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

  const handlePostSubmit = async () => {
    try {
      startTextFilter();
    } catch (error) {
      Alert.alert('오류');
    }
  };

  const postTextFilterQuery = useQuery({
    queryKey: ['post-text-filtering'],
    queryFn: fetchTextFilter,
    enabled: false,
  });

  const startTextFilter = async () => {
    try {
      setLoadingModalVisible(true);
      const resData = await postTextFilterQuery.refetch();
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
          handlePostUpload(); // upload
          !badgeList[0] && AchieveMutateFunc.mutate();
          navigation.reset({routes: [{name: 'MainNavigator'}]});
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
          //필터링된 문장으로 저장
          onChangeContent(lastSentence);
          setReplaceWord(curseData);
          setModalVisible(true);
        }
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

  return (
    <View style={styles.container}>
      {/* 헤더 부분 */}
      <View style={styles.top}>
        <View style={styles.progressbox}>
          <ArrowLeft />
          <View style={styles.progress}>
            <View style={[styles.dot, {backgroundColor: '#98DC63'}]} />
            <View style={[styles.dot, {backgroundColor: '#98DC63'}]} />
            <View style={[styles.dot, {backgroundColor: '#98DC63'}]} />
          </View>
          <TouchableOpacity
            onPress={() => {
              handlePostSubmit();
            }}>
            <SendBtn />
          </TouchableOpacity>
        </View>
        <Text>글을 작성해볼까요?</Text>
      </View>
      {/* 사진 부분 */}
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 10}}>
        <View>
          <View style={styles.largeImageContainer}>
            <TouchableOpacity
              onPress={() => setClickLabel(!clickLabel)}
              activeOpacity={1}>
              <ImageBackground
                source={{uri: `data:image/jpeg;base64,${selectedImage}`}}
                style={styles.largeImage}
                imageStyle={{borderRadius: 10}}>
                {clickLabel && objectDetect[selectedImageIndex].length > 0 ? (
                  <View
                    style={
                      objectStyles(
                        objectDetect[selectedImageIndex],
                        objectImgSize[selectedImageIndex],
                      ).objectBox
                    }>
                    <Text style={styles.objectText}>
                      {ObjectLabel[objectDetect[selectedImageIndex][0]['name']]}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {/* 내가 선택한 이미지 부분 */}
          <View style={styles.uploadContentBox}>
            <View style={{marginTop: 10}}>
              <Text style={styles.uploadContentTitle}>내가 선택한 이미지</Text>
              <FlatList
                horizontal
                data={resPhoto}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={[styles.imageContainer]}
                    onPress={() => handleImageSelect(index)} // 이미지 클릭 시 선택된 이미지의 인덱스 업데이트
                  >
                    <Image
                      source={{uri: `data:image/jpeg;base64,${item}`}}
                      style={[
                        styles.smallImage,
                        objectDetect[index].length > 0 && styles.maskingImage,
                      ]}
                    />
                    {index === selectedImageIndex && (
                      <View style={styles.selectedText}>
                        <Check />
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              />
              {/* height */}
              <View style={{height: 30}}></View>
              {/* 대체어 */}
              <View>
                <Text style={styles.uploadContentTitle}>대체어 목록</Text>
                {replaceWord &&
                  Object.keys(replaceWord).map((key, index) => {
                    const value = replaceWord[key as keyof typeof replaceWord];
                    if (value !== null) {
                      return (
                        <View
                          key={index}
                          style={styles.replaceWordTextContainer}>
                          <Text
                            style={[
                              styles.replaceWordText,
                              {color: '#FF0000'},
                            ]}>{`${key}`}</Text>
                          <Arrow
                            style={{marginHorizontal: 13, marginVertical: 3}}
                          />
                          <Text
                            style={[
                              styles.replaceWordText,
                              {color: '#000000'},
                            ]}>{`${value}`}</Text>
                        </View>
                      );
                    } else {
                      return (
                        <View
                          key={index}
                          style={styles.replaceWordTextContainer}>
                          <Text
                            style={[
                              styles.replaceWordText,
                              {color: '#FF0000'},
                            ]}>{`${key}`}</Text>
                          <Arrow
                            style={{marginHorizontal: 13, marginVertical: 3}}
                          />
                          <Text
                            style={[
                              styles.replaceWordText,
                              {color: '#0000FF'},
                            ]}>
                            삭제
                          </Text>
                        </View>
                      );
                    }
                  })}
              </View>
              {/* height */}
              <View style={{height: 13}}></View>
              {/* writing box*/}
              <Text style={styles.uploadContentTitle}>글 작성하기</Text>
              <View style={styles.writingBox}>
                {/* 프로필 이미지 */}
                {profileImage ? (
                  <Image source={{uri: profileImage}} style={styles.profile} />
                ) : (
                  <Image source={basicProfile} style={styles.profile} />
                )}
                <TextInput
                  placeholder="여러분의 글을 작성해주세요."
                  value={content}
                  textAlignVertical="top"
                  multiline={true}
                  onChangeText={onChangeContent}
                  style={styles.content}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* post guide modal */}
      <ImageGuideModal guideModalVisible={guideModalVisible} />

      {/* loading modal */}
      <TextLoadingModal loadingModalVisible={loadingModalVisible} />

      {/* 모달창 */}
      <FilterModal modalVisible={modalVisible} />
    </View>
  );
};

//@ts-ignore
const objectStyles = (detect, size) =>
  StyleSheet.create({
    objectBox: {
      display: 'flex',
      position: 'absolute',
      top: (detect[0]['xmin'] + detect[0]['xmax']) / 2 / (size[0] / 300),
      left: (detect[0]['ymin'] + detect[0]['ymax']) / 2 / (size[1] / 300),
      backgroundColor: '#AADF98a1',
      padding: 5,
      borderRadius: 10,
      borderColor: 'white',
      borderWidth: 1,
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F1A9',
    height: '100%',
  },
  top: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 105,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#F9FAC8',
    shadowOffset: {
      width: 5,
      height: -10,
    },
    elevation: 10,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressbox: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 21,
    height: 21,
    borderRadius: 50,
    margin: 20,
  },
  uploadContentBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: {
      width: 5,
      height: -10,
    },
    elevation: 10,
    padding: 7,
  },
  uploadContentTitle: {
    fontSize: 16,
    color: '#61A257',
    paddingBottom: 8,
    marginHorizontal: 15,
    fontWeight: '700',
    fontFamily: 'NanumSquareR',
  },
  largeImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  largeImage: {
    height: 300,
    width: 300,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  maskingImage: {
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 10,
  },
  imageContainer: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#C0C0C0',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  selectedText: {
    position: 'absolute',
    top: '95%',
    left: '97%',
    transform: [{translateX: -50}, {translateY: -50}],
    padding: 5,
    borderRadius: 5,
    fontFamily: 'NanumSquareR',
  },
  content: {
    flex: 1,
    height: 140,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    padding: 10,
    marginBottom: 15,
    fontFamily: 'NanumSquareR',
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#C0C0C0',
    marginRight: 13,
  },
  writingBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  objectText: {
    fontFamily: 'NanumSquareR',
    fontSize: 15,
  },
  replaceWordTextContainer: {
    flexDirection: 'row',
    marginLeft: 25,
  },
  replaceWordText: {
    fontFamily: 'NanumSquareB',
    marginVertical: 3,
  },
});

export default WritePage;
