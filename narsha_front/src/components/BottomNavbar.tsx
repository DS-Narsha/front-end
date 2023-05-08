import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ScreenA from '../pages/ScreenA';
import ScreenB from '../pages/ScreenB';
import ScreenC from '../pages/ScreenC';
import ScreenD from '../pages/ScreenD';
import ScreenE from '../pages/ScreenE';
import Group59 from '../assets/Group 59.svg';
import Group60 from '../assets/Group 60.svg';
import Group61 from '../assets/Group 61.svg';
import Group62 from '../assets/Group 62.svg';
import Group63 from '../assets/Group 63.svg';

const Stack = createNativeStackNavigator();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="ScreenA">
      <BottomTab.Screen
        name="메인"
        component={ScreenA}
        options={{
          tabBarIcon: ({focused}) => <Group59 width={40} height={40} />,
        }}
      />
      <BottomTab.Screen
        name="업적"
        component={ScreenB}
        options={{
          tabBarIcon: ({focused}) => <Group60 width={40} height={40} />,
        }}
      />
      <BottomTab.Screen
        name="글쓰기"
        component={ScreenC}
        options={{
          tabBarIcon: ({focused}) => <Group61 width={40} height={40} />,
        }}
      />
      <BottomTab.Screen
        name="알림"
        component={ScreenD}
        options={{
          tabBarIcon: ({focused}) => <Group62 width={40} height={40} />,
        }}
      />
      <BottomTab.Screen
        name="마이페이지"
        component={ScreenE}
        options={{
          tabBarIcon: ({focused}) => <Group63 width={40} height={40} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function BottomNavbar() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
