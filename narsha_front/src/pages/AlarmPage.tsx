import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DS from '../assets/DS.png';
import LikeSvg from '../assets/alarm/like.svg';
import NoticeSvg from '../assets/alarm/notice.svg';
import CommentSvg from '../assets/alarm/comment.svg';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Config from 'react-native-config';

// 알람 스크린 페이지

type UserData = {
  userId: string;
  userType: string;
  groupCode: string;
};

type Alarm = {
  actionType: string;
  message: string;
  createdAt: string;
  postId: {
    postId: number;
  };
  userId: {
    userId: string;
  };
  alarmId: number;
};

//@ts-ignore
const AlarmPage = ({navigation}) => {
  const queryClient = useQueryClient();
  const [alarmData, setAlarmData] = useState<Alarm[]>([]);

  // queryClient에서 userId와 userType을 가져오는 로직
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // 알람 목록 불러오기
  const fetchAlarmList = async (userId: string, groupCode: string) => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/alarm/list?userId=${userId}&groupCode=${groupCode}`,
      );
      const data = await response.json();
      setAlarmData(data.data);
    } catch (error) {
      console.error('알람 목록 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    if (userData && userData.userId && userData.groupCode) {
      fetchAlarmList(userData.userId, userData.groupCode);
    }
  }, [userData]);

  // 현재 시간과 생성 시간의 차이를 계산하는 함수
  const getTimeDifference = (createdAt: string): string => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    // 시간대 설정 (한국 시간대: KST)
    const kstOffset = 9 * 60; // 한국은 UTC+9

    const timeDifferenceInMillis =
      currentDate.getTime() - createdDate.getTime() + kstOffset * 60 * 1000;
    const timeDifferenceInMinutes = Math.floor(
      timeDifferenceInMillis / (1000 * 60),
    );

    if (timeDifferenceInMinutes < 1) {
      return '방금 전';
    } else if (timeDifferenceInMinutes < 60) {
      return `${timeDifferenceInMinutes}분 전`;
    } else {
      const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
      return `${timeDifferenceInHours}시간 전`;
    }
  };

  const deleteAlarm = async (alarmId: number) => {
    try {
      const response = await fetch(
        `http://${Config.HOST_NAME}/api/alarm/delete?alarmId=${alarmId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        fetchAlarmList(userData.userId, userData.groupCode);
      } else {
        console.error('알람 삭제하는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('알람 삭제하는 중 오류가 발생했습니다.', error);
    }
  };

  const renderAlarmItem = ({item}: {item: Alarm}) => (
    <TouchableOpacity onPress={() => handleAlarmItemClick(item)}>
      <View style={styles.alarm_container}>
        {item.actionType === 'LIKE' && <LikeSvg style={styles.alarm_image} />}
        {item.actionType === 'COMMENT' && (
          <CommentSvg style={styles.alarm_image} />
        )}
        {item.actionType === 'NOTICE' && (
          <NoticeSvg style={styles.alarm_image} />
        )}
        <View style={styles.alarm_text_container}>
          {item.actionType === 'LIKE' && (
            <Text style={styles.alarm_text}>
              @{item.userId.userId} 가 게시물에 좋아요를 눌렀어요!
            </Text>
          )}
          {item.actionType === 'COMMENT' && (
            <Text style={styles.alarm_text}>
              @{item.userId.userId} 가 게시물에 댓글을 작성했어요!
            </Text>
          )}
          {item.actionType === 'NOTICE' && (
            <Text style={styles.alarm_text}>
              선생님이 공지를 올리셨어요! 확인하러 가볼까요?
            </Text>
          )}
          <Text style={styles.alarm_text}>
            {getTimeDifference(item.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleAlarmItemClick = (item: Alarm) => {
    const {actionType, postId, alarmId} = item;

    if (actionType === 'LIKE') {
      // 좋아요 페이지로 이동하면서 postId 전달
      navigation.navigate('LikeListPage', {id: postId.postId});
    } else if (actionType === 'COMMENT') {
      // 댓글 페이지로 이동하면서 postId 전달
      navigation.navigate('CommentListPage', {id: postId.postId});
    } else if (actionType === 'NOTICE') {
      // 공지 페이지로 이동 (targetId 사용하지 않음)
      navigation.navigate('NoticeList');
    }

    deleteAlarm(alarmId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ds_container}>
        <Image style={styles.ds_image} source={DS} />
        <View style={styles.ds_text_container}>
          <Text style={styles.ds_text}>
            좋아요, 공지, 댓글, 생일 등등의 여러가지 알림이{'\n'}오는
            페이지입니다!
          </Text>
        </View>
      </View>

      <FlatList
        data={alarmData}
        renderItem={renderAlarmItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  ds_container: {
    flexDirection: 'row',
    marginTop: 27,
    marginLeft: 20,
  },
  ds_image: {
    width: 49,
    height: 49,
    borderRadius: 50,
  },
  ds_text_container: {
    backgroundColor: '#FFFFFF',
    marginLeft: 10,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  },
  ds_text: {
    color: '#61A257',
    fontFamily: 'NanumSquareR',
    fontSize: 14,
  },
  alarm_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 15,
  },
  alarm_image: {
    width: 60,
    height: 60,
  },
  alarm_text_container: {
    flexDirection: 'column',
  },
  alarm_text: {
    fontFamily: 'NanumSquareR',
    color: '#000000',
    marginLeft: 13,
    marginTop: 5,
  },
});

export default AlarmPage;
