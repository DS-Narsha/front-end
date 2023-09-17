import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AchieveItem from '../components/AchieveItem';
import AchieveData from '../data/AchieveData.json';
import {badgeSources} from '../data/BadgeSources';
import Config from 'react-native-config';
import { useSelector, useDispatch } from "react-redux";
import store, { turn } from '../../Achievement'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

type UserData = {
  userId: string;
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

  // update achievement
  const updateBirthAchi = useMutation(async () => {
    try {
      const res = await fetch(
        `http://${Config.HOST_NAME}/api/user/check-achieve?userId=${
          userData.userId
        }&achieveNum=${4}`,
        {
          method: 'PUT',
        },
      );

      const json = await res.json();
      dispatch(turn(4));
      return json;
    } catch (err) {
      console.log(err);
    }
  });

  const handleBirthAchi = async () => {
    try {
      await updateBirthAchi.mutateAsync();
    } catch (error) {}
  };

  // handleAchi();
  useEffect(()=> {
    !(ac.includes(4)) && !profileQuery.isLoading && !(profileQuery.data.data.birth === null)?
    handleBirthAchi():null;

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

// // Reducer 데이터를 props로 변환
// function mapStateToProps(state){
//   return {
//     achieve: state.achieve
//   };
// }

// // Actions을 props로 변환
// function matchDispatchToProps(dispatch){
//   return bindActionCreators({
//     turn:turn
//   }, dispatch);
// }

// export default connect(mapStateToProps, matchDispatchToProps)(AchievePage);
export default AchievePage;
