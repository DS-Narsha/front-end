import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import NoticeModal from '../components/NoticeModal';
import MainPost from '../components/MainPost';
import NEW from '../assets/new-btn.svg';
import RecentPost from '../components/RecentPost';

const styles = StyleSheet.create({
    absolute:{
        position:'absolute',
        right:10,
        bottom:10,
    }
})

const MainScreen = () => {
    return (
        <View>
            <View>
                <NoticeModal />
                <MainPost />
            </View>
        
            <TouchableOpacity style={styles.absolute}>
            <RecentPost />
            </TouchableOpacity>
            
            {/* <RecentPost /> */}
        </View>
    );
};

export default MainScreen;