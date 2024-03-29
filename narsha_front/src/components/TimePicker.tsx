import React, {useState, useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';
import Config from 'react-native-config';

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

  useEffect(() => {
    const makeTime = async () => {
      const data = await getTime();
      if (data) {
        const startTime = timeQuery.data
          ? new Date(timeQuery.data.data.startTime)
          : new Date();
        const endTime = timeQuery.data
          ? new Date(timeQuery.data.data.endTime)
          : new Date();

        setStartTime(startTime);
        setEndTime(endTime);
      }
    };

    makeTime();
  }, [timeQuery.data]);

  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [startTime, setStartTime] = useState(
    timeQuery.data ? new Date(timeQuery.data.data.startTime) : new Date(),
  );
  const [endTime, setEndTime] = useState(
    timeQuery.data ? new Date(timeQuery.data.data.endTime) : new Date(),
  );
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (time: any) => {
    {
      props.bool
        ? (props.SetStart(time), setStartTime(time))
        : (props.SetEnd(time), setEndTime(time));
    }
    hideDatePicker();
  };

  return (
    <View>
      <Text
        onPress={showDatePicker}
        style={{fontSize: 40, fontWeight: 'normal', marginTop: 60}}>
        {props.bool
          ? startTime
            ? startTime.toLocaleTimeString()
            : 'No date selected'
          : endTime
          ? endTime.toLocaleTimeString()
          : 'No date selected'}
      </Text>
      {/* <Button title="Select a date" onPress={showDatePicker} /> */}
      <DateTimePickerModal
        date={props.bool ? startTime : endTime}
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
};

export default TimePicker;
