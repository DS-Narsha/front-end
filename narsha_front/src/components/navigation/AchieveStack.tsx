import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import BackSvg from '../../assets/back.svg';
import Main from '../../pages/MainPage';
// import AlarmPage from '../../pages/AlarmPage';
import AchievePage from '../../pages/AchievePage';

const Stack = createStackNavigator();
export default function AchieveStack() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Achieve"
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
          name="AchievePage"
          component={AchievePage}
          options={{title: '업적'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
