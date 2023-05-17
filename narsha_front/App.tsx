import React from 'react';
import {Text, View} from 'react-native';
import Nav from './src/components/Nav';
import LoginPage from './src/pages/Login/LoginPage';
import UserPage from './src/pages/SignUp/UserPage';
import InfoPage from './src/pages/SignUp/InfoPage';
import GroupPage from './src/pages/SignUp/Admin/GroupPage';
import SignUpPage from './src/pages/SignUp/Admin/SignUpPage';
import InputGroupPage from './src/pages/SignUp/User/InputGroupPage';
import UserSignUpPage from './src/pages/SignUp/User/UserSignUpPage';
import SelectGroupPage from './src/pages/Login/SelectGroupPage';

export default function App() {
  return (
    <Nav />
  )
}
