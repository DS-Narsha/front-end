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
} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import SendBtn from '../../assets/send-btn.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Check from '../../assets/ic-check.svg';
import ObjectLabel from '../../data/objectLabel.json';

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
  const queryClient = useQueryClient();
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
      const res = await fetch(`http://localhost:8080/api/post/upload`, {
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
        `http://localhost:8080/api/comment/create/chat?postId=${postId}`,
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
    onSuccess:(data) => {
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
  console.log("여기입니당"+ objectDetect[selIndex]);

  // achieve mutate //
  // uploading post
  const updateAchieve = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/user/check-achieve?userId=${
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
    mutationFn: () => updateAchieve(),
    onMutate: mutateAchieve,
    onError: (error, variable, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['badge-list']);
    },
  });

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
              mutate();
              !JSON.parse(profileQuery.data.data.badgeList)[0] &&
                AchieveMutateFunc.mutate();
              navigation.reset({routes: [{name: 'Main'}]});
              setLoadingModalVisible(true);
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
});

export default WritePage;
