import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import userImg from '../assets/user-image.png';
import Line from '../assets/Line.svg';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import images from '../assets/images.jpeg';
import Heart from '../assets/heart.svg';
import {ScrollView} from 'react-native-gesture-handler';
import SEND from '../assets/send-btn.svg';
import {TextInput} from 'react-native-gesture-handler';
import Swiper from 'react-native-web-swiper';
import BackSvg from "../assets/back.svg";
import basicProfile from '../assets/graphic/basic-profile.jpg';


type Comment = {
  userId: {
    userId: string;
    profileImage: string;
  };
  content: string;
  createAt: string;
};

type UserData = {
  userId: string;
  groupCode: string;
};

//@ts-ignore
export default function PostDetail({route, navigation}) {

  const id = route.params.detail.postId;
  const queryClient = useQueryClient();


  const {data: userData} = useQuery(['user'], () => {
    return queryClient.getQueryData(['user']);
  }) as {data: UserData};

  const getPostDetail = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/post/detail?postId=${id}&groupCode=${userData.groupCode}&userId=${userData.userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  };

     // 포스트에 해당되는 댓글 목록 불러오기        
     const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/comment/list?postId=${id}`);
        const data = await response.json();
        if (data.status === 200) {
          return data.data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
      }
  };

  const { data: comments, error, isLoading } = useQuery(["comments"], fetchComments);

  const len = comments? comments.length:0

  // query
  const postQuery = useQuery({
    queryKey: ['post-detail'],
    queryFn: getPostDetail,
  });

  const [a, setA] = useState<string[]>([]);

  useEffect(() => {
    const makeArr = async () => {
      const data = await getPostDetail();
      if (data) {
        const str = data ? data.data.imageArray.slice(1, -1) : '';
        const arr = str.split(', ');

        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].toString();
        }

        setA(arr); 
      }
    };

    makeArr();

  }, [postQuery.data]);


  const dateToStr = date => {
    var week = new Array('일', '월', '화', '수', '목', '금', '토');

    var localTime = date.toLocaleTimeString();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayName = week[date.getDay()];

    return (
      year +
      '년 ' +
      month +
      '월 ' +
      day +
      '일 ' +
      dayName +
      '요일 ' +
      localTime.substring(0, 5)
    );
  };

  return (
    <View>
      {!postQuery.isLoading && postQuery.data && (
        <>
          <ScrollView>
            <View style={styles.txtContainer}>
              <Image
                source={{uri: postQuery.data.data.writer.profileImage}}
                style={styles.userImg}
              />
              <Text style={{fontWeight: '600', fontSize: 18, fontFamily: 'NanumSquareB'}}>
                {postQuery.data.data.writer.userId}
              </Text>
            </View>

            <View style={styles.imgContainer}>
              {a.length>0?(
                <Swiper
                loop
                controlsEnabled={false}
                containerStyle={{width: 300, height: 325}}>
                {a.map((item, index) => (
                  <View key={index}>
                    <Image
                      key={index}
                      source={{uri: item}}
                      style={styles.pickImg}
                    />
                  </View>
                ))}
                </Swiper>
              ):<View/>
            }
              
            </View>

            <View style={styles.txtContainer}>
              <Heart style={{marginLeft: 10}} />
              <TouchableOpacity
                onPress={() => navigation.navigate('LikeListPage', { id: id })}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#909090',
                    marginTop: 0,
                    margin: 10,
                    fontFamily: 'NanumSquareR'
                  }}>
                  Narsha님 외 56명이 좋아합니다
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
              <Text style={{fontSize: 15, marginTop: 0, margin: 10, fontFamily: 'NanumSquareR'}}>
                {postQuery.data.data.content}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: '#909090',
                  marginTop: 0,
                  margin: 10,
                  fontFamily: 'NanumSquareR'
                }}>
                {dateToStr(new Date(postQuery.data.data.createAt))}
              </Text>
            </View>

            <View style={{margin: 15, marginLeft: 35, marginBottom: 200}}>
              <Line />

              <TouchableOpacity
                onPress={() => navigation.navigate('CommentListPage', { id: id })}>
                <Text style={{marginTop: 15, color: '#61A257', fontFamily: 'NanumSquareR'}}>
                  댓글 {len}개 전체 보기
                </Text>
              </TouchableOpacity>

              
              <View>
                {comments.map((comment: Comment, index: number)=>(
                  (index<5?(
                    <View style={styles.cmtBody} key={index}>
                  {comment.userId.profileImage ? (
                      <Image
                      source={{ uri: comment.userId.profileImage }}
                      style={styles.cmtUserImg2}
                      />
                  ) : (
                      <Image 
                      source={basicProfile}
                      style={styles.cmtUserImg2} />
                  )}
                  
                  <View style={{marginTop: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, fontFamily: 'NanumSquareB'}}>
                    {comment.userId.userId}
                    </Text>
                    <Text style={{fontFamily: 'NanumSquareR', marginRight: 50}}>{comment.content}</Text>
                  </View>
                  </View>
                  ):<View></View>)
                ))}
               
              </View>

            </View>
          </ScrollView>

          <View style={styles.inputBody}>
            <Image
              source={{uri: postQuery.data.data.writer.profileImage}}
              style={styles.cmtUserImg3}
            />
            <TextInput
              style={styles.input}
              placeholder="@아이디 로 글 남기기"
            />
            <SEND style={{top: 5}} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  txtContainer: {
    flexDirection: 'row',
    marginLeft: 35,
    marginTop: 15,
  },
  imgContainer: {
    // display:'flex',
    // height:'auto',
    // alignItems:'center',
    // marginBottom:-15,
    // marginLeft:50
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    marginLeft: 35,
    marginTop: 15,
  },
  userImg: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  pickImg: {
    height: 300,
    width: 300,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  cmtUserImg1: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  cmtUserImg2: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginRight: 10,
  },
  cmtBody: {
    flexDirection: 'row',
    marginTop: 15,
  },
  inputBody: {
    width: '100%',
    height: 60,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
    bottom: 0,
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
  cmtUserImg3: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  input: {
    width: '75%',
    fontFamily: 'NanumSquareB'
  },
});
