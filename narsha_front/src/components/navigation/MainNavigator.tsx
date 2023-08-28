import React, { useState, useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main_Sel from '../../assets/main-sel.svg';
import Main_Desel from '../../assets/main-desel.svg';
import Achieve_Sel from '../../assets/achieve-sel.svg';
import Achieve_DeSel from '../../assets/achieve-desel.svg';
import Write_Sel from '../../assets/write-sel.svg';
import Write_Desel from '../../assets/write-desel.svg';
import Alarm_Sel from '../../assets/alarm-sel.svg';
import Alarm_Desel from '../../assets/alarm-desel.svg';
import MyPage_Sel from '../../assets/mypage-sel.svg';
import MyPage_Desel from '../../assets/mypage-desel.svg';
import MainStack from './MainStack';
import MypageStack from './MyPageStack';
import PostStack from './PostStack';
import AchieveStack from './AchieveStack';
import AlarmStack from './AlarmStack';
import {useQuery, useQueryClient} from '@tanstack/react-query';

const Tab = createBottomTabNavigator();


//@ts-ignore
const MainNavigator = ({route}) => {
  return (
    <Tab.Navigator
      initialRouteName="MainStack"
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: '#E3F1A9',
        },
        headerTitleAlign: 'center',
        safeAreaInsets: {bottom: 0},
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: 'absolute',
          overflow: 'hidden',
          height: 70,
          left: 0,
          bottom: 0,
          right: 0,
          paddingBottom: 8,
        },
        style: {
          backgroundColor: '#E3F1A9',
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'MainStack') {
            return focused ? <Main_Sel /> : <Main_Desel style={{}} />; // 메인
          } else if (route.name === 'AchieveStack') {
            return focused ? <Achieve_Sel /> : <Achieve_DeSel />; //업적
          } else if (route.name === 'PostStack') {
            return focused ? <Write_Sel /> : <Write_Desel />; //글쓰기
          } else if (route.name === 'AlarmStack') {
            return focused ? <Alarm_Sel /> : <Alarm_Desel />; //알림
          } else if (route.name === 'MyPageStack') {
            return focused ? <MyPage_Sel /> : <MyPage_Desel />; //마이페이지
          }
        },
      })}>
      <Tab.Screen
        name="MainStack"
        component={MainStack}
        options={({route}) => ({
          unmountOnBlur: true,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="AchieveStack"
        component={AchieveStack}
        options={{unmountOnBlur: true, headerShown: false}}
      />
      <Tab.Screen
        name="PostStack"
        component={PostStack}
        options={{unmountOnBlur: true, headerShown: false}}
      />
      <Tab.Screen
        name="AlarmStack"
        component={AlarmStack}
        options={{tabBarBadge: '30', unmountOnBlur: true, headerShown: false}}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MypageStack}
        options={{unmountOnBlur: true, headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
