import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import images from '../assets/images.jpeg';

const styles = StyleSheet.create({
  pickImg: {
    height: 350,
    width: 350,
    borderRadius: 10,
    marginBottom:20
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
    marginBottom:10
  },
});

export default function SelectImage() {
  return (
    <View style={{padding:20}}>
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
  );
}
