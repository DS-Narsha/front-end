import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
//네비게이션 바 & svg를 활성화 하기 위한 라이브러리를 많이 설치했습니다.
//npm i 꼭 해주셔야 할 것 같아요!

//네비게이션 바가 tab들과 연결될 수 있도록 import 해줌
//각 탭들은 임의로 만들어 놓았습니다. 이름도 임의로 정해놓은 것으로 자유롭게 수정 가능합니다!
import Home from './Home'; //메인페이지
import Achievement from './Achievement'; //업적 페이지
import Write from './Write'; //글쓰기 페이지
import Alarm from './Alarm'; //알림 페이지
import MyPage from './MyPage'; //마이페이지

//svg 파일을 사용할 수 있도록 import 해줌
//svg 파일을 사용하기 위해 수정한 다른 파일: metro.config.js / declaration.d.ts
//svg 파일의 이름 on -> 아이콘이 눌렸을 때 이미지(색깔o), off -> 아이콘이 눌리지 않았을 때 이미지 (색깔x)
import Home_on from '../assets/home_on.svg';
import Home_off from '../assets/home_off.svg';
import Achievement_on from '../assets/achievement_on.svg';
import Achievement_off from '../assets/achievement_off.svg';
import Write_on from '../assets/write_on.svg';
import Write_off from '../assets/write_off.svg';
import Alarm_on from '../assets/alarm_on.svg';
import Alarm_off from '../assets/alarm_off.svg';
import MyPage_on from '../assets/myPage_on.svg';
import MyPage_off from '../assets/myPage_off.svg';

const Tab = createBottomTabNavigator(); // 하단 탭 네비게이터 생성


const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({ // 네비게이션 바의 옵션들을 지정
          tabBarStyle: {height: 70}, // 탭바 스타일 지정) 네비게이션 바 높이 조정
          tabBarShowLabel: false, // svg 파일에 한글 라벨(메인, 업적, 글쓰기, 알림, 마이페이지)이 이미 들어가 있어서 글씨로 나오는 라벨 비활성화 하는 코드
          tabBarIcon: ({focused, color, size}) => { // if문에 따라 focused가 true로 해당되는 아이콘이 선택되어 색 활성화.
            if (route.name === 'Home') {
              return focused ? <Home_on /> : <Home_off style={{}} />; // 메인
            } else if (route.name === 'Achievement') {
              return focused ? <Achievement_on /> : <Achievement_off />; //업적
            } else if (route.name === 'Write') {
              return focused ? <Write_on /> : <Write_off />; //글쓰기
            } else if (route.name === 'Alarm') {
              return focused ? <Alarm_on /> : <Alarm_off />; //알림
            } else if (route.name === 'MyPage') {
              return focused ? <MyPage_on /> : <MyPage_off />; //마이페이지
            }
          },
        })}>
        {/* 네비게이션 바와 각 탭(페이지) 연결 */}
        {/* Alarm의 옵션 options={{tabBarBadge: '30'}} 이것은 알림 개수 출력해주는 옵션 -현재는 임의로 지정해놓은 값 사용 중 */}
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Achievement" component={Achievement} />
        <Tab.Screen name="Write" component={Write} />
        <Tab.Screen name="Alarm" component={Alarm} options={{tabBarBadge: '30'}} /> 
        <Tab.Screen name="MyPage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigator;