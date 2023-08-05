import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectImage from '../../pages/post/SelectImagePage';
import PostPage from '../../pages/post/PostPage';
import PostLoadingPage from '../../pages/post/PostLoadingPage';
import WritePage from '../../pages/post/WritePage';
import {useEffect} from 'react';
import {Dimensions, View} from 'react-native';

const Stack = createStackNavigator();
const tabBarStyle = {
  display: 'flex',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  position: 'absolute',
  overflow: 'hidden',
  height: 70,
  left: 0,
  bottom: 0,
  right: 0,
  paddingBottom: 8,
};

//@ts-ignore
export default function PostStack({navigation, route}) {
  useEffect(() => {
    // hide navigator
    var screens = {PostLoadingPage: 1, WritePage: 2};
    const routeName = getFocusedRouteNameFromRoute(route);
    switch (routeName) {
      case 'PostLoadingPage':
        navigation.setOptions({tabBarStyle: {display: 'none'}});
        break;
      case 'WritePage':
        navigation.setOptions({tabBarStyle: {display: 'none'}});
        break;
      default:
        navigation.setOptions({tabBarStyle: tabBarStyle});
        break;
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator
      initialRouteName="SelectImage"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#E3F1A9',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },

        headerShown: false,
      }}>
      <Stack.Screen name="SelectImage" component={SelectImage} />
      <Stack.Screen name="PostPage" component={PostPage} />
      <Stack.Screen name="PostLoadingPage" component={PostLoadingPage} />
      <Stack.Screen name="WritePage" component={WritePage} />
    </Stack.Navigator>
  );
}
