import React, {useEffect, useState} from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    Image,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import BackSvg from "../../assets/back.svg";
import CommentSendSvg from "../../assets/comment-send.svg"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Loading from './Loading';
import basicProfile from '../../assets/graphic/basic-profile.jpg';
import { useNavigationState } from "@react-navigation/native";

// 댓글 목록 페이지 

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
    userType: string;
};

//@ts-ignore
const CommentListPage = ({route, navigation}) => {
    const postId = route.params.id;
    const [modalVisible, setModalVisible] = useState(false);
    const[loadingModalVisible, setLoadingModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState('');
    const[commentContent, setCommentContent] = useState('');
    const queryClient = useQueryClient();


    

    // queryClient에서 userId와 userType을 가져오는 로직
    const { data: userData } = useQuery(['user'], () => {
        return queryClient.getQueryData(['user']);
    }) as { data: UserData };

    // 사용자 프로필 불러오기
    const fetchUserProfile = async (userId: string) => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/user/detail?userId=${userId}`
          );
          const data = await response.json();
          if (response.ok) {
            setProfileImage(data.profileImage);
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error("사용자 프로필을 가져오는 중 오류가 발생했습니다:", error);
        }
      };
    
      useEffect(() => {
        if (userData && userData.userId) {
          fetchUserProfile(userData.userId);
        }
      }, [userData]);

    // 포스트에 해당되는 댓글 목록 불러오기        
    const fetchComments = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/comment/list?postId=${postId}`);
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


    const commentMutation = useMutation(async () => {
        const response = await fetch(`http://localhost:8080/api/comment/create`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            postId: postId,
            userId: userData.userId,
            content: commentContent
          }),
        })
    
        const data = await response.json();
        return data;
    
    });

    const handleCommentSubmit = async () => {
        try{
            //setLoadingModalVisible(true);
            await commentMutation.mutateAsync();

            // setLoadingModalVisible(false);
            setModalVisible(false);
            queryClient.invalidateQueries(["comments"]);

            setCommentContent('');

        } catch(error) {
            Alert.alert("오류");

            setModalVisible(false);
        }
    }


    const { data: comments, error, isLoading } = useQuery(["comments"], fetchComments);

    if (isLoading) {
        return (
          <View style={styles.container}>
            {/* <Text>로딩 중...</Text> */}
          </View>
        );
    }

    if (error) {
        return (
        <View style={styles.container}>
            <Text>댓글을 불러오는 중 오류가 발생했습니다</Text>
        </View>
        );
    }
    
    const keyboardBehavior =
    Platform.OS === 'ios' ? 'position' : Platform.OS === 'android' ? 'height' : 'height';
    // 뒤로가기 버튼을 눌렀을 때 현재 스택의 정보 출력
    const handleGoBack = () => {
        console.log("뒤로가기")
        navigation.pop();
    };
      
    return (
        <KeyboardAvoidingView
        style={styles.container}>   

                <View style={styles.commentContainer}>
                    <ScrollView 
                    contentContainerStyle={styles.scrollViewContainer}
                    showsVerticalScrollIndicator={false}> 
                    {comments.map((comment: Comment, index: number) => (
                        <View style={styles.commentItem} key={index}>
                            {comment.userId.profileImage ? (
                                <Image
                                source={{ uri: comment.userId.profileImage }}
                                style={styles.commentImage}
                                />
                            ) : (
                                <Image 
                                source={basicProfile}
                                style={styles.commentImage} />
                            )}
                            
                            <View style={styles.commentTextBox}>
                                <Text style={styles.commentID}>{comment.userId.userId}</Text>
                                <Text style={styles.commentText}>{comment.content}</Text>
                                <Text style={styles.commentDay}>{comment.createAt.replace("T", " ").slice(0, 16)}</Text>
                            </View>
                        </View>
                    ))} 
                    </ScrollView>
                </View >

            {/* 모달창 */}
            <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View style={styles.modalTitleArea}> 
                    <Text style={styles.modalTitleText}>여러분들의 댓글을 수정해주세요!</Text>
                </View>
                <Text style={styles.modalText}>색깔로 표시된 글자를 모두 수정해야</Text>
                <Text style={styles.modalText}>SNS에 게시글을 올릴 수 있어요.</Text>
                <Text style={styles.modalText}>여러분의 댓글을 수정해볼까요?</Text>

                <View style={styles.modalAlertArea}>
                    <View style={styles.alertBody}>
                        <Text style={styles.red}></Text>
                        <Text style={styles.alertText}>개인정보, 민간한 정보가 포함되었을 경우</Text>
                    </View>
                    <View style={styles.alertBody}>
                        <Text style={styles.blue}></Text>
                        <Text style={styles.alertText}>욕설, 비속어의 말이 포함되었을 경우</Text>
                    </View>
                </View>
                <View style={styles.modalBtnArea}>
                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={handleCommentSubmit}>
                        <Text style={styles.textStyle}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </View>
            </Modal>


            <View style={styles.bottomContainer}>
                {profileImage ? (
                <Image
                    source={{ uri: profileImage }}
                    style={styles.commentImage}
                />
                ) : (
                    <Image 
                        source={basicProfile}
                        style={styles.commentImage} />
                )}
                <View style={styles.bottomInputText}>
                    <TextInput 
                    onChangeText={(text: React.SetStateAction<string>) =>
                        setCommentContent(text)
                      }
                      value={commentContent}
                    placeholder="@아이디로 글 남기기"/>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <CommentSendSvg />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,    
        backgroundColor: "#ffffff"
    },
    scrollViewContainer: {
        flexGrow: 1,
    },


    commentContainer: {
        height: "92%",
        marginBottom: 0,
    },
    commentItem: {
        flexDirection: "row",
        marginBottom: 5,
        alignItems: "center",
        padding: 10,
        
    },
    commentImage: {
      width: 44,
      height: 44,
      backgroundColor: "#D9D9D9",
      borderRadius: 10
    },
    commentTextBox: {
        marginLeft: 20,
        flexShrink: 1,
        
    },
    commentID: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 4,
        fontFamily: 'NanumSquareB'
    },
    commentText: {
        color: "#000000",
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'NanumSquareR',
       
    },
    commentDay: {
        fontSize: 14,
        fontFamily: 'NanumSquareR'
    },
    bottomContainer: {
        flexDirection: "row",
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomInputText: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#C0C0C0",
        width: '68%',
        height: 42,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 10,
        fontFamily: 'NanumSquareR'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(150, 150, 150, 0.5)"
    },
    modalTitleArea: {
        backgroundColor: "#AADF98",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 17,
        width: "121%",
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalTitleText: {
        color: "black",
        fontSize: 17,
        fontFamily: 'NanumSquareB'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        width: "75%",
        borderRadius: 20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalBtnArea: {
        flexDirection: "row"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#AADF98",
        width: 115,
        marginTop: 20,
        marginRight: 15
    },
    button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#D9D9D9",
        width: 115,
        marginTop: 20
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 2,
        fontFamily: 'NanumSquareB'
    },
    modalText: {
        marginBottom: 3,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'NanumSquareR'
    },
    modalAlertArea: {
        marginTop: 25
    },
    alertBody: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    red: {
        backgroundColor: "red",
        width: 14,
        height: 14,
        borderRadius: 50
    },
    blue: {
        backgroundColor: "blue",
        width: 14,
        height: 14,
        borderRadius: 50,
    },
    alertText: {
        color: "black",
        fontSize: 12,
        marginLeft: 7,
        paddingBottom: 5,
        fontFamily: 'NanumSquareR'
    }
})

export default CommentListPage;