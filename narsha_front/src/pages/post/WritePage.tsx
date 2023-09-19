import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import SendBtn from '../../assets/send-btn.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Check from '../../assets/ic-check.svg';
import ObjectLabel from '../../data/objectLabel.json';
import Config from 'react-native-config';
import Arrow from '../../assets/text-arrow.svg';

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
  // params data
  const resPhoto = route.params['resPhoto']['photos'];
  const objectDetect = JSON.parse(route.params['objectDetect']['data'])[
    'result'
  ];
  const objectImgSize = JSON.parse(route.params['objectDetect']['data'])[
    'size'
  ];

  let currentPhoto = useRef(resPhoto[0]);
  const [selPhoto, useSelPhoto] = useState(resPhoto[0]);
  const [selIndex, useSelIndex] = useState(0);
  const [content, onChangeContent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  let textIndexArray: any[] = [];
  let totalIndexArray: any[] = [];
  let personalIndexArray: any[] = [];
  let curseData: any;
  const [replaceWord, setReplaceWord] = useState('');
  // const [postId, onChangePostId] = useState();
  let postId = 0;
  // console.log(objectDetect);
  // console.log(objectImgSize);
  const [clickLabel, setClickLabel] = useState(true);

  // modal state
  const [guideModalVisible, setGuideModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  // get query data
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // modal timer
  const guideTimeout = setTimeout(() => {
    setGuideModalVisible(false);
  }, 3000);

  // modal timer
  // const loadingTimeout = setTimeout(() => {
  //   setLoadingModalVisible(false);

  // }, 3000);

  useEffect(() => {
    setGuideModalVisible(true);
    guideTimeout;
    return () => {
      clearTimeout(guideTimeout);
    };
  }, []);

  // render item
  const _RenderItem = useCallback(({item, index}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          currentPhoto.current = item;
          useSelPhoto(item);
          useSelIndex(index);
        }}>
        <ImageBackground
          source={{uri: item}}
          style={[styles.img, currentPhoto.current === item && styles.selPhoto]}
          imageStyle={{borderRadius: 10}}>
          {currentPhoto.current === item && (
            <Text style={styles.selPhotoText}>선택</Text>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

  // get profile //
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
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const profileQuery = useQuery({
    queryKey: ['profile-detail'],
    queryFn: getProfileDetail,
  });

  // uploading post //
  const uploadPost = async () => {
    try {
      let formData = new FormData(); // from-data object
      for (let i in resPhoto) {
        formData.append(
          'images',
          resPhoto.length && {
            uri: resPhoto[i],
            name: resPhoto[i],
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
      const res = await fetch(`http://${Config.HOST_NAME}/api/post/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const json = await res.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  // onMutate
  const mutatePost = async () => {
    // get old data
    const oldData = await queryClient.getQueryData(['posting-list']);
    // setting datas at UI, 특정 속성 수정
    queryClient.setQueryData(
      ['posting-list', 'data', 'user', 'userId'],
      userData.userId,
    );
    queryClient.setQueryData(['posting-list', 'data', 'content'], content);
    queryClient.setQueryData(['posting-list', 'data', 'imageArray'], resPhoto);

    // if error -> rollback
    return () => queryClient.setQueryData(['posting-list'], oldData);
  };

  const getAIComment = async () => {
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

  const AICommentQuery = useQuery({
    queryKey: ['AI-comment'],
    queryFn: getAIComment,
    enabled: false,
  });

  // useMutation: post
  const {mutate} = useMutation(['profile-update'], {
    mutationFn: () => uploadPost(),
    onMutate: mutatePost,
    onSuccess: data => {
      console.log(data.data.postId);
      // onChangePostId(data.data.postId);
      postId = data.data.postId;
      console.log(postId);
      AICommentQuery.refetch();
    },
    onError: (error, variable, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['profile-detail']);
    },
  });
  console.log('여기입니당' + objectDetect[selIndex]);

  // achieve mutate //
  // uploading post
  const updateAchieve = async () => {
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
      console.log(json);
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
    mutationFn: () => (updateAchieve()),
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
    const textFilter = async () => {
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
        console.log(json);
        console.log(JSON.parse(JSON.stringify(json)));
        
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
      queryFn: textFilter,
      enabled: false,
    });
  
    const startTextFilter = async () => {
      try {
        console.log(content);
        
        setLoadingModalVisible(true); 
        const resData = await postTextFilterQuery.refetch();
        setLoadingModalVisible(false);
        
        if (resData.data.status === 200) {
          const inputData =JSON.parse(resData['data']['data'])[
            'input'
          ];
          console.log(inputData);
          const resultData = JSON.parse(resData['data']['data'])[
            'result'
          ];
          console.log(resultData);
          curseData = resultData.curse;
          console.log(curseData);
          const totalData = resultData.total;
          console.log(totalData);
          const personalData = resultData.personal;
          console.log(personalData);
  
          let sentence = "";
          let midSentence = "";
          let lastSentence = "";
          
          //clean한 문장
          if ( resultData === true ) {
            {
  
            }
            mutate();
              !JSON.parse(profileQuery.data.data.badgeList)[0] &&
                AchieveMutateFunc.mutate();
              navigation.reset({routes: [{name: 'MainNavigator'}]});
          } else {
            //bad한 문장
            
            // curse에 대한 처리
            if(curseData !== null){
              const curseKeys = Object.keys(curseData);
              console.log(curseKeys);
              //시작 인덱스 가져오기
              for (let i = 0; i < curseKeys.length; i++) {
                console.log(curseKeys[i]);
                const index = inputData.indexOf(curseKeys[i]);
                textIndexArray.push(index);
              }
    
              console.log(textIndexArray); //인덱스
    
              //문자열 위치에 맞게 정렬
              const combinedArray = curseKeys.map((item, index) => ({
                curseKeysItem: item,
                textIndexArrayItem: textIndexArray[index]
              }));
              combinedArray.sort((a, b) => a.textIndexArrayItem - b.textIndexArrayItem);
              const sortedcurseKeys = combinedArray.map(item => item.curseKeysItem);
              const sortedtextIndexArray = combinedArray.map(item => item.textIndexArrayItem);
    
              
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
            if(totalData[0] !== null){
              
              //문장의 시작 인덱스 가져오기
              for (let i = 0; i < totalData.length; i++) {
                console.log(totalData[i]);
                const index = sentence.indexOf(totalData[i]);
                totalIndexArray.push(index);
              }
  
              console.log(totalIndexArray);
  
              //문장 배열들 정렬
              const combinedArray = totalData.map((item, index) => ({
                totalDataItem: item,
                totalIndexArrayItem: totalIndexArray[index]
              }));
              combinedArray.sort((a, b) => a.totalIndexArrayItem - b.totalIndexArrayItem);
              const sortedtotalData = combinedArray.map(item => item.totalDataItem);
              const sortedtotalIndexArray = combinedArray.map(item => item.totalIndexArrayItem);
  
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
            if(personalData[0] !== null){
  
              //개인정보 시작 인덱스 가져오기
              for (let i = 0; i < personalData.length; i++) {
                console.log(personalData[i]);
                const index = midSentence.indexOf(personalData[i]);
                personalIndexArray.push(index);
              }
  
              console.log(personalIndexArray);
  
              //개인정보 배열 정렬
              const combinedArray = personalData.map((item, index) => ({
                personalDataItem: item,
                personalIndexArrayItem: personalIndexArray[index]
              }));
              combinedArray.sort((a, b) => a.personalIndexArrayItem - b.personalIndexArrayItem);
              const sortedpersonalData = combinedArray.map(item => item.personalDataItem);
              const sortedpersonalIndexArray = combinedArray.map(item => item.personalIndexArrayItem);
  
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
      {/* top */}
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
              // loadingTimeout;
              // return () => {
              //   clearTimeout(loadingTimeout);
              // };
            }}>
            <SendBtn />
          </TouchableOpacity>
        </View>
        <Text>글을 작성해볼까요?</Text>
      </View>
      {!profileQuery.isLoading && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* content */}
          <View style={styles.contentContainer}>
            <View style={styles.selectPhotoBox}>
              <TouchableOpacity
                onPress={() => setClickLabel(!clickLabel)}
                activeOpacity={1}>
                <ImageBackground
                  source={{uri: currentPhoto.current}}
                  style={styles.pickImg}
                  imageStyle={{borderRadius: 10}}>
                  {clickLabel &&
                  JSON.parse(objectDetect[selIndex].length) > 2 ? (
                    <View
                      style={
                        objectStyles(
                          JSON.parse(objectDetect[selIndex]),
                          objectImgSize[selIndex],
                        ).objectBox
                      }>
                      <Text style={styles.objectText}>
                        {
                          ObjectLabel[
                            JSON.parse(objectDetect[selIndex])[0]['name']
                          ]
                        }
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </ImageBackground>
              </TouchableOpacity>
              <View style={{alignItems: 'center', marginTop: 20}}></View>
            </View>
            {/*posting container*/}
            <ScrollView
              style={styles.uploadContentBox}
              showsVerticalScrollIndicator={false}>
              <View style={{marginTop: 20}}>
                {/*select image list box*/}
                <Text style={styles.uploadContentTitle}>
                  내가 선택한 이미지
                </Text>
                {resPhoto ? (
                  <FlatList
                    data={resPhoto}
                    renderItem={_RenderItem}
                    key={'#'}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => '#' + index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      marginHorizontal: 30,
                      flexGrow: 1,
                      justifyContent: 'flex-start',
                      alignSelf: 'flex-start',
                    }}
                    numColumns={5}
                  />
                ) : (
                  <Text>이미지가 없습니다.</Text>
                )}
                {/* height */}
                <View style={{height: 30}}></View>
                {/* 대체어 */}
                <View>
                  <Text style={styles.uploadContentTitle}>대체어 목록</Text>
                  {replaceWord && Object.keys(replaceWord).map((key, index) => {
                    const value = replaceWord[key as keyof typeof replaceWord];
                    if (value !== null) {
                      return (
                        <View key={index} style={{ flexDirection: 'row', marginLeft: 25 }}>
                          <Text style={{ color: "#FF0000", fontFamily: 'NanumSquareB', marginVertical: 3}}>{`${key}`}</Text>
                          <Arrow style={{marginHorizontal: 13, marginVertical: 3}}/>
                          <Text style={{ color: "#000000", fontFamily: 'NanumSquareB', marginVertical: 3}}>{`${value}`}</Text>
                        </View>
                      );
                    }else {
                      return (
                        <View key={index} style={{ flexDirection: 'row', marginLeft: 25 }}>
                          <Text style={{ color: "#FF0000", fontFamily: 'NanumSquareB', marginVertical: 3}}>{`${key}`}</Text>
                          <Arrow style={{marginHorizontal: 13, marginVertical: 3}}/>
                          <Text style={{ color: "#0000FF", fontFamily: 'NanumSquareB', marginVertical: 3}}>삭제</Text>
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
                  <Image
                    source={
                      profileQuery.data.data.profileImage !== null
                        ? {uri: profileQuery.data.data.profileImage}
                        : require('../../assets/graphic/basic-profile.jpg')
                    }
                    style={styles.profile}></Image>
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
            </ScrollView>
          </View>
          {/* post guide modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={guideModalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalBody}>
                  <Check style={styles.modalIcon} />
                  <View style={styles.modalText}>
                    <Text style={styles.strongText}>
                      이미지에서 여러분의 민감한 정보들을 가리는 과정이
                      끝났어요! {'\n'}어떤 이미지가 가려졌는지 확인해볼까요?
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          {/* loading modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={loadingModalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalBody}>
                  <ActivityIndicator
                    size="large"
                    color="#98DC63"
                    style={styles.modalIcon}
                  />
                  <View style={styles.modalText}>
                    <Text style={styles.strongText}>
                      게시글에 부적절한 내용이 있는지 확인 중이에요!
                      {'\n'}잠시만 기다려주세요.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          {/* 모달창 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.filterModalCenteredView}>
          <View style={styles.filterModalView}>
            <View style={styles.filterModalTitleArea}>
              <Text style={styles.filterModalTitleText}>
                여러분들의 댓글을 수정해주세요!
              </Text>
            </View>
            <Text style={styles.filterModalText}>
              기호로 감싸진 글자를 모두 수정해야
            </Text>
            <Text style={styles.filterModalText}>SNS에 게시글을 올릴 수 있어요.</Text>
            <Text style={styles.filterModalText}>여러분의 댓글을 수정해볼까요?</Text>

            <View style={styles.filterModalAlertArea}>
              <View style={styles.alertBody}>
                <Text style={styles.alertInfo}>*개인정보*</Text>
                <Text style={styles.alertText}>
                  개인정보, 민간한 정보가 포함되었을 경우
                </Text>
              </View>
              <View style={styles.alertBody}>
                <Text style={styles.alertInfo}>{'{'}욕설{'}'}</Text>
                <Text style={styles.alertText}>
                  욕설, 비속어의 말이 포함되었을 경우
                </Text>
              </View>
            </View>
            <View style={styles.filterModalBtnArea}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.filterTextStyle}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

        </ScrollView>
      )}
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 70,
    marginRight: 56,
  },
  progressbox: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 21,
    height: 21,
    borderRadius: 50,
    margin: 20,
  },
  pickImg: {
    height: 300,
    width: 300,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#C0C0C0',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
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
  },
  writingBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#C0C0C0',
    marginRight: 13,
  },
  content: {
    flex: 1,
    height: 200,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    padding: 10,
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 7,
    justifyContent: 'center',
  },
  img: {
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
    width: 55,
    height: 55,
    margin: 5,
    resizeMode: 'cover',
  },
  selectPhotoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selPhotoText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  selPhoto: {
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },
  uploadContentTitle: {
    fontSize: 16,
    color: '#61A257',
    marginBottom: 10,
    marginHorizontal: 15,
    fontWeight: '700',
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  modalView: {
    display: 'flex',
    margin: 20,
    width: '90%',
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHead: {
    flex: 0.5,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#AADF98',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalEnd: {
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalIcon: {
    marginRight: 15,
  },
  modalText: {
    flexDirection: 'row',
    flex: 1,
  },
  btn: {
    backgroundColor: '#AADF98',
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  modalTitleText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  strongText: {
    fontSize: 13,
    fontWeight: '200',
    color: '#000000',
  },
  modalContent: {
    marginLeft: 10,
    fontSize: 14,
    color: '#909090',
  },
  objectText: {
    fontFamily: 'NanumSquareR',
    fontSize: 15,
  },
  filterModalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(150, 150, 150, 0.5)',
  },
  filterModalView: {
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
  filterModalTitleArea: {
    backgroundColor: '#AADF98',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
    width: '121%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  filterModalTitleText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'NanumSquareB',
  },
  filterModalText: {
    marginBottom: 3,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'NanumSquareR',
  },
  filterModalAlertArea: {
    marginTop: 25,
  },
  filterModalBtnArea: {
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
  alertBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  alertInfo: {
    color: 'black',
    fontSize: 12.5,
    marginLeft: 7,
    paddingBottom: 5,
    fontFamily: 'NanumSquareB',
  },
  alertText: {
    color: 'black',
    fontSize: 12,
    marginLeft: 7,
    paddingBottom: 5,
    fontFamily: 'NanumSquareR',
  },
  filterTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 2,
    fontFamily: 'NanumSquareB',
  },
});

export default WritePage;
