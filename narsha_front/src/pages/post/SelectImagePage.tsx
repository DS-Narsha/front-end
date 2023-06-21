import React from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import images from '../../assets/images.jpeg';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right.svg';

const styles = StyleSheet.create({
container:{
    flex: 1,
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
    height: 300,
    width: 300,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
    
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 7,
    justifyContent: 'space-between',
    paddingHorizontal: 22
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
    <View style={styles.container}>
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
      <View style={styles.container}>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image source={images} style={styles.pickImg} />
        </View>
        <ScrollView>
          <View style={styles.gridView}>
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
          </View>
          <View style={styles.gridView}>
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
          </View>
          <View style={styles.gridView}>
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
          </View>
          <View style={styles.gridView}>
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
          </View>
          <View style={styles.gridView}>
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
            <Image source={images} style={styles.img} />
          </View>
          {/* height */}
          <View style={{height: 70}} />
        </ScrollView>
      </View>
    </View>
  );
}
