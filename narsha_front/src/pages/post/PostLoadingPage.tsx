import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import ReadingGlasses from '../../components/animation/ReadingGlasses';
import ImageCards from '../../components/animation/ImageCards';
import LoadingCloud from '../../components/animation/LoadingCloud';
import Config from 'react-native-config';

//@ts-ignore
const PostLoadingPage = ({route, navigation}) => {
  const queryClient = useQueryClient();

  // timer
  const timeout = setTimeout(() => {
    !isLoading &&
      data &&
      navigation.navigate('WritePage', {
        objectDetect: data,
      });
  }, 2000 * route.params.photos.length - 1000);

  useEffect(() => {
    mutate();
    timeout;
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // send image
  const sendImageFunc = async () => {
    try {
      let formData = new FormData(); // from-data object
      for (let i in route.params.photos) {
        formData.append(
          'images',
          route.params.photos.length && {
            uri: route.params.photos[i],
            name: route.params.photos[i],
            type: 'image/jpg',
          },
        );
      }
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/ai-flask/object-detect`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
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
  const mutateSendImage = async () => {
    // get old data
    const oldData = await queryClient.getQueryData(['send-image']);
    // setting datas at UI, 특정 속성 수정
    queryClient.setQueryData(['send-image', 'images'], route.params.photos);

    // if error -> rollback
    return () => queryClient.setQueryData(['send-image'], oldData);
  };

  // useMutation: send image
  const {mutate, isLoading, data} = useMutation(['send-image'], {
    mutationFn: () => sendImageFunc(),
    onMutate: mutateSendImage,
    onError: (error, variable, rollback) => {
      if (rollback) rollback();
      else console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['send-image']);
    },
  });

  return (
    <View style={styles.container}>
      <>
        <LoadingCloud />
        <LoadingCloud />
        {/* top */}
        <View style={styles.top}>
          <View style={styles.progressbox}>
            <View style={styles.progress}>
              <View style={[styles.dot, {backgroundColor: '#98DC63'}]} />
              <View style={[styles.dot, {backgroundColor: '#98DC63'}]} />
              <View style={[styles.dot, {backgroundColor: '#D9D9D9'}]} />
            </View>
          </View>
          <Text>이미지에서 여러분의 정보가 있는지 확인 중..</Text>
        </View>
        {/* content */}
        <View style={{height: 30}} />
        <View style={styles.detectContent}>
          <View style={styles.detectImage}>
            <ImageCards sources={route.params.photos} />
          </View>
          <View style={styles.detectIcon}>
            <ReadingGlasses />
          </View>
          <View style={{flex: 2.3}} />
          <Text style={styles.text}>
            이미지에 개인정보가 있는지 탐색 중이에요!
          </Text>
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginHorizontal: 70,
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
  text: {
    fontSize: 16,
    fontFamily: 'NanumSquareR',
    color: 'black',
    textAlign: 'center',
    marginBottom: '30%',
  },
  detectContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  detectImage: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  detectIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default PostLoadingPage;
