import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MyPage from '../../pages/MyPage';
import EditProfile from '../../pages/EditProfilePage';
import FriendList from '../../pages/FriendListPage';
import InfoList from '../../pages/NoticeListPage';
import TeacherMenu from '../../pages/TeacherMenuPage';

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="MyPage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="FriendList" component={FriendList} />
        <Stack.Screen name="InfoList" component={InfoList} />
        <Stack.Screen name="TeacherMenu" component={TeacherMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
