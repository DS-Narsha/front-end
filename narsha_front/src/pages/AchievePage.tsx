import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AchieveItem from '../components/AchieveItem';
import AchieveData from '../data/AchieveData.json';
import {badgeSources} from '../data/BadgeSources';

const AchievePage = () => {
  // get user badgeList
  const getBadgeList = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/user/badge-list?userId=${'narsha1111'}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      console.log(JSON.stringify(json));
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
