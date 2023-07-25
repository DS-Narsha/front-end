import React, { useState, useContext } from 'react'
import { Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { StartTimeContext } from '../components/StartTimeContext';
import { EndTimeContext } from '../components/EndTimeContext';

const TimePicker = props => {
  // const [time, setTime] = useState(new Date())
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  
  const StartTime = useContext(StartTimeContext);
  const EndTime = useContext(EndTimeContext);
  const [startTime, setStartTime] = useState(StartTime.startTime);
  const [endTime, setEndTime] = useState(EndTime.endTime);


  // const FormatTime = (time: any) => {
  //   let timeString =
  //   time.getHours() +
  //   ':' +
  //   time.getMinutes();

  //   return timeString; 
  // };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (time: any) => {
    // setSelectedDate(time);
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