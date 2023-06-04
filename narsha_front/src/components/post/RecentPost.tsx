import React, {useState} from 'react';
import {Text, Modal, View, Pressable, StyleSheet, Image} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right.svg';
import images from '../../assets/images.jpeg';
import NEW from '../../assets/new-btn.svg';
import CLOSE from '../../assets/close-btn.svg';

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
    flexDirection: 'row',
    marginTop: 10,
    margin: 20,
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    justifyContent: 'space-between',
  },
  img: {
    borderRadius: 10,
    width: 65,
    height: 65,
    margin: 5,
    marginBottom: 0,
  },
});

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
              <CLOSE style={{marginTop: 18, marginLeft: 170}} />
            </Pressable>
          </View>
          <View style={styles.container}>
            <ArrowLeft style={{marginLeft: 0, marginTop: 60}} />
            <View style={{flexDirection: 'column', marginLeft: 10}}>
              <View style={styles.gridView}>
                <Image source={images} style={styles.img} />
                <Image source={images} style={styles.img} />
                <Image source={images} style={styles.img} />
                <Image source={images} style={styles.img} />
              </View>
              <View style={styles.gridView}>
                <Image source={images} style={styles.img} />
                <Image source={images} style={styles.img} />
                <Image source={images} style={styles.img} />
                <Image source={images} style={styles.img} />
              </View>
            </View>
            <ArrowRight style={{marginLeft: 15, marginTop: 60}} />
          </View>
        </View>
      </Modal>

      <Pressable onPress={() => setModalVisible(true)}>
        <NEW />
      </Pressable>
    </View>
  );
}
