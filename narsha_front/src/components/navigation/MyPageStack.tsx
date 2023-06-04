import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  View,
} from 'react-native';
import MyPage from '../../pages/MyPage';
import EditProfile from '../../pages/EditProfilePage';
import FriendList from '../../pages/FriendListPage';
import InfoList from '../../pages/NoticeListPage';
import TeacherMenu from '../../pages/TeacherMenuPage';
import TimeSelectPage from '../../pages/TimeSelectPage';
import StudentListPage from '../../pages/StudentListPage';
import NoticeWritePage from '../../pages/NoticeWritePage';
import BackSvg from "../../assets/back.svg";
import BadgeList from '../../pages/BadgeListPage';

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="MyPage"
        screenOptions={{
          headerStyle:{
            backgroundColor: '#E3F1A9',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius:20,
            height: 60,
          },
          headerBackImage: () => {
            return (
              <View style={{marginLeft: 7}}>
              <BackSvg />
              </View>
            );
          },
          headerTitleAlign: "center"
        }}
        >
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="FriendList" component={FriendList} />
        <Stack.Screen name="BadgeList" component={BadgeList} />
        <Stack.Screen name="InfoList" component={InfoList} />
        <Stack.Screen name="TeacherMenu" component={TeacherMenu} />
        <Stack.Screen name="TimeSelectPage" component={TimeSelectPage} />
        <Stack.Screen name="StudentListPage" component={StudentListPage} />
        <Stack.Screen name="NoticeWritePage" component={NoticeWritePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
