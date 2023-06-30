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
      props.SetStart(time):
      props.SetEnd(time)
    }
    hideDatePicker();
  };

  return (
    <View>
        <Text onPress={showDatePicker} style={{ fontSize: 40, fontWeight: 'normal', marginTop: 60 }}>
          {
            props.bool ? 
            (StartTime? StartTime.startTime.toLocaleTimeString() : 'No date selected') :
            (EndTime? EndTime.endTime.toLocaleTimeString() : 'No date selected') 
          }
        </Text>
        {/* <Button title="Select a date" onPress={showDatePicker} /> */}
        <DateTimePickerModal
          date={props.bool? StartTime.startTime:EndTime.endTime}
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