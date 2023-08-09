import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import ReadGlass from '../../assets/ic-readglass.svg';

const ReadingGlasses = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, [animationValue]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const RotateDataX = animationValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 20, 40, 20, 0],
  });

  const RotateDataY = animationValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 20, 0, -20, 0],
  });

  return (
    <>
      <View>
        <Animated.View
          style={{
            transform: [{translateX: RotateDataX}, {translateY: RotateDataY}],
          }}>
          <ReadGlass />
        </Animated.View>
      </View>
    </>
  );
};

export default ReadingGlasses;
