import React from "react";
import {
    Text, 
    View,
} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import MainSvg from "../assets/main-desel.svg";
import ActiveMainSvg from "../assets/main-sel.svg";

import AchieveSvg from "../assets/achieve-desel.svg";
import ActiveAchieveSvg from "../assets/achieve-sel.svg";

import WriteSvg from "../assets/write-desel.svg";
import ActiveWriteSvg from "../assets/write-sel.svg";

import AlarmSvg from "../assets/alarm-desel.svg";
import ActiveAlarmSvg from "../assets/alarm-sel.svg";

import MypageSvg from "../assets/mypage-desel.svg";
import ActiveMypageSvg from "../assets/mypage-sel.svg";

import MainScreen from "../pages/MainPage";
import AchieveScreen from "../pages/AchievePage";
import WriteScreen from "../pages/WritePage";
import AlarmScreen from "../pages/AlarmPage";
import MypageScreen from "../pages/MypagePage";

const Nav = () => {

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName="Main"
            screenOptions={({route}) => ({
                tabBarShowLabel: false,
                tabBarStyle: {height: 70, paddingBottom: 10, paddingTop: 5, borderTopLeftRadius: 30, borderTopRightRadius: 30},
                tabBarIcon: ({focused}) => {
                    if(route.name === "Main") {
                        return focused ?  <ActiveMainSvg/> : <MainSvg/>
                    } else if(route.name === "Achieve") {
                        return focused ? <ActiveAchieveSvg /> : < AchieveSvg />
                    } else if(route.name === "Write") {
                        return focused ? <ActiveWriteSvg /> : < WriteSvg />
                    } else if(route.name === "Alarm") {
                        return focused ? <ActiveAlarmSvg /> : < AlarmSvg />
                    } else if(route.name === "Mypage") {
                        return focused ? <ActiveMypageSvg /> : < MypageSvg />
                    }
                    
                },
            })}
            >
                <Tab.Screen name="Main" component={MainScreen} />
                <Tab.Screen name="Achieve" component={AchieveScreen} />
                <Tab.Screen name="Write" component={WriteScreen} />
                <Tab.Screen name="Alarm" component={AlarmScreen} />
                <Tab.Screen name="Mypage" component={MypageScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Nav;