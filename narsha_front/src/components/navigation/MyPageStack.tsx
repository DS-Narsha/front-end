import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import MyPage from '../../pages/mypage/MyPage';
import EditProfile from '../../pages/mypage/EditProfilePage';
import FriendList from '../../pages/mypage/FriendListPage';
import InfoList from '../../pages/NoticeListPage';
import TeacherMenu from '../../pages/TeacherMenuPage';
import TimeSelectPage from '../../pages/TimeSelectPage';
import StudentListPage from '../../pages/StudentListPage';
import NoticeWritePage from '../../pages/NoticeWritePage';
import BackSvg from '../../assets/back.svg';
import BadgeList from '../../pages/mypage/BadgeListPage';

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  return (
    <NavigationContainer independent={true}>
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
          options={{title: '마이 페이지'}}
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
          name="InfoList"
          component={InfoList}
          options={{title: '공지 목록'}}
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
    </NavigationContainer>
  );
}
