import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import EditProfile from '../EditProfilePage';
import TeacherMenu from '../TeacherMenuPage';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="MyPage">
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="TeacherMenu" component={TeacherMenu} />
      {/* <Stack.Screen name="MyPage" component={MyPage} /> */}
    </Stack.Navigator>
  );
}
