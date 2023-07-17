import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text, 
  View, 
  TouchableOpacity, 
  Alert,
  Platform,
  ToastAndroid
 } from 'react-native';
import AppLogo from '../../../assets/app-logo.svg';
import CustomButton from '../../../components/CustomButton';
import CopyGroup from '../../../assets/copy-group.svg';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Clipboard from '@react-native-clipboard/clipboard'; 


// 회원가입 완료 페이지_관리자 + 사용자 

//@ts-ignore
const SignUpPage = ({navigation, route}) => {

  const { userType, userId } = route.params;
  const [groupCode, setGroupCode] = useState('');
  const queryClient = useQueryClient();
  
  const signUpMutation = useMutation(async () => {
    const response = await fetch(`http://localhost:8080/api/group/group-code?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  });

  // 페이지 렌더링될 떄마다 유효한 그룹 코드 존재할 시 화면에 띄어줌
  useEffect(() => {
    const fetchGroupCode = async () => {
      try {
        const data = await signUpMutation.mutateAsync();
        if(data.status === 200) {
          setGroupCode(data.data);
          queryClient.setQueryData(['user'], { userId: data.data.userId, userType: data.data.userType });
        } else {
          console.log(data.message);
          Alert.alert('그룹 코드 가져오기 실패', data.message);
        }
        
      } catch (error) {
        console.log(error);
        Alert.alert('오류', '그룹 생성 중 오류가 발생했습니다.');
      }
    };

    fetchGroupCode();
  }, []);

  // 클립보드에 그룹코드 복사
  const handleCopyCode = () => {
    if (Platform.OS === 'android') {
      // 안드로이드
      ToastAndroid.show('그룹 코드가 복사되었습니다.', ToastAndroid.SHORT);
    } else {
      // iOS
      Clipboard.setString(groupCode);
      Alert.alert('알림', '그룹 코드가 복사되었습니다.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <AppLogo />
      </View>
      <View style={styles.textArea}>
        <Text style={styles.title}>가입을 완료했습니다!</Text>
        {userType === 'teacher' && (
        <>
          <Text style={styles.textTitle}>그룹 코드는</Text>
          <View style={styles.CodeContainer}>
            <Text style={styles.textBody}>{groupCode}</Text>
            <TouchableOpacity onPress={handleCopyCode}>
            <CopyGroup />
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitle}>입니다!</Text>
        </>
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, userType === 'student' && { marginTop: 90 }]}
        onPress={() => navigation.reset({routes: [{name: 'MainNavigator'}]})}>   
        <Text style={styles.btnText}>확인!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFDE1',
    height: '100%',
    padding: 45,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 75,
    marginBottom: 70,
  },
  textArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 180,
  },
  title: {
    fontSize: 22,
    marginBottom: 18,
    color: '#000000',
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
  },
  textBody: {
    fontSize: 16,
    marginBottom: 8,
    paddingRight: 8,
    color: '#909090',
  },
  CodeContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#AADF98',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
  btnText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default SignUpPage;
