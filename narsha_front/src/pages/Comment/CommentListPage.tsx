import React, {useEffect, useState} from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert
} from 'react-native';
import BackSvg from "../../assets/back.svg";
import CommentSendSvg from "../../assets/comment-send.svg"
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Loading from './Loading';

// 댓글 목록 페이지 
// 댓글목록 타이틀 텍스트 부분 => 텍스트만 가운데 정렬하는 방법 찾기

type Comment = {
    userId: {
      userId: string;
    };
    content: string;
    createAt: string;
};
  

//@ts-ignore
const CommentListPage = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const fetchComments = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/comment/list?postId=2");
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

    if (isLoading) {
        return (
          <View style={styles.container}>
            <Text>로딩 중...</Text>
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
      
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity>
                    <BackSvg />
                </TouchableOpacity>
                <Text style={styles.titleText}>댓글 목록</Text>
            </View>
            <View style={styles.commentContainer}>

                {comments.map((comment: Comment, index: number) => (
                    <View style={styles.commentItem} key={index}>
                        <Text style={styles.commentImage}> </Text>
                        <View style={styles.commentTextBox}>
                            <Text style={styles.commentID}>{comment.userId.userId}</Text>
                            <Text style={styles.commentText}>{comment.content}</Text>
                            <Text style={styles.commentDay}>{comment.createAt}</Text>
                        </View>
                    </View>
                ))} 
              
            </View>
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
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>확인</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </View>
            </Modal>

            <View style={styles.bottomContainer}>
                <Text style={styles.commentImage}></Text>
                <View style={styles.bottomInputText}>
                    <TextInput placeholder="   @아이디로 글 남기기"/>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <CommentSendSvg />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        flexDirection: "row",
        textAlign: "center",
        marginBottom: 30,
        
    },
    titleText: {
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 120,
        color: "#000000"
    },
    commentContainer: {
        height: "84%",
        marginBottom: 15
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
        marginLeft: 20
    },
    commentID: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 2
    },
    commentText: {
        color: "#000000",
        fontSize: 16,
        marginBottom: 3,
    },
    commentDay: {
        fontSize: 14,
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
        marginRight: 15
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
        fontSize: 17
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
        paddingBottom: 2
    },
    modalText: {
        marginBottom: 3,
        textAlign: 'center',
        color: 'black'
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
        fontSize: 11,
        marginLeft: 7,
        paddingBottom: 5
    }
})

export default CommentListPage;