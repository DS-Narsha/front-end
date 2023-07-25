import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import achieveData from '../data/AchieveData.json';

//@ts-ignore
const AchieveItem = ({badge, title, content, progress, hint}) => {
  return (
    <View>
      <View style={styles.achieveItem}>
        <View style={styles.titleContainer}>
          <View style={styles.achieveTitle}>
            <Image source={badge} style={styles.achieveBadge} />
            <Text style={styles.achieveMisson}>{title}</Text>
          </View>
          <View style={styles.achieveCheck}>
            <Text style={styles.achieveCheckText}>{progress}</Text>
          </View>
        </View>
        <View style={styles.achieveBody}>
          <Text style={styles.achieveDetail}>{content}</Text>
        </View>
        <Text style={styles.achieveHint}>힌트: {hint}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  achieveItem: {
    flexDirection: 'column',
    backgroundColor: '#FCFDE1',
    height: 170,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 19,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  achieveTitle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  achieveBody: {
    marginTop: 5,
  },
  achieveBadge: {
    width: 45,
    height: 45,
  },
  achieveMisson: {
    color: '#61A257',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 45,
    flexWrap: 'wrap',
  },
  achieveCheck: {
    backgroundColor: '#C0C0C0',
    borderRadius: 50,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    float: 'right',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  achieveCheckText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  achieveDetail: {
    color: '#454545',
    fontSize: 13,
    flexWrap: 'wrap',
  },
  achieveHint: {
    fontSize: 13,
    color: '#909090',
    marginTop: 5,
    marginBottom: 2,
    flexWrap: 'wrap',
  },
});

export default AchieveItem;
