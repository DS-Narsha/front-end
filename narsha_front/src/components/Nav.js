import React from "react";
import {
    Text, 
    View,
} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import MainSvg from "../assets/Group 49.svg";
import ActiveMainSvg from "../assets/Group 54.svg";
import AchieveSvg from "../assets/Group 50.svg";
import ActiveAchieveSvg from "../assets/Group 55.svg";
import WriteSvg from "../assets/Group 51.svg";
import ActiveWriteSvg from "../assets/Group 56.svg";
import AlarmSvg from "../assets/Group 52.svg";
import ActiveAlarmSvg from "../assets/Group 57.svg";
import MypageSvg from "../assets/Group 53.svg";
import ActiveMypageSvg from "../assets/Group 58.svg";
import MainScreen from "./Screen/MainScreen";
import AchieveScreen from "./Screen/AchieveScreen";
import WriteScreen from "./Screen/WriteScreen";
import AlarmScreen from "./Screen/AlarmScreen";
import MypageScreen from "./Screen/MypageScreen";

const Nav = () => {

    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName="Main"
            screenOptions={({route}) => ({
                tabBarStyle: {height: 70, paddingBottom: 10, paddingTop: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30},
                tabBarIcon: ({focused, size}) => {
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
            tabBarOptions={{
               showLabel: false 
            }}>
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