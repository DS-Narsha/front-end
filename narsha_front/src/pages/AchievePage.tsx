import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AchieveItem from '../components/AchieveItem';

const AchievePage = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            여러분의 SNS 사용을 도와줄 업적입니다~
          </Text>
          <Text style={styles.text}>
            업적을 달성하면 칭호와 뱃지를 얻을 수 있어요!
          </Text>
        </View>
        <View style={styles.achieveContainer}>
          <AchieveItem
            title={'좋아요를 눌러볼까요?'}
            content={'다른 친구 게시글에 좋아요를 눌러볼까요?'}
            progress={'진행 중'}
            hint={'메인 페이지에서 친구 글에 좋아요를 눌러봐요!'}
          />
          <AchieveItem
            title={'좋아요를'}
            content={'다른 친구 게시글에 '}
            progress={'진행 중'}
            hint={'메인 페이지에서!'}
          />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
          <AchieveItem title={''} content={''} progress={''} hint={''} />
        </View>
        {/* height */}
        <View style={{height: 100}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  text: {
    color: '#000000',
    fontSize: 12,
  },
  achieveContainer: {
    paddingLeft: 27,
    paddingRight: 27,
  },
});

export default AchievePage;
