import React from 'react';
import {
    Text,
    View,
    Image
  } from 'react-native';

  
const NotAvailable = () => {

    return (
        <View>
            <Image source={require('../../src/assets/notAvailable.png')} style={{height:"100%"}}/>
        </View>
    )

}

export default NotAvailable