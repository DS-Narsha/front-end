import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import DS from '../assets/DS.png';
import Arrow from '../assets/arrow-left.svg';
import images from '../assets/images.jpeg';

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        height: 63,
        width: 400,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#E3F1A9',
      },
      ds_container: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 30,
      },
      ds_image: {
        width: 49,
        height: 49,
        borderRadius: 50,
      },
      ds_text: {
        marginTop: -3,
        marginLeft: 7,
        backgroundColor: '#fbffe1',
        borderRadius: 20,
        padding: 8,
        color: '#61A257',
      },
      gridView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,
        justifyContent: 'flex-start',
        margin:15
      },
      img: {
        borderRadius: 10,
        width: 100,
        height: 100,
        margin:10,
      },
      text:{
        textAlign:'center', 
        fontSize:14
      }
})

export default function BadgeList() {
    return (
        <View>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                <Arrow style={{margin: 20}} />
                </TouchableOpacity>
                <Text style={{margin: 20, marginLeft: 80, fontSize: 18}}>
                뱃지 목록 페이지
                </Text>
            </View>

            <View style={styles.ds_container}>
                <Image style={styles.ds_image} source={DS} />
                <Text
                style={
                    styles.ds_text
                }>{`업적을 달성하면 뱃지를 얻을 수 있는 거 아시나요?
여러분이 획득한 뱃지를 볼 수 있는 공간이에요~!`}</Text>
            </View>

        <View style={styles.gridView}>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
        </View>

        <View style={styles.gridView}>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
        </View>

        <View style={styles.gridView}>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
          <View>
            <Image source={images} style={styles.img} />
            <Text style={styles.text}>뱃지 이름</Text>
          </View>
        </View>
      </View>
    );
}