import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../../pages/signup/login/LoginPage';
import SelectGroupPage from '../../pages/signup/login/SelectGroupPage';
import GroupPage from '../../pages/signup/admin/GroupPage';
import SignUpPage from '../../pages/signup/admin/SignUpPage';
import InputGroupPage from '../../pages/signup/user/InputGroupPage';
import StartPage from '../../pages/StartPage';
import InputUserInfoPage from '../../pages/signup/InputUserInfoPage';
import UserPage from '../../pages/signup/SelectUserTypePage';
import MainNavigator from '../../components/navigation/MainNavigator';

import CommentPage from '../../pages/Comment/CommentListPage';
import LikeListPage from '../../pages/Like/LikeListPage';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectGroup"
          component={SelectGroupPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Group"
          component={GroupPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InputGroup"
          component={InputGroupPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InputUserInfoPage"
          component={InputUserInfoPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserType"
          component={UserPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CommentPage"
          component={CommentPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LikePage"
          component={LikeListPage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
