import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

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
});

//@ts-ignore
const PostLoadingPage = ({route, navigation}) => {
  //let [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  //console.log('photos:' + JSON.stringify(route.params.photos));

  // timer
  const timeout = setTimeout(() => {
    navigation.navigate('WritePage', {resPhoto: route.params});
  }, 3000);

  useEffect(() => {
    mutate();
    //timeout;
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
      console.log('formData: ' + JSON.stringify(formData));
      const res = await fetch(
        `http://localhost:8080/api/ai-flask/object-detect`,
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
      // loading false
      console.log(isLoading);
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  // onMutate
  const mutateSendImage = async () => {
    console.log('mutateSendImage');
    // get old data
    const oldData = await queryClient.getQueryData(['send-image']);
    // setting datas at UI, 특정 속성 수정
    queryClient.setQueryData(['send-image', 'images'], route.params.photos);

    // if error -> rollback
    return () => queryClient.setQueryData(['send-image'], oldData);
  };

  // useMutation: send image
  const {mutate, isLoading} = useMutation(['send-image'], {
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
      {isLoading ? (
        <>
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
          <Text>PostLoadingPage</Text>
        </>
      ) : (
        <Text>스피너</Text>
      )}
    </View>
  );
};

export default PostLoadingPage;
