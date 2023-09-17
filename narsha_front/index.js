
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

// import turnAchieve from './Achievement';
import React from "react";
import  { Provider }  from "react-redux";
import store from './Achievement'

// const store = createStore(turnAchieve); 

// const rootReducer = combineReducers({
//     turnAchieve
// });
  

messaging().setBackgroundMessageHandler(async message => {
    console.log(message);
})

const Root = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );
  
AppRegistry.registerComponent(appName, () => Root);