import {NavigationContainer, getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import {useEffect} from 'react';
import FriendPage from '../../pages/friendpage/FriendPage';
import FriendPostDetail from '../../pages/friendpage/FriendPostDetailPage';
import CommentListPage from '../../pages/comment/CommentListPage';
import LikeListPage from '../../pages/like/LikeListPage';
import BackSvg from '../../assets/back.svg';
import FriendBadgeList from '../../pages/friendpage/FriendBadgeListPage';
import {useQuery, useQueryClient} from '@tanstack/react-query';

type UserData = {
  userId: string;
  userType: string;
};

interface RouteParams {
  friendId: string;
}

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

export default function FriendStack({route, navigation}: any) {
  const queryClient = useQueryClient();

  const friendRoute = useRoute();
  const { friendId } = friendRoute.params as RouteParams;
  console.log("여기는 MyPageStack");
  console.log(friendId);

  // queryClient에서 userId와 userType을 가져오는 로직
  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  useEffect(() => {
    // hide navigator
    const routeName = getFocusedRouteNameFromRoute(route);
    switch (routeName) {
      case 'FriendPage':
        navigation.setOptions({tabBarStyle: {display: 'none'}});
        break;
      case 'FriendBadgeList':
        navigation.setOptions({tabBarStyle: {display: 'none'}});
        break;
      case 'FriendPostDetailPage':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      case 'FriendCommentListPage':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      case 'FriendLikeListPage':
        navigation.setOptions({tabBarStyle: {display: 'none', zIndex: -1}});
        break;
      default:
        navigation.setOptions({tabBarStyle: tabBarStyle});
        break;
    }
  }, [navigation, route]);

  return (
  // <NavigationContainer independent={true}>
    <Stack.Navigator
      initialRouteName="FriendPage"
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          backgroundColor: '#E3F1A9',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: '#FCFDE1',
        },
        headerBackImage: () => {
          return (
            <View style={{marginLeft: 7}}>             
                <BackSvg />
            </View>
          );
        },
      }}>
      <Stack.Screen
        name="FriendPage"
        component={FriendPage}
        initialParams={{ friendId: friendId }}
        options={{
          title: `@${friendId}`,
          headerTitleStyle: {
            fontFamily: 'NanumSquareB', color: '#000000',
          },
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Stack.Screen
        name="FriendBadgeList"
        component={FriendBadgeList}
        options={{
          title: '뱃지 목록',
          headerTitleStyle: {
            fontFamily: 'NanumSquareB', color: '#000000',
          },
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Stack.Screen
        name="FriendPostDetailPage"
        component={FriendPostDetail}
        options={{
          title: '포스트 상세 페이지',
          headerTitleStyle: {
            fontFamily: 'NanumSquareB', color: '#000000',
          },
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Stack.Screen
        name="FriendCommentListPage"
        component={CommentListPage}
        options={{
          title: '댓글 목록',
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Stack.Screen
        name="FriendLikeListPage"
        component={LikeListPage}
        options={{
          title: '좋아요 목록',
          cardStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
    </Stack.Navigator>
  // </NavigationContainer>
  );
}
