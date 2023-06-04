import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AchievePage from '../../pages/AchievePage';
import WritePage from '../../pages/WritePage';
import AlarmPage from '../../pages/AlarmPage';
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

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({route}) => ({
        headerStyle:{
          backgroundColor: '#E3F1A9',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius:20,
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Main') {
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
      <Tab.Screen name="Main" component={MainStack} />
      <Tab.Screen name="AchievePage" component={AchievePage} />
      <Tab.Screen name="WritePage" component={WritePage} />
      <Tab.Screen
        name="AlarmPage"
        component={AlarmPage}
        options={{tabBarBadge: '30'}}
      />
      <Tab.Screen name="MyPage" component={MypageStack} />
    </Tab.Navigator>
  );
};

export default MainNavigator;