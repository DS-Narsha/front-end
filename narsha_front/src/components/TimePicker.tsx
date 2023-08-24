import React, { useState, useContext } from 'react'
import { Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { StartTimeContext } from '../components/StartTimeContext';
import { EndTimeContext } from '../components/EndTimeContext';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import moment from "moment"

type UserData = {
  groupCode: string;
};

const TimePicker = props => {

  // groupCode 가져오기
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get time
  const getTime = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/group/get-time?groupCode=${userData.groupCode}`,
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

  // console.log(timeQuery.data? timeQuery.data.data.startTime:"hi")
  // console.log(timeQuery.data? timeQuery.data.data.endTime:"hi")

    
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  
  const StartTime = useContext(StartTimeContext);
  const EndTime = useContext(EndTimeContext);
  // const [startTime, setStartTime] = useState(timeQuery.data.data? timeQuery.data.data.startTime.substr(11,5):new Date().toLocaleTimeString());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (time: any) => {

    {
      props.bool? 
      (props.SetStart(time), 
      setStartTime(time)):(
        props.SetEnd(time),
        setEndTime(time)
      )
    }
    hideDatePicker();
  };

  return (
    <View>
        <Text onPress={showDatePicker} style={{ fontSize: 40, fontWeight: 'normal', marginTop: 60 }}>
          {
            props.bool ? 
            (startTime? startTime.toLocaleTimeString() : 'No date selected') :
            (endTime? endTime.toLocaleTimeString() : 'No date selected') 
          }
        </Text>
        {/* <Button title="Select a date" onPress={showDatePicker} /> */}
        <DateTimePickerModal
          date={props.bool? startTime:endTime}
          isVisible={datePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    // <DatePicker
    //   mode="time"
    //   date={time} onDateChange={setTime} />
  );
}

export default TimePicker;