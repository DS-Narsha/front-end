import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import images from '../assets/images.jpeg';
import FirstDot from '../assets/first-dot.png';
import ArrowLeft from '../assets/arrow-left.png';
import ArrowRight from '../assets/arrow-right.png';

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 83,
    width: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#E3F1A9',
    marginBottom: 20,
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

export default function SelectImage() {
  return (
    <View>
      <View style={styles.top}>
        <Image source={ArrowLeft} style={{margin: 30}} />
        <Image source={FirstDot} style={{margin: 30, marginLeft: 65}} />
        <Image source={ArrowRight} style={{margin: 30, marginLeft: 60}} />
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
