import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectImage from '../../pages/SelectImagePage';

const Stack = createStackNavigator();
export default function MainNavigatorStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="SelectImage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SelectImage" component={SelectImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
