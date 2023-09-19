import {NavigationContainer} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import {View} from 'react-native';
import BackSvg from '../../assets/back.svg';
import Main from '../../pages/MainPage';
// import AlarmPage from '../../pages/AlarmPage';
import NoticeList from '../../pages/NoticeListPage';
import NoticeWritePage from '../../pages/NoticeWritePage';
import Write from '../../assets/write.svg';
import GuidePage from '../../pages/GuidePage';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import CommentListPage from '../../pages/comment/CommentListPage';

type UserData = {
  userId: string;
  userType: string;
};

const tabBarStyle = {
  display: 'flex',
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

const Stack = createStackNavigator();
//@ts-ignore
export default function MainStack({route, navigation}) {
  useEffect(() => {
    // hide navigator
    const routeName = getFocusedRouteNameFromRoute(route);
    // console.log(routeName);
    switch (routeName) {
      case 'GuidePage':
        navigation.setOptions({tabBarStyle: {display: 'none'}});
        break;
      case 'CommentListPage':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      default:
        navigation.setOptions({tabBarStyle: tabBarStyle});
        break;
    }
  }, [navigation, route]);
  const queryClient = useQueryClient();

  // queryClient에서 userId와 userType을 가져오는 로직
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E3F1A9',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        cardStyle: {
          backgroundColor: '#FFFFFF',
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
        name="Main"
        component={Main}
        options={{
          title: '뭉게뭉게',
          headerTitleStyle: {
            fontFamily: 'NanumSquareB',
            color: '#000000',
          },
        }}
      />
      <Stack.Screen
        name="NoticeList"
        component={NoticeList}
        options={({navigation}) => ({
          title: '공지 목록',
          headerTitleStyle: {
            fontFamily: 'NanumSquareB',
            color: '#000000',
          },
          cardStyle: {
            backgroundColor: '#F9FAC8',
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
        name="GuidePage"
        component={GuidePage}
        options={{
          title: '둥실둥실 사용설명서',
          headerTitleStyle: {
            fontFamily: 'NanumSquareB',
            color: '#000000',
          },
          cardStyle: {
            backgroundColor: '#F9FAC8',
          },
        }}
      />
      <Stack.Screen
        name="NoticeWritePage"
        component={NoticeWritePage}
        options={{
          title: '공지 작성 페이지',
          headerTitleStyle: {
            fontFamily: 'NanumSquareB',
            color: '#000000',
          },
          cardStyle: {
            backgroundColor: '#F9FAC8',
          },
        }}
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
      {/* <Stack.Screen name="AlarmPage" component={AlarmPage} /> */}
    </Stack.Navigator>
  );
}
