import React, { useCallback, useRef, useState } from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, ImageBackground, TextInput} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import SendBtn from '../../assets/send-btn.svg';
import NextPhoto from '../../assets/next-photo.svg';
import PrevPhoto from '../../assets/prev-photo.svg';

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
  marginLeft: 70,
  marginRight: 56
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
pickImg: {
  height: 280,
  width: 280,
  borderRadius: 10,
  paddingHorizontal: 16,
  backgroundColor: '#C0C0C0',
  marginHorizontal: 10
},
contentContainer:{
  flex: 1,
},
uploadContentBox:{
  flex: 1,
  backgroundColor: '#ffffff',
  borderRadius: 20,
  shadowOffset: {
    width: 5,
    height: -10,
  },
  elevation: 10,
},
writingBox:{
  display: 'flex',
  flexDirection: 'row',
  paddingHorizontal: 18,
  marginTop: 25,
  marginBottom: 10
},
profile: {
  width: 45,
  height: 45,
  borderRadius: 50,
  backgroundColor: '#C0C0C0',
  marginRight: 13
},
content:{
  flex: 1,
  height: 90,
  borderRadius: 10,
  backgroundColor: '#C0C0C0'
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
selectPhotoBox:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
},
selPhotoText:{
  fontSize: 10,
  fontWeight: 'bold',
  color: '#000000'
},
selPhoto:{
  opacity: 0.7,
  justifyContent: 'center',
  alignItems:'center',
  shadowOffset: {
    width: 0,
    height: 5,
  },
  elevation: 5,
}
});

//@ts-ignore
const WritePage = ({route, navigation}) => {
  const resPhoto = route.params['resPhoto']['photos']
  let currentPhoto = useRef(resPhoto[0])
  const [selPhoto, useSelPhoto] = useState(resPhoto[0])
  const [content, onChangeContent] = useState("");

  const _RenderItem = useCallback(({ item, index }: any) => {
    return (
      <TouchableOpacity onPress={() =>{
        currentPhoto.current = item
        useSelPhoto(item)
      }}>
        <ImageBackground
          source={{uri: item}}
          style={[styles.img, (currentPhoto.current === item) && styles.selPhoto]}
          imageStyle={{borderRadius: 10}}>
          {currentPhoto.current === item && <Text style={styles.selPhotoText}>선택</Text>}
        </ImageBackground>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      {/* top */}
      <View style={styles.top}>
        <View style={styles.progressbox}>
          <ArrowLeft/>
          <View style={styles.progress}>
            <View style={[styles.dot, {backgroundColor: '#98DC63'}]}/>
            <View style={[styles.dot, {backgroundColor: '#98DC63'}]}/>
            <View style={[styles.dot, {backgroundColor: '#98DC63'}]}/>
          </View>
          <SendBtn />
        </View>
        <Text>글을 작성해볼까요?</Text>
      </View>
      {/* content */}
      <View style={styles.contentContainer}>
        <View style={styles.selectPhotoBox}>
          <PrevPhoto />
          <View style={{alignItems: 'center', marginTop: 20}}>
            <ImageBackground 
            source={{uri: currentPhoto.current}} 
            style={styles.pickImg}
            imageStyle={{borderRadius: 10}} />
          </View>
          <NextPhoto />
        </View>
        {/* writing*/}
        <View style={styles.uploadContentBox}>
          <View style={styles.writingBox}>
            <View style={styles.profile}></View>
            <TextInput placeholder="어떤 글을 작성할건가요?"
                   value={content}
                   textAlignVertical="top"
                   multiline={true}
                   onChangeText={onChangeContent}
                  style={styles.content} />
          </View>
          {resPhoto ? (
        <FlatList
          data={resPhoto}
          renderItem={_RenderItem}
          key={'#'}
          scrollEnabled={false}
          keyExtractor={(item, index) => '#' + index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 1,
            justifyContent: 'space-around',
            alignSelf:'center'
          }}
          numColumns={5}
        />
      ) : (<Text>이미지가 없습니다.</Text>)}
        </View>
      </View>
    </View>
  );
};



export default WritePage;