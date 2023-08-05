import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomButton from '../components/CustomButton.tsx';

//@ts-ignore
const StartPage = ({navigation}) => {
  return (
    <ImageBackground
      source={require('../assets/start-bg.jpg')}
      style={styles.container}
      imageStyle={{opacity: 0.8}}>
      <View style={styles.blank} />
      <View style={styles.introContainer}>
        <Text style={styles.introTitle}>뭉게뭉게</Text>
        <Text style={styles.introContent}>
          안녕하세요! SNS 교육 플랫폼 {'\n'}뭉게뭉게입니다!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={'로그인'}
          color={'#E3F1A9'}
          navi={navigation}
          stack="Login"
        />
        {/* height */}
        <View style={{height: 15}} />
        <CustomButton
          title={'회원가입'}
          color={'#AADF98'}
          navi={navigation}
          stack="UserType"
        />
      </View>
      {/* height */}
      <View style={{height: 130}} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 25,
    flexDirection: 'column',
  },
  introContainer: {
    flex: 2,
  },
  introTitle: {
    fontWeight: '600',
    color: '#61A257',
    fontSize: 40,
    fontFamily: 'NanumSquareB',
    marginBottom: 10,
  },
  introContent: {
    width: 220,
    fontSize: 16,
    fontFamily: 'NanumSquareR',
  },
  buttonContainer: {
    flex: 1,
  },
  blank: {
    flex: 1,
  },
});

export default StartPage;
