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
import Config from 'react-native-config';
import basicProfile from '../../assets/graphic/basic-profile.jpg';

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

  const resPhoto = JSON.parse(route.params['objectDetect']['data'])[
    'image'
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // 선택된 이미지의 인덱스 상태
  
  // 현재 선택된 이미지의 데이터를 저장할 상태 추가
  const [selectedImage, setSelectedImage] = useState(resPhoto[0]);
  // 프로필 이미지
  const [profileImage, setProfileImage] = useState('');

  const [content, onChangeContent] = useState('');
  const queryClient = useQueryClient();
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

  const uploadPostMutation = useMutation((formData:FormData) =>
  fetch(`http://${Config.HOST_NAME}/api/post/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  }).then((response) => response.json())
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
          }
        );
      }
      formData.append(
        'info',
        JSON.stringify({
          groupCode: userData.groupCode,
          writer: userData.userId,
          content: content,
        })
      );
      formData.append('fileType', 'png');
  
      // useMutation으로 업로드 함수 실행
      const postData = await uploadPostMutation.mutateAsync(formData);
  
      if(postData.status === 200) {
      // AI 댓글 달기
      const postId = postData.data.postId;
      getAIComment(postId);
      // 업적(첫 게시물) 완료
      AchieveMutateFunc.mutate();
      // setLoadingModalVisible(true);
      navigation.reset({ routes: [{ name: 'MainNavigator' }] });
      } else {
        console.log("포스트 업로드 중 오류가 발생했습니다.")
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

  // 업적(첫 게시물) 완료 보내기
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
          <TouchableOpacity onPress={handlePostUpload}>
          <SendBtn />
          </TouchableOpacity>
        </View>
        <Text>글을 작성해볼까요?</Text>
      </View>
        {/* 사진 부분 */}
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 10}}>
        <View>
        <View style={styles.largeImageContainer}>
        <Image
              source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
              style={styles.largeImage}
            />
        </View>
        {/* 내가 선택한 이미지 부분 */}
        <View style={styles.uploadContentBox}>
        <View style={{marginTop: 10}}>
        <Text style={styles.uploadContentTitle}>내가 선택한 이미지</Text>
        <FlatList
        horizontal
        data={resPhoto}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.imageContainer,
            ]}
            onPress={() => handleImageSelect(index)} // 이미지 클릭 시 선택된 이미지의 인덱스 업데이트
          >
            <Image
              source={{ uri: `data:image/jpeg;base64,${item}` }}
              style={styles.smallImage}
            />
            {index === selectedImageIndex && (
            <View style={styles.selectedText}>
            <Check />
            </View>
            )}
          </TouchableOpacity>
        )}
        />

        {/* writing box*/}
        <Text style={styles.uploadContentTitle}>글 작성하기</Text>
          <View style={styles.writingBox}>
          {/* 프로필 이미지 */}
          {profileImage ? (
            <Image
            source={{uri: profileImage}}
            style={styles.profile}
            />
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



    </View>
  );
};

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
    padding: 7
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
    // 선택한 이미지 크게 보여줄 컨테이너 스타일
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  largeImage: {
    // 큰 이미지 스타일
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  imageContainer: {
    width: 70, // 이미지의 가로 크기를 조절합니다.
    height: 70, // 이미지의 세로 크기를 조절합니다.
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20, // 이미지 끝을 둥글게 만듭니다.
    backgroundColor: '#C0C0C0',
  },
  smallImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // 이미지 끝을 둥글게 만듭니다.
    resizeMode: 'cover',
  },
  selectedText: {
    position: 'absolute',
    top: '95%', // 수직 정렬을 위해 top을 50%로 설정
    left: '97%', // 수평 정렬을 위해 left를 50%로 설정
    transform: [{ translateX: -50 }, { translateY: -50 }], // 수평, 수직 정렬을 가운데로 조정
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
    fontFamily: 'NanumSquareR',
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
    fontFamily: 'NanumSquareR',
  },
  strongText: {
    fontSize: 13,
    fontWeight: '200',
    color: '#000000',
    fontFamily: 'NanumSquareR',
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
