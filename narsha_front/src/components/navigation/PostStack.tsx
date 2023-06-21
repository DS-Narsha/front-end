import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SelectImage from '../../pages/post/SelectImagePage';
import PostPage from '../../pages/post/PostPage'
import PostLoadingPage from '../../pages/post/PostLoadingPage';
import WritePage from '../../pages/post/WritePage';

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
          headerShown: false
        }}>
        <Stack.Screen name="SelectImage" component={SelectImage} />
        <Stack.Screen name="PostPage" component={PostPage} />
        <Stack.Screen name="PostLoadingPage" component={PostLoadingPage} />
        <Stack.Screen name="WritePage" component={WritePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
