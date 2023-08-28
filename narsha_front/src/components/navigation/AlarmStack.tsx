import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import BackSvg from '../../assets/back.svg';
import AlarmPage from '../../pages/AlarmPage';
import CommentListPage from '../../pages/comment/CommentListPage';
import LikeListPage from '../../pages/like/LikeListPage';
import NoticeList from '../../pages/NoticeListPage';
import Write from '../../assets/write.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {useEffect} from 'react';

type UserData = {
  userId: string;
  userType: string;
};


const Stack = createStackNavigator();
const tabBarStyle = {
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  position: 'absolute',
  overflow: 'hidden',
  height: 70,
  left: 0,
  bottom: 0,
  right: 0,
  paddingBottom: 8,
};

//@ts-ignore
export default function AlarmStack({route, navigation}) {

  const queryClient = useQueryClient();

  // queryClient에서 userId와 userType을 가져오는 로직
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    switch(routeName) {
      case 'NoticeWritePage':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      case 'NoticeList':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      case 'CommentListPage':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      case 'LikeListPage':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      default:
        navigation.setOptions({tabBarStyle: tabBarStyle});
        break;
    }
  }, [navigation, route]);

  return (
      <Stack.Navigator
        initialRouteName="Alarm"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#E3F1A9',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
          cardStyle: {
            backgroundColor: "#FFFFFF"
          },
          headerBackImage: () => {
            return (
              <View style={{marginLeft: 7}}>
                <BackSvg />
              </View>
            );
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Alarm"
          component={AlarmPage}
          options={{
            title: '알림',
            headerTitleStyle: {
              fontFamily: 'NanumSquareB', color: '#000000',
            },
          }}
        />
      <Stack.Screen
        name="NoticeList"
        component={NoticeList}
        options={({navigation}) => ({
          title: '공지 목록',
          headerTitleStyle: {
            fontFamily: 'NanumSquareB', color: '#000000',
          },
          cardStyle: {
            backgroundColor: '#E3F1A9',
          },
          headerRight: () => {
            return (
              <View style={{marginRight: 16}}>
                {userData.userType == 'teacher' ? (
                  <Write
                    onPress={() => {
                      navigation.navigate('NoticeWritePage');
                    }}
                  />
                ) : null}
              </View>
            );
          },
        })}
      />
      <Stack.Screen
        name="CommentListPage"
        component={CommentListPage}
        options={{
          title: '댓글 목록',
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Stack.Screen
        name="LikeListPage"
        component={LikeListPage}
        options={{
          title: '좋아요 목록',
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      </Stack.Navigator>
  );
}
