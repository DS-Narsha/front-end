import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import { useEffect } from 'react';
import MyPage from '../../pages/mypage/MyPage';
import EditProfile from '../../pages/mypage/EditProfilePage';
import FriendList from '../../pages/mypage/FriendListPage';
import NoticeList from '../../pages/NoticeListPage';
import TeacherMenu from '../../pages/TeacherMenuPage';
import TimeSelectPage from '../../pages/TimeSelectPage';
import StudentListPage from '../../pages/StudentListPage';
import NoticeWritePage from '../../pages/NoticeWritePage';
import BackSvg from '../../assets/back.svg';
import BadgeList from '../../pages/mypage/BadgeListPage';
import Write from '../../assets/write.svg';
import Setting from '../../assets/teacher-setting.svg';

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
}
//@ts-ignore
export default function MyPageStack({route, navigation}) {
  useEffect(()=> {
    // hide navigator
    const routeName = getFocusedRouteNameFromRoute(route);
    switch(routeName){
      case "EditProfile": navigation.setOptions({tabBarStyle: {display: 'none'}}); break;
      case "FriendList": navigation.setOptions({tabBarStyle: {display: 'none'}}); break;
      case "BadgeList": navigation.setOptions({tabBarStyle: {display: 'none'}}); break;
      case "StudentListPage": navigation.setOptions({tabBarStyle: {display: 'none'}}); break;
      case "TimeSelectPage": navigation.setOptions({tabBarStyle: {display: 'none'}}); break;
      case "NoticeWritePage": navigation.setOptions({tabBarStyle: {display: 'none'}}); break;
      case "NoticeList": navigation.setOptions({tabBarStyle: {display: 'none'}}); break;
      default: navigation.setOptions({tabBarStyle: tabBarStyle});
    }
  }, [navigation, route])

  return (
      <Stack.Navigator
        initialRouteName="MyPage"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#E3F1A9',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
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
          name="MyPage"
          component={MyPage}
          options={({navigation}) => ({
            title: '@아이디',
            headerRight: () => {
              return (
                <View style={{marginRight: 16}}>
                  <Setting
                    onPress={() => {
                      navigation.navigate('TeacherMenu');
                    }}
                  />
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{title: '프로필 수정'}}
        />
        <Stack.Screen
          name="FriendList"
          component={FriendList}
          options={{title: '친구 목록'}}
        />
        <Stack.Screen
          name="BadgeList"
          component={BadgeList}
          options={{title: '뱃지 목록'}}
        />
        <Stack.Screen
          name="NoticeList"
          component={NoticeList}
          options={({navigation}) => ({
            title: '공지 목록',
            headerRight: () => {
              return (
                <View style={{marginRight: 16}}>
                  <Write
                    onPress={() => {
                      navigation.navigate('NoticeWritePage');
                    }}
                  />
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="TeacherMenu"
          component={TeacherMenu}
          options={{title: '선생님 관리 메뉴'}}
        />
        <Stack.Screen
          name="TimeSelectPage"
          component={TimeSelectPage}
          options={{title: '앱 사용시간 설정하기'}}
        />
        <Stack.Screen
          name="StudentListPage"
          component={StudentListPage}
          options={{title: '그룹에 가입한 학생 목록'}}
        />
        <Stack.Screen
          name="NoticeWritePage"
          component={NoticeWritePage}
          options={{title: '공지 작성 페이지'}}
        />
      </Stack.Navigator>
  );
}
