import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectImage from '../../pages/post/SelectImagePage';

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="SelectImage"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#E3F1A9',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}>
        <Stack.Screen name="SelectImage" component={SelectImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
