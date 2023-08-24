import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TimePicker from '../components/TimePicker';
import { StartTimeContext } from '../components/StartTimeContext';
import { EndTimeContext } from '../components/EndTimeContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

// async-storage에 활성화 시간 저장하기
export const storeData = async (key: string, value: Date) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e: any) {
    console.error(e.message);
  }
};

type UserData = {
  groupCode: string;
};

export default function TimeSelectPage({navigation}: any) {

  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

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

    // update time
    const updateTime = useMutation(async () => {
      try {  
        const res = await fetch(`http://localhost:8080/api/group/update-time`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startTime:333,
            endTime:444,
            groupCode:userData.groupCode
          }),
        });
        const json = await res.json();
        return json;
      } catch (err) {
        console.log(err);
      }
    });

    const handleTimeSubmit = async () => {
      try{
          await updateTime.mutateAsync();
      } catch(error) {
      }
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
        <TouchableOpacity onPress={() => {CheckTime(); navigation.navigate('MyPage'); handleTimeSubmit();}}>
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
    fontFamily: 'NanumSquareB',
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