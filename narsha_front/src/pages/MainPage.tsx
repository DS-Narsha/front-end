import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import NoticeModal from '../components/NoticeModal';
import MainPost from '../components/MainPost';
import NEW from '../assets/new-btn.svg';
import RecentPost from '../components/RecentPost';

const styles = StyleSheet.create({
    top: {
      flexDirection: 'row',
      height: 63,
      width: 400,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      backgroundColor: '#E3F1A9',
    },
    absolute:{
        position:'absolute',
        right:10,
        bottom:10,
    }
})

const MainScreen = () => {
    return (
        <>
            <View>
                <View style={styles.top}>
                <Text style={{margin: 20, marginLeft: 150, fontSize: 18, fontWeight:'bold'}}>
                    App Name
                </Text>
                </View>
                
                <NoticeModal />
                <MainPost />
            </View>

            <NEW style={styles.absolute} />
            
            {/* <RecentPost /> */}
        </>
    );
};

export default MainScreen;