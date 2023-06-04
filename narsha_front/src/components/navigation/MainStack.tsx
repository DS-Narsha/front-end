import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import BackSvg from '../../assets/back.svg';
import Main from '../../pages/MainPage';
// import AlarmPage from '../../pages/AlarmPage';
import NoticeList from '../../pages/NoticeListPage';
import NoticeWritePage from '../../pages/NoticeWritePage';
import Write from '../../assets/write.svg';

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Main"
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
          name="Main"
          component={Main}
          options={{title: 'App name'}}
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
          name="NoticeWritePage"
          component={NoticeWritePage}
          options={{title: '공지 작성 페이지'}}
        />
        {/* <Stack.Screen name="AlarmPage" component={AlarmPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
