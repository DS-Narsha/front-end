import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Home from './Home';
import Achievement from './Achievement';
import Write from './Write';
import Alarm from './Alarm';
import MyPage from './MyPage';

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
        screenOptions={({route}) => ({
          tabBarStyle: {height: 70},
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Home') {
              return focused ? <Home_on /> : <Home_off />;
            } else if (route.name === 'Achievement') {
              return focused ? <Achievement_on /> : <Achievement_off />;
            } else if (route.name === 'Write') {
              return focused ? <Write_on /> : <Write_off />;
            } else if (route.name === 'Alarm') {
              return focused ? <Alarm_on /> : <Alarm_off />;
            } else if (route.name === 'MyPage') {
              return focused ? <MyPage_on /> : <MyPage_off />;
            }
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Achievement" component={Achievement} />
        <Tab.Screen name="Write" component={Write} />
        <Tab.Screen name="Alarm" component={Alarm} options={{tabBarBadge: '30'}} />
        <Tab.Screen name="MyPage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigator;