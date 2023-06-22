import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../../pages/SignUp/login/LoginPage';
import SelectGroupPage from '../../pages/SignUp/login/SelectGroupPage';
import GroupPage from '../../pages/SignUp/Admin/GroupPage';
import SignUpPage from '../../pages/SignUp/Admin/SignUpPage';
import InputGroupPage from '../../pages/SignUp/User/InputGroupPage';
import StartPage from '../../pages/StartPage';
import InputUserInfoPage from '../../pages/SignUp/InputUserInfoPage';
import UserPage from '../../pages/SignUp/SelectUserTypePage';
import MainNavigator from '../../components/navigation/MainNavigator';

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
          name="Main"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
