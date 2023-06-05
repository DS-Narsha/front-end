import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//@ts-ignore
const AchieveItem = ({title, content, progress, hint}) => {
  return (
    <View>
      <View style={styles.achieveItem}>
        <View style={styles.titleContainer}>
          <View style={styles.achieveTitle}>
            <Text style={styles.achieveBadge}></Text>
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
    backgroundColor: '#CCCBCB',
    height: 160,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 19,
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
    backgroundColor: '#909090',
    width: 40,
    height: 40,
  },
  achieveMisson: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    marginRight: 45,
  },
  achieveCheck: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    float: 'right',
  },
  achieveCheckText: {
    color: '#000000',
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: '600',
  },
  achieveDetail: {
    color: '#454545',
    fontSize: 13,
  },
  achieveHint: {
    fontSize: 13,
    color: '#909090',
    marginTop: 5,
    marginBottom: 2,
  },
});

export default AchieveItem;
