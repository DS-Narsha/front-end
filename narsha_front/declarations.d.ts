declare module '*.svg' {
  //SVG 파일을 인식하기 위한 코드
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
