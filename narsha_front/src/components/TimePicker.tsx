import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'

export default function TimePicker() {
  const [time, setTime] = useState(new Date())

  return (
    <DatePicker
      mode="time"
      date={time} onDateChange={setTime} />
  );
}