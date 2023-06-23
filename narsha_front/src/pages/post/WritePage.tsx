import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import SendBtn from '../../assets/send-btn.svg'
import NextPhoto from '../../assets/next-photo.svg'
import PrevPhoto from '../../assets/prev-photo.svg'

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
  backgroundColor: '#E3F1A9',
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
  marginHorizontal: 5
},
selectPhotoBox:{
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}
});

//@ts-ignore
const WritePage = ({navigation}) => {
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
            <View style={styles.pickImg} />
          </View>
          <NextPhoto />
        </View>
        {/* writing*/}
        <View style={styles.uploadContentBox}>
          <View style={styles.writingBox}>
            <View style={styles.profile}></View>
            <View style={styles.content}></View>
          </View>
          <View style={styles.gridView}>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
          </View>
          <View style={styles.gridView}>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
            <View style={styles.img}></View>
          </View>
        </View>
      </View>
      <Text>WritePage</Text>
    </View>
  );
};



export default WritePage;