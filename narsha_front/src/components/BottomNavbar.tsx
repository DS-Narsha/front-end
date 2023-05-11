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
import Group64 from '../assets/Group 64.svg';
import Group65 from '../assets/Group 65.svg';
import Group66 from '../assets/Group 66.svg';
import Group67 from '../assets/Group 67.svg';
import Group68 from '../assets/Group 68.svg';

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
    <BottomTab.Navigator
      initialRouteName="ScreenA"
      screenOptions={{
        tabBarStyle: {
          height: 60,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarActiveTintColor: '#61A257',
      }}>
      <BottomTab.Screen
        name="메인"
        component={ScreenA}
        options={{
          tabBarIcon: ({focused}) => (focused ? <Group64 /> : <Group59 />),
        }}
      />
      <BottomTab.Screen
        name="업적"
        component={ScreenB}
        options={{
          tabBarIcon: ({focused}) => (focused ? <Group65 /> : <Group60 />),
        }}
      />
      <BottomTab.Screen
        name="글쓰기"
        component={ScreenC}
        options={{
          tabBarIcon: ({focused}) => (focused ? <Group66 /> : <Group61 />),
        }}
      />
      <BottomTab.Screen
        name="알림"
        component={ScreenD}
        options={{
          tabBarIcon: ({focused}) => (focused ? <Group67 /> : <Group62 />),
        }}
      />
      <BottomTab.Screen
        name="마이페이지"
        component={ScreenE}
        options={{
          tabBarIcon: ({focused}) => (focused ? <Group68 /> : <Group63 />),
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