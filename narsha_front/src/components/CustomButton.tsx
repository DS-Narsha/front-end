import React, {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// 초록색 버튼(다음 버튼, 확인 버튼)

interface Props {
  title: ReactNode;
  color: ReactNode;
  stack: ReactNode;
  navi: any;
}

function CustomButton({title, color, stack, navi}: Props) {
  return (
    <TouchableOpacity
      style={btnStyles({color}).button}
      onPress={() => {
        navi.navigate(stack);
      }}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#000000',
  },
});

//@ts-ignore
const btnStyles = ({color}) =>
  StyleSheet.create({
    button: {
      backgroundColor: color,
      borderRadius: 30,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      elevation: 5,
    },
  });

export default CustomButton;
