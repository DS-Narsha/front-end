import React, {useCallback, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import SendBtn from '../../assets/send-btn.svg';
import NextPhoto from '../../assets/next-photo.svg';
import PrevPhoto from '../../assets/prev-photo.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Swiper from 'react-native-web-swiper';

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
const WritePage = ({route, navigation}) => {
  const resPhoto = route.params['resPhoto']['photos'];
  let currentPhoto = useRef(resPhoto[0]);
  const [selPhoto, useSelPhoto] = useState(resPhoto[0]);
  const [content, onChangeContent] = useState('');
  const queryClient = useQueryClient();

  // render item
  const _RenderItem = useCallback(({item, index}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          currentPhoto.current = item;
          useSelPhoto(item);
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

  // uploading post
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
          groupCode: 'TBu3VNrBdm',
          writer: 'narsha1111',
          content: content,
        }),
      );
      formData.append('fileType', 'png');
      console.log(formData);
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
      'narsha5555',
    );
    queryClient.setQueryData(['posting-list', 'data', 'content'], content);
    queryClient.setQueryData(['posting-list', 'data', 'imageArray'], resPhoto);
    // if error -> rollback
    return () => queryClient.setQueryData(['posting-list'], oldData);
  };

  // useMutation: post
  const {mutate} = useMutation(['profile-update'], {
    mutationFn: () => uploadPost(),
    onMutate: mutatePost,
    onError: (error, variable, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['profile-detail']);
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
            onPress={() => (
              mutate(), navigation.reset({routes: [{name: 'Main'}]})
            )}>
            <SendBtn />
          </TouchableOpacity>
        </View>
        <Text>글을 작성해볼까요?</Text>
      </View>
      <ScrollView>
        {/* content */}
        <View style={styles.contentContainer}>
          <View style={styles.selectPhotoBox}>
            <ImageBackground
              source={{uri: currentPhoto.current}}
              style={styles.pickImg}
              imageStyle={{borderRadius: 10}}
            />
            <View style={{alignItems: 'center', marginTop: 20}}></View>
          </View>
          {/*posting container*/}
          <ScrollView
            style={styles.uploadContentBox}
            showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 20}}>
              {/*select image list box*/}
              <Text style={styles.uploadContentTitle}>내가 선택한 이미지</Text>
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
                <View style={styles.profile}></View>
                <TextInput
                  placeholder="어떤 글을 작성할건가요?"
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#213123',
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
    height: 90,
    borderRadius: 10,
    backgroundColor: '#C0C0C0',
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
});

export default WritePage;
