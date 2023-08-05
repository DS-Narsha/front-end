import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import BackSvg from '../../assets/back.svg';
import Main from '../../pages/MainPage';
// import AlarmPage from '../../pages/AlarmPage';
import NoticeList from '../../pages/NoticeListPage';
import NoticeWritePage from '../../pages/NoticeWritePage';
import Write from '../../assets/write.svg';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type UserData = {
  userId: string;
  userType: string;
};

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  const queryClient = useQueryClient();

  // queryClient에서 userId와 userType을 가져오는 로직
  const { data: userData } = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as { data: UserData };

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
          name="Main"
          component={Main}
          options={{title: '뭉게뭉게'}}
        />
        <Stack.Screen
          name="NoticeList"
          component={NoticeList}
          options={({navigation}) => ({
            title: '공지 목록',
            cardStyle: {
              backgroundColor: "#F9FAC8"
            },
            headerRight: () => {
              return (
                <View style={{marginRight: 16}}>
                  {
                    userData.userType == "teacher"
                    ? <Write
                    onPress={() => {
                      navigation.navigate('NoticeWritePage');
                    }}
                    />
                    :null
                  }
                </View>
              );
            },
          })}
        />
        <Stack.Screen
          name="NoticeWritePage"
          component={NoticeWritePage}
          options={{title: '공지 작성 페이지',
          cardStyle: {
            backgroundColor: "#F9FAC8"
          }}}
        />
        {/* <Stack.Screen name="AlarmPage" component={AlarmPage} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
