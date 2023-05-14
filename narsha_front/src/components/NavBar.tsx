import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MainPage from '../pages/MainPage';
import AchievePage from '../pages/AchievePage';
import WritePage from '../pages/WritePage';
import AlarmPage from '../pages/AlarmPage';
import MyPage from '../pages/MyPage';
import Main_Sel from '../assets/main-sel.svg';
import Main_Desel from '../assets/main-desel.svg';
import Achieve_Sel from '../assets/achieve-desel.svg';
import Achieve_DeSel from '../assets/achieve-sel.svg';
import Write_Sel from '../assets/write-sel.svg';
import Write_Desel from '../assets/write-desel.svg';
import Alarm_Sel from '../assets/alarm-sel.svg';
import Alarm_Desel from '../assets/alarm-desel.svg';
import MyPage_Sel from '../assets/mypage-sel.svg';
import MyPage_Desel from '../assets/mypage-desel.svg';

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
              return focused ? <Main_Sel /> : <Main_Desel style={{}} />; // 메인
            } else if (route.name === 'AchievePage') {
              return focused ? <Achieve_Sel /> : <Achieve_DeSel />; //업적
            } else if (route.name === 'WritePage') {
              return focused ? <Write_Sel /> : <Write_Desel />; //글쓰기
            } else if (route.name === 'AlarmPage') {
              return focused ? <Alarm_Sel /> : <Alarm_Desel />; //알림
            } else if (route.name === 'MyPage') {
              return focused ? <MyPage_Sel /> : <MyPage_Desel />; //마이페이지
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
