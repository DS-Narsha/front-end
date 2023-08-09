import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import Cloud from '../../assets/graphic/loading-cloud.svg';

const LoadingCloud = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  // window size
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  console.log(windowHeight, windowWidth);

  const randomDelay = Math.floor(Math.random() * 5) + 1;
  console.log(randomDelay);

  const startAnimation = useCallback(() => {
    Animated.delay(randomDelay);
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ).start();
  }, [animationValue]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [windowWidth, -100],
  });

  const translateY = animationValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [
      windowHeight * (60 / 100),
      windowHeight * (60 / 100) + 10,
      windowHeight * (60 / 100),
      windowHeight * (60 / 100) - 10,
      windowHeight * (60 / 100),
    ],
  });

  return (
    <Animated.View
      style={[
        styles.cloud,
        {
          transform: [{translateX: translateX}, {translateY: translateY}],
        },
      ]}>
      <Cloud />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cloud: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
});

export default LoadingCloud;
