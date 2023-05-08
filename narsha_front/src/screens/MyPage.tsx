import React from 'react';
import {Text} from 'react-native';

export default function MyPage() {
  const textElement = React.createElement(Text, null, '마이페이지');
  return textElement;
}