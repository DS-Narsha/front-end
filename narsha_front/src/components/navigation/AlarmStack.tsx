import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import BackSvg from '../../assets/back.svg';
import AlarmPage from '../../pages/AlarmPage';

const Stack = createStackNavigator();
export default function AlarmStack() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Alarm"
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
          name="Alarm"
          component={AlarmPage}
          options={{title: '알림'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
