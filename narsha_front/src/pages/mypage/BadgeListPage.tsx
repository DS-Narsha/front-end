import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import DS from '../../assets/DS.png';
import SingleBadge from '../../components/SingleBadge';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';


export default function BadgeList({navigation}) {
    // get badge list
    const getBadgeList = async () =>{
      try{
        const res = await fetch(`http://localhost:8080/api/user/badge-list?userId=${"narsha1111"}`,{
          method:"GET",
          headers: {
            'Content-Type': 'application/json',
          },
       })
       const json = await res.json();
       return json;
      } catch(err){
        console.log(err);
      }
    }

    const BadgeQuery = useQuery({
      queryKey: ["badge-list"], 
      queryFn: getBadgeList
    })

    const array=BadgeQuery.data;

  return (
    <View>
      <ScrollView>
      {!BadgeQuery.isLoading && (
      <>
        <View style={styles.ds_container}>
          <Image style={styles.ds_image} source={DS} />
          <Text
            style={
              styles.ds_text
            }>{`업적을 달성하면 뱃지를 얻을 수 있는 거 아시나요?
  여러분이 획득한 뱃지를 볼 수 있는 공간이에요~!`}</Text>
        </View>

        <View style={styles.gridView}>
          <SingleBadge name="좋아요 10개" success={array[0]}/>
          <SingleBadge name="좋아요 10개" success={array[1]}/>
          <SingleBadge name="좋아요 10개" success={array[2]}/>
        </View>

        <View style={styles.gridView}>
          <SingleBadge name="좋아요 10개" success={array[3]}/>
          <SingleBadge name="좋아요 10개" success={array[4]}/>
          <SingleBadge name="좋아요 10개" success={array[5]}/>
        </View>

        <View style={styles.gridView}>
          <SingleBadge name="좋아요 10개" success={array[6]}/>
          <SingleBadge name="좋아요 10개" success={array[7]}/>
          <SingleBadge name="좋아요 10개" success={array[8]}/>
        </View>

        <View style={styles.gridView}>
          <SingleBadge name="좋아요 10개" success={array[9]}/>
        </View>
        </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    height: 63,
    width: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#E3F1A9',
  },
  ds_container: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 30,
  },
  ds_image: {
    width: 49,
    height: 49,
    borderRadius: 50,
  },
  ds_text: {
    marginTop: -3,
    marginLeft: 7,
    backgroundColor: '#fbffe1',
    borderRadius: 20,
    padding: 8,
    color: '#61A257',
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    justifyContent: 'flex-start',
    margin: 15,
  },
});