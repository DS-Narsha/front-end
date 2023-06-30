import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TimePicker from '../components/TimePicker';
import { TimeCheckContext } from '../components/TimeCheckContext';
import { StartTimeContext } from '../components/StartTimeContext';
import { EndTimeContext } from '../components/EndTimeContext';

export default function TimeSelectPage({navigation}: any) {
  const SetTime = useContext(TimeCheckContext);
  const StartTime = useContext(StartTimeContext);
  const EndTime = useContext(EndTimeContext);

  // const [startTime, setStartTime] = useState(new Date());
  // const [endTime, setEndTime] = useState(new Date());

  // const SetStart = (time: any) => {
  //   setStartTime(time);
  // }

  // const SetEnd = (time: any) => {
  //   setEndTime(time);
  // }

  const CheckTime = () => {
    const now = new Date()
    {StartTime.startTime.getTime() < now.getTime() && now.getTime()<EndTime.endTime.getTime()?
      SetTime.setUse(false):SetTime.setUse(true)}
    console.log(StartTime.startTime)
    console.log(EndTime.endTime)
  }
  
  return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <View style={styles.textContainer1}><Text style={styles.text}>학생들의 앱 사용시간을</Text></View>
          <View><TimePicker SetStart={StartTime.setStartTime} bool={true}/></View>
          <View style={styles.textContainer2}><Text style={styles.text}>부터</Text></View>
          <View><TimePicker SetEnd={EndTime.setEndTime} bool={false} /></View>
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