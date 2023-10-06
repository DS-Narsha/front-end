import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AchieveItem from '../components/AchieveItem';
import AchieveData from '../data/AchieveData.json';
import {badgeSources} from '../data/BadgeSources';
import Config from 'react-native-config';
import { useDispatch } from "react-redux";
import store, { turn } from '../../Achievement'

type UserData = {
  userId: string;
  groupCode: string;
};

const AchievePage = () => {
  const queryClient = useQueryClient();
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  // get user badgeList
  const getBadgeList = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/badge-list?userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const achieveQuery = useQuery({
    queryKey: ['badge-list'],
    queryFn: getBadgeList,
  });

  const stringToArray = (data: any, index: number) => {
    //console.log(achieveQuery.data);
    //console.log('data: ' + data);
    const badgeArray = data.substring(1, data.length - 1).split(', ');
    //console.log(badgeArray[index]);
    if (badgeArray[index] === 'false') return '진행 중';
    else return '완료';
  };

  const isCompletefunc = (data: any, index: number) => {
    const badgeArray = data.substring(1, data.length - 1).split(', ');
    if (badgeArray[index] === 'false') return false;
    else return true;
  };

  // get Achievement
  const ac = store.getState().achieve
  const dispatch = useDispatch();
   
  // get profile
  const getProfileDetail = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/detail?userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

  const profileQuery = useQuery({
    queryKey: ['profile-detail'],
    queryFn: getProfileDetail,
  });


  // get post listd
  const getPostingList = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/post/user-post-list?userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };
  
  const postQuery = useQuery({
    queryKey: ['posting-list'],
    queryFn: getPostingList,
  });

    // get comment count
    const getCmtCount = async () => {
      try {
        const res = await fetch(
          `http://${Config.HOST_NAME}/api/comment/count?userId=${userData.userId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const json = await res.json();
        return json;
      } catch (err) {
        console.log(err);
      }
    };
    
    const commentQuery = useQuery({
      queryKey: ['comment-count'],
      queryFn: getCmtCount,
    });

  // receive ten like count
  const receiveTenLike = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/like/receive-tenLikes?userId=${userData.userId}&groupCode=${userData.groupCode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };
  
  const receiveTenLikeQuery = useQuery({
    queryKey: ['receive-ten-like'],
    queryFn: receiveTenLike,
  });

  // give ten like count
  const giveTenLike = async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/like/give-tenLikes?userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };
  
  const giveTenLikeQuery = useQuery({
    queryKey: ['give-ten-like'],
    queryFn: giveTenLike,
  });

// update achievement
const updateAchi = useMutation(async (num) => {
  try {
    const res = await fetch(
      `http://${Config.HOST_NAME}/api/user/check-achieve?userId=${
        userData.userId
      }&achieveNum=${num}`,
      {
        method: 'PUT',
      },
    );

    const json = await res.json();

    if (res.ok) {
      dispatch(turn(num));
    } else {
      throw new Error(json.message);
    }

  } catch (err) {
    console.log(err);
  }
});

  const handleBirthAchi = async () => {
    try {
      await updateAchi.mutateAsync(4);
    } catch (error) {}
  };

  const handleFiveAchi = async () => {
    try {
      await updateAchi.mutateAsync(8);
    } catch (error) {}
  };

  const handleFirstPostAchi = async () => {
    try {
      await updateAchi.mutateAsync(1);
    } catch (error) {}
  };

  const handleFivePostAchi = async () => {
    try {
      await updateAchi.mutateAsync(6);
    } catch (error) {}
  };

  const handleFiveCmtAchi = async () => {
    try {
      await updateAchi.mutateAsync(7);
    } catch (error) {}
  };

  const handleReceiveTenLikeAchi = async () => {
    try {
      await updateAchi.mutateAsync(5);
    } catch (error) {}
  };
  
  const handleGiveTenLikeAchi = async () => {
    try {
      await updateAchi.mutateAsync(10);
    } catch (error) {}
  };


  // handleAchi();
  useEffect(()=> {
    !(ac.includes(4)) && !profileQuery.isLoading && !(profileQuery.data.data.birth === null) && handleBirthAchi();
    !(ac.includes(8)) && ac.length>=5 &&  handleFiveAchi();
    !(ac.includes(1)) && !postQuery.isLoading && (postQuery.data.data.length >= 1) && handleFirstPostAchi();
    !(ac.includes(6)) && !postQuery.isLoading && (postQuery.data.data.length >= 5) && handleFivePostAchi();
    !(ac.includes(7)) && !commentQuery.isLoading && (commentQuery.data.data >= 5) && handleFiveCmtAchi();
    !(ac.includes(5)) && !receiveTenLikeQuery.isLoading && receiveTenLikeQuery.data.data && handleReceiveTenLikeAchi();
    !(ac.includes(10)) && !giveTenLikeQuery.isLoading && giveTenLikeQuery.data.data>=10 && handleGiveTenLikeAchi();

    console.log(ac)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            여러분의 SNS 사용을 도와줄 업적입니다~
          </Text>
          <Text style={styles.text}>
            업적을 달성하면 칭호와 뱃지를 얻을 수 있어요!
          </Text>
        </View>
        <View style={styles.achieveContainer}>
          {!achieveQuery.isLoading &&
            achieveQuery.data &&
            AchieveData.map((item, index) => {
              return (
                <AchieveItem
                  key={index}
                  badge={
                    isCompletefunc(achieveQuery.data.data, index)
                      ? badgeSources[index]
                      : require('../assets/badge/badge-none.png')
                  }
                  title={item.title}
                  content={item.content}
                  progress={stringToArray(achieveQuery.data.data, index)}
                  hint={item.hint}
                />
              );
            })}
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
