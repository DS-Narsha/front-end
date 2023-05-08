import React from 'react';
import {Text} from 'react-native';

export default function Write() {
  const textElement = React.createElement(Text, null, '글작성');
  return textElement;
}