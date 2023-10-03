import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import TimePicker from '../components/TimePicker';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import Config from 'react-native-config';

type UserData = {
  groupCode: string;
};

export default function TimeSelectPage({navigation}: any) {
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get time
  const getTime = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/group/get-time?groupCode=${userData.groupCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const timeQuery = useQuery({
    queryKey: ['time'],
    queryFn: getTime,
  });

  const [sTime, setSTime] = useState(
    timeQuery.data ? new Date(timeQuery.data.data.startTime) : new Date(),
  );
  const [eTime, setETime] = useState(
    timeQuery.data ? new Date(timeQuery.data.data.endTime) : new Date(),
  );

  // update time
  const updateTime = useMutation(async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/group/update-time`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            startTime: sTime,
            endTime: eTime,
            groupCode: userData.groupCode,
          }),
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  });

  const handleTimeSubmit = async () => {
    try {
      await updateTime.mutateAsync();
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>학생들의 앱 사용시간을</Text>
        </View>
        <View>
          <TimePicker SetStart={setSTime} bool={true} />
        </View>
        <View style={styles.periodTextContainer}>
          <Text style={styles.text}>부터</Text>
        </View>
        <View>
          <TimePicker SetEnd={setETime} bool={false} />
        </View>
        <View style={styles.periodTextContainer}>
          <Text style={styles.text}>까지</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleTimeSubmit();
          navigation.navigate('MyPage');
        }}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>설정하기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeContainer: {
    marginTop: 40,
  },
  textContainer: {
    marginBottom: 20,
  },
  periodTextContainer: {
    alignItems: 'flex-end',
  },
  text: {
    fontFamily: 'NanumSquareB',
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
  btn: {
    backgroundColor: '#AADF98',
    height: 45,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 120,
  },
  btnText: {
    fontFamily: 'NanumSquareB',
    color: '#000000',
    fontSize: 15,
    fontWeight: '200',
  },
});
