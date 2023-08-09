import React from "react";
import {
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import BackSvg from "../../assets/back.svg";
import CommentSendSvg from "../../assets/comment-send.svg"
import { useQuery } from "@tanstack/react-query";
import basicProfile from '../../assets/graphic/basic-profile.jpg';

type Like = {
    userId: {
      userId: string;
      userName: string;
      profileImage: string;
    };
};

//@ts-ignore
const LikeListPage = ({route}) => {
    const postId = route.params.id;

    const fetchComments = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/like/list?postId=${postId}`);
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

    const { data: likes, error, isLoading } = useQuery(["likes"], fetchComments);

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
            <Text>좋아요 목록을 불러오는 중 오류가 발생했습니다</Text>
        </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.likeContainer}>
                {likes.map((like: Like, index: number) => (
                    <View style={styles.likeItem} key={index}>

                    {like.userId.profileImage ? (
                        <Image
                        source={{ uri: like.userId.profileImage }}
                        style={styles.likeImage}
                        />
                    ) : (
                        <Image 
                            source={basicProfile}
                            style={styles.likeImage} />
                    )}
                        <View style={styles.likeTextBox}>
                            <Text style={styles.likeID}>{like.userId.userId}</Text>
                            <Text style={styles.likeName}>{like.userId.userName}</Text>
                        </View>
                    </View>
                ))}
                
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
        marginBottom: 4,
        fontFamily: 'NanumSquareB'
    },
    likeName: {
        color: "#000000",
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'NanumSquareR'
    },
    
})

export default LikeListPage;