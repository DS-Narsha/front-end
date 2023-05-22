import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import BackSvg from "../../assets/back.svg";
import CommentSendSvg from "../../assets/comment-send.svg"
// 댓글 목록 페이지 
// 댓글목록 타이틀 텍스트 부분 => 텍스트만 가운데 정렬하는 방법 찾기

const LikeListPage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <TouchableOpacity>
                    <BackSvg />
                </TouchableOpacity>
                <Text style={styles.titleText}>게시글 좋아요 목록</Text>
            </View>
            <View style={styles.likeContainer}>
                <View style={styles.likeItem}>
                    <Text style={styles.likeImage}> </Text>
                    <View style={styles.likeTextBox}>
                        <Text style={styles.likeID}>USER_ID</Text>
                        <Text style={styles.likeName}>user_name</Text>
                    </View>
                </View>

                <View style={styles.likeItem}>
                    <Text style={styles.likeImage}> </Text>
                    <View style={styles.likeTextBox}>
                        <Text style={styles.likeID}>USER_ID</Text>
                        <Text style={styles.likeName}>user_name</Text>
                    </View>
                </View>

                <View style={styles.likeItem}>
                    <Text style={styles.likeImage}> </Text>
                    <View style={styles.likeTextBox}>
                        <Text style={styles.likeID}>USER_ID</Text>
                        <Text style={styles.likeName}>user_name</Text>
                    </View>
                </View>


                <View style={styles.likeItem}>
                    <Text style={styles.likeImage}> </Text>
                    <View style={styles.likeTextBox}>
                        <Text style={styles.likeID}>USER_ID</Text>
                        <Text style={styles.likeName}>user_name</Text>
                    </View>
                </View>

                

                
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
        marginBottom: 40,
        
    },
    titleText: {
        fontSize: 18,
        marginLeft: 85,
        color: "#000000"
    },
    likeContainer: {
        height: "100%",
    },
    likeItem: {
        flexDirection: "row",
        marginBottom: 5,
        alignItems: "center",
        padding: 10,
        
    },
    likeImage: {
      width: 72,
      height: 72,
      backgroundColor: "#D9D9D9",
      borderRadius: 50
    },
    likeTextBox: {
        marginLeft: 20
    },
    likeID: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 2
    },
    likeName: {
        color: "#000000",
        fontSize: 16,
        marginBottom: 3,
    },
    
})

export default LikeListPage;