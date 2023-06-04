import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../../pages/MainPage';
// import AlarmPage from '../../pages/AlarmPage';
import NoticeList from '../../pages/NoticeListPage';
import NoticeWritePage from '../../pages/NoticeWritePage';

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle:{
            backgroundColor: '#E3F1A9',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius:20,
          },
          
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="NoticeList" component={NoticeList} />
        <Stack.Screen name="NoticeWritePage" component={NoticeWritePage} />
        {/* <Stack.Screen name="AlarmPage" component={AlarmPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
