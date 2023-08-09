import {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, ImageBackground, Text} from 'react-native';

//@ts-ignore
const ImageCards = ({sources}) => {
  // animation
  const animationValue = useRef(
    Array.from({length: sources.length}, () => new Animated.Value(0)),
  ).current;

  const startAnimation = useCallback(() => {
    animationValue.map((item, index) => moveImage(item, index));
  }, [animationValue]);

  const moveImage = (item: any, index: number) =>
    Animated.timing(item, {
      delay: 2000 * (index + 1),
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

  const translateX = (index: number) =>
    animationValue[index].interpolate({
      inputRange: [0, 1],
      outputRange: [0, -400],
    });

  // start animation
  useEffect(() => {
    console.log('ff');
    startAnimation();
  }, [startAnimation]);

  return (
    <>
      {sources.map((item, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              {zIndex: -index},
              styles.content,
              {transform: [{translateX: translateX(index)}]},
            ]}>
            <ImageBackground
              source={{uri: item}}
              key={index}
              imageStyle={{borderRadius: 10}}
              style={[styles.card]}
            />
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: 300,
    height: 300,
    position: 'absolute',
    borderRadius: 10,
    opacity: 0.9,
    backgroundColor: '#000000d4',
    shadowOffset: {
      width: 5,
      height: -10,
    },
    elevation: 5,
  },
});

export default ImageCards;
