import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//@ts-ignore
const AchieveItem = ({title, content, progress, hint}) => {
  return (
    <View>
      <View style={styles.achieveItem}>
        <View style={styles.achieveTitle}>
          <Text style={styles.achieveBadge}></Text>
          <Text style={styles.achieveMisson}>{title}</Text>
          <View style={styles.achieveCheck}>
            <Text style={styles.achieveCheckText}>{progress}</Text>
          </View>
        </View>
        <View style={styles.achieveBody}>
          <Text style={styles.achieveDetail}>{content}</Text>
          <Text style={styles.achieveHint}>{hint}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  achieveContainer: {
    paddingLeft: 27,
    paddingRight: 27,
  },
  achieveItem: {
    backgroundColor: '#CCCBCB',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  achieveTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achieveBody: {
    marginTop: 16,
  },
  achieveBadge: {
    backgroundColor: '#909090',
    width: 40,
    height: 40,
  },
  achieveMisson: {
    color: '#000000',
    fontSize: 14,
    marginLeft: 24,
    marginRight: 44,
    fontWeight: '600',
  },
  achieveCheck: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
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
