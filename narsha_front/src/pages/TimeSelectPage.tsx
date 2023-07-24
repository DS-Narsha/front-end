import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TimePicker from '../components/TimePicker';
import { StartTimeContext } from '../components/StartTimeContext';
import { EndTimeContext } from '../components/EndTimeContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

// async-storage에 활성화 시간 저장하기
export const storeData = async (key: string, value: Date) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e: any) {
    console.error(e.message);
  }
};

export default function TimeSelectPage({navigation}: any) {
  const StartTime = useContext(StartTimeContext);
  const EndTime = useContext(EndTimeContext);

  const [sTime, setSTime] = useState(StartTime.startTime);
  const [eTime, setETime] = useState(EndTime.endTime);

  const CheckTime = () => {
    async function StoreTime() {
      try{
        await storeData("startTime", sTime)
        await storeData("endTime", eTime)
      } catch (e) {
        console.warn(e);
      }
    }

    StoreTime()
    StartTime.setStartTime(sTime)
    EndTime.setEndTime(eTime)

  }
  
  return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.textContainer1}><Text style={styles.text}>학생들의 앱 사용시간을</Text></View>
          <View><TimePicker SetStart={setSTime} bool={true}/></View>
          <View style={styles.textContainer2}><Text style={styles.text}>부터</Text></View>
          <View><TimePicker SetEnd={setETime} bool={false} /></View>
          <View style={styles.textContainer2}><Text style={styles.text}>까지</Text></View>
        </View>
        <TouchableOpacity onPress={() => {CheckTime(); navigation.navigate('MyPage') }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>설정하기</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {  
      flex:1,
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      alignItems: 'center',
  },
  container2:{
      marginTop: 40,
  },
  textContainer1:{
      marginBottom: 20,
  },
  textContainer2: {
      alignItems: 'flex-end',
  },
  text:{
      color: '#000000',
      fontSize: 15,
      fontWeight: '200',
  },
  btn:{
      backgroundColor: '#AADF98',
      height: 45,
      width: 180,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      marginTop: 120,
  },
  btnText:{
      color: '#000000',
      fontSize: 15,
      fontWeight: '200',
  },
})