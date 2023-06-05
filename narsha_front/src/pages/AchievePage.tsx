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
            title={'게시글을 작성해보세요.'}
            content={'여러분의 첫 게시글을 작성해볼까요?'}
            progress={'진행 중'}
            hint={
              '밑에 있는 5개의 아이콘 중에 가운데에 위치한 연필 아이콘을 눌러보세요!'
            }
          />
          <AchieveItem
            title={'좋아요를 눌러볼까요?'}
            content={'친구가 올린 게시글에 좋아요를 눌러볼까요?'}
            progress={'진행 중'}
            hint={'친구의 페이지에 놀러가서 친구 게시글에 좋아요를 눌러봐요!'}
          />
          <AchieveItem
            title={'친구 게시글에 댓글 달기'}
            content={'친구의 게시글에 들어가서 댓글을 달아볼까요?'}
            progress={'진행 중'}
            hint={
              '친구의 페이지에 방문하여 친구가 올린 게시글에 댓글을 달 수 있어요.'
            }
          />
          <AchieveItem
            title={'내 프로필에서 생일 설정하기'}
            content={
              '내 프로필에서 생일을 설정해볼까요? 생일을 설정하면 다른 사람에게 축하를 받을 수 있어요!'
            }
            progress={'진행 중'}
            hint={'나의 페이지에서 프로필 수정을 눌러보세요!'}
          />
          <AchieveItem
            title={'내 게시글에 좋아요 10개 받기!'}
            content={'내가 작성한 게시글에서 좋아요 10개를 받아봅시다!'}
            progress={'진행 중'}
            hint={'친구들이 여러분의 게시글에 좋아요를 눌러줄거예요!'}
          />
          <AchieveItem
            title={'게시글 5개 이상 작성하기'}
            content={'5개의 게시글을 작성해볼까요?'}
            progress={'진행 중'}
            hint={
              '게시글을 5회 작성하면 돼요! 너무 자주 작성하거나 내용이 부적절하면 작성이 안 된다는 점!'
            }
          />
          <AchieveItem
            title={'친구 게시글에 댓글 5개 이상 작성하기'}
            content={'친구들이 올린 게시글에 5개의 댓글을 달아볼까요?'}
            progress={'진행 중'}
            hint={'친구 게시글에 들어가서 댓글을 작성해주세요~'}
          />
          <AchieveItem
            title={'친구의 생일 1회 축하하기'}
            content={'여러분 친구의 생일을 축하해주세요!'}
            progress={'진행 중'}
            hint={'생일 게시글이 올라오면 좋아요와 댓글을 달아볼까요?'}
          />
          <AchieveItem
            title={'선생님이 올리신 공지를 확인하기'}
            content={
              '선생님이 여러분들에게 알려줄 정보가 있나봐요~ 공지를 확인해볼까요?'
            }
            progress={'진행 중'}
            hint={'알림 페이지에 올라온 공지 알림을 눌러서 공지를 볼까요?'}
          />
          <AchieveItem
            title={'다른 친구들 10명 게시글에 좋아요 10개 달기'}
            content={'여러 친구들의 게시글을 보면서 좋아요를 10번 눌러볼까요?'}
            progress={'진행 중'}
            hint={
              '10명의 다른 친구들의 게시글을 둘러보면서 좋아요를 눌러보아요~'
            }
          />
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
