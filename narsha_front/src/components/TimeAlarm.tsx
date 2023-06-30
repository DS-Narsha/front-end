import Alarm, {AlarmScheduleType} from 'react-native-alarm-manager';
import React, {useState, useContext} from 'react';

import { StartTimeContext } from '../components/StartTimeContext';
import { EndTimeContext } from '../components/EndTimeContext';

const StartTime = useContext(StartTimeContext);
const EndTime = useContext(EndTimeContext);

const alarm: AlarmScheduleType = {
  alarm_time: '15:27:00', // HH:mm:00
  alarm_title: 'title',
  alarm_text: 'text',
  alarm_sound: 'sound', // sound.mp3
  alarm_icon: 'icon', // icon.png
  alarm_sound_loop: false,
  alarm_vibration: true,
  alarm_noti_removable: false,
  alarm_activate: true, // value for alarm toggle
};

Alarm.schedule(
  alarm,
  success => console.log(success),
  fail => console.log(fail),
);