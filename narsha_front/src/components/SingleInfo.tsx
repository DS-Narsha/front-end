import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Pressable, Modal} from 'react-native';
import InfoIcon from '../assets/info-icon.svg';
import {ScrollView} from 'react-native-gesture-handler';

export default function SingleInfo() {
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.modalHead}>
                        <Text style={{fontWeight:'bold'}}>{`2023.06.21`}</Text>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.titleBodyText}>공지 제목</Text>
                            <ScrollView>
                            <Text style={styles.bodyText}>
                              {`훈민정음 해례본은 세종이 직접 서문을 쓰고 정인지 같은 신하들에게 글자에 대한 설명을 적게 한 것입니다. 이 책이 1940년에 안동에서 발견될 때까지 우리는 한글의 창제 원리에 대해 전혀 모르고 있었습니다. 그러다 이 책이 발견됨으로 해서 한글이 얼마나 과학적인 원리로 만들어졌는지 알게 되었답니다. 훈민정음 해례본은 세종이 직접 서문을 쓰고 정인지 같은 신하들에게 글자에 대한 설명을 적게 한 것입니다. 이 책이 1940년에 안동에서 발견될 때까지 우리는 한글의 창제 원리에 대해 전혀 모르고 있었습니다. 그러다 이 책이 발견됨으로 해서 한글이 얼마나 과학적인 원리로 만들어졌는지 알게 되었답니다. `}
                              </Text>
                            </ScrollView>
                        </View>

                        <View style={styles.modalEnd}>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <View style={styles.btn}>
                            <Text style={styles.strongText}>확인</Text>
                            </View>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

      <Pressable onPress={() => setModalVisible(true)} style={styles.container}>
            <View style={styles.topItem}>
              <InfoIcon />
              <View>
                <Text style={styles.titleText}>공지 제목</Text>
                <Text style={styles.dateText}>작성 날짜</Text>
              </View>
            </View>
            <Text
              style={styles.bottomItem}
              numberOfLines={2}
              ellipsizeMode="tail">{`훈민정음 해례본은 세종이 직접 서문을 쓰고 정인지 같은 신하들에게 글자에 대한 설명을 적게 한 것입니다. 이 책이 1940년에 안동에서 발견될 때까지 우리는 한글의 창제 원리에 대해 전혀 모르고 있었습니다. 
          그러다 이 책이 발견됨으로 해서 한글이 얼마나 과학적인 원리로 만들어졌는지 알게 되었답니다. `}</Text>
          </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 22,
    marginTop: 13,
    marginLeft: 23,
    marginRight: 23,
    marginBottom: 13,
    marginHorizontal: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  topItem: {
    flexDirection: 'row',
  },
  bottomItem: {
    marginTop: 17,
    fontSize: 12,
    color: '#909090',
  },
  titleText: {
    marginTop: -5,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dateText: {
    marginTop: 0,
    marginLeft: 10,
    fontSize: 12,
    color: '#909090',
  },
  
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
},
modalView: {
    margin: 20,
    width: "68%",
    height: 380,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
modalHead:{
    flex: 0.5,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
    backgroundColor: '#AADF98',
    alignItems: 'center',
    justifyContent: 'center',
},
modalBody:{
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent:"center"
},
modalEnd:{
    flex: 0.8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
},
modalText: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 20,
},
btn:{
    backgroundColor: '#AADF98',
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
},
btnText:{
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
},
strongText:{
    fontSize: 14,
    fontWeight: '200',
    color: '#000000',
},
titleBodyText:{
  marginTop:15,
  marginBottom:15,
  fontWeight:'bold',
},
bodyText:{
  paddingLeft:25,
  paddingRight:25,
}
});
