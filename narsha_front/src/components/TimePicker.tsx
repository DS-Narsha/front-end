import React, { useState } from 'react'
import { Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from 'react-native-modal-datetime-picker';

export default function TimePicker() {
  // const [time, setTime] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

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
    setSelectedDate(time);
    hideDatePicker();
  };

  return (
    <View>
        <Text onPress={showDatePicker} style={{ fontSize: 40, fontWeight: 'normal', marginTop: 60 }}>
          {selectedDate ? selectedDate.toLocaleTimeString() : 'No date selected'}
        </Text>
        {/* <Button title="Select a date" onPress={showDatePicker} /> */}
        <DateTimePickerModal
          date={selectedDate}
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