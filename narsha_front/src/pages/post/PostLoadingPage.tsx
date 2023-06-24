import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const styles = StyleSheet.create({
  container:{
    flex: 1
},
top: {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems:'center',
  height: 105,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  backgroundColor: '#F9FAC8',
},
progress:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 70
},
progressbox:{
  paddingHorizontal: 16,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
dot:{
  width: 21,
  height: 21,
  borderRadius: 50,
  margin: 20,
},
});

//@ts-ignore
const PostLoadingPage = ({route, navigation}) => {
  let [ loading, setLoading ] = useState(true);
  
  // timer
	const timeout = setTimeout(() => {
      navigation.navigate("WritePage", { resPhoto: route.params });
    }, 2000);

	useEffect(() => {
		timeout;
		return () => {
			clearTimeout(timeout);
		};
	}); 

  return (
      <View style={styles.container}>
      { loading ? (
        <>
        <View style={styles.top}>
          <View style={styles.progressbox}>
            <View style={styles.progress}>
              <View style={[styles.dot, {backgroundColor: '#98DC63'}]}/>
              <View style={[styles.dot, {backgroundColor: '#98DC63'}]}/>
              <View style={[styles.dot, {backgroundColor: '#D9D9D9'}]}/>
            </View>
          </View>
          <Text>이미지에서 여러분의 정보가 있는지 확인 중..</Text>
        </View>
      <Text>PostLoadingPage</Text>
      </>
      ) : (
        navigation.navigate("WritePage", {resPhoto: route.params})
      )
      }
    </View>
  );
};

export default PostLoadingPage;