import React, {useState} from 'react';
import {Text, Modal, View, Pressable, StyleSheet, Image} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right.svg';
import images from '../../assets/images.jpeg';
import CLOSE from '../../assets/close-btn.svg';

export default function RecentPost() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.body}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 17,
                marginTop: 20,
                marginLeft: 20,
                fontWeight: '500',
              }}>
              최근에 올라온 게시물
            </Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <CLOSE
                style={{
                  marginTop: 18,
                  marginLeft: 170,
                  color: '#61A257',
                }}
              />
            </Pressable>
          </View>
          <View style={styles.container}>
            {/* <ArrowLeft style={{marginTop: 60}} /> */}
            <View style={{flexDirection: 'column'}}>
              <View style={styles.gridView}>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
              </View>
              <View style={styles.gridView}>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
                <View style={styles.imgWrap}>
                  <Image source={images} style={styles.img} />
                </View>
              </View>
            </View>
            {/* <ArrowRight style={{marginLeft: -10, marginTop: 60}} /> */}
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.floating}>
          <Text>NEW</Text>
        </View>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 220,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    left: 0,
  },
  container: {
    
    // display:'flex',
    flex:1,
    // flexDirection: 'row',
    // marginTop: 10,
    // margin: 20,
    // textAlign:'center',
    alignItems:'center',
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 2,
    justifyContent: 'space-between',
  },
  img: {
    borderRadius: 10,
    width: 65,
    height: 65,
    marginBottom: 0,
  },
  imgWrap: {
    borderRadius: 10,
    width: 65,
    height: 65,
    margin: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 4,
    borderColor: '#D9D9D9',
  },
  floating: {
    width: 58,
    height: 58,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#98DC63',
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 5,
    shadowRadius: 10,
  },
});