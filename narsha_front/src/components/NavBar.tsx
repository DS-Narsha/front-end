import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MainPage from '../pages/Home';
import AchievePage from '../pages/Achievement';
import WritePage from '../pages/Write';
import AlarmPage from '../pages/Alarm';
import MyPage from '../pages/MyPage';
import Home_on from '../assets/home_on.svg';
import Home_off from '../assets/home_off.svg';
import Achievement_on from '../assets/achievement_on.svg';
import Achievement_off from '../assets/achievement_off.svg';
import Write_on from '../assets/write_on.svg';
import Write_off from '../assets/write_off.svg';
import Alarm_on from '../assets/alarm_on.svg';
import Alarm_off from '../assets/alarm_off.svg';
import MyPage_on from '../assets/myPage_on.svg';
import MyPage_off from '../assets/myPage_off.svg';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Main"
        screenOptions={({route}) => ({
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 5,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'MainPage') {
              return focused ? <Home_on /> : <Home_off style={{}} />; // 메인
            } else if (route.name === 'AchievePage') {
              return focused ? <Achievement_on /> : <Achievement_off />; //업적
            } else if (route.name === 'WritePage') {
              return focused ? <Write_on /> : <Write_off />; //글쓰기
            } else if (route.name === 'AlarmPage') {
              return focused ? <Alarm_on /> : <Alarm_off />; //알림
            } else if (route.name === 'MyPage') {
              return focused ? <MyPage_on /> : <MyPage_off />; //마이페이지
            }
          },
        })}>
        <Tab.Screen name="MainPage" component={MainPage} />
        <Tab.Screen name="AchievePage" component={AchievePage} />
        <Tab.Screen name="WritePage" component={WritePage} />
        <Tab.Screen
          name="AlarmPage"
          component={AlarmPage}
          options={{tabBarBadge: '30'}}
        />
        <Tab.Screen name="MyPage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
