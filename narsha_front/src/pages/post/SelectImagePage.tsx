import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import images from '../../assets/images.jpeg';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right.svg';

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
  pickImg: {
    height: 350,
    width: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    justifyContent: 'space-between',
    paddingBottom: 80,
  },
  img: {
    borderRadius: 10,
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

// @ts-ignore
export default function SelectImage({navigation}) {
  return (
    <View>
      <View style={styles.top}>
        <View style={styles.progressbox}>
          <ArrowLeft/>
          <View style={styles.progress}>
            <View style={[styles.dot, {backgroundColor: '#98DC63'}]}/>
            <View style={[styles.dot, {backgroundColor: '#D9D9D9'}]}/>
            <View style={[styles.dot, {backgroundColor: '#D9D9D9'}]}/>
          </View>
          <ArrowRight onPress={() => navigation.navigate("PostPage")} />
        </View>
        <Text>이미지를 선택해주세요.</Text>
      </View>

      <View style={{padding: 20}}>
        <Image source={images} style={styles.pickImg} />
        <View style={styles.gridView}>
          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />

          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />

          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />

          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />
          <Image source={images} style={styles.img} />
        </View>
      </View>
    </View>
  );
}
