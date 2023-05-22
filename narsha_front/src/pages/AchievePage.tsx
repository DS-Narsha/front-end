import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackSvg from "../assets/back.svg";

// 업적 스크린 페이지
// 위에 초록색 부분 => 스택에서 수정
// 피그마랑 다르게 색깔이 살짝 어두운듯

const AchievePage = () => {
    return (
        <View>
            {/* <View style={styles.topContainer}>
                <BackSvg />
                <Text style={styles.topText}>업적</Text>
            </View> */}
            <View style={styles.textContainer}>
                <Text style={styles.text}>여러분의 SNS 사용을 도와줄 업적입니다~</Text>
                <Text style={styles.text}>업적을 달성하면 칭호와 뱃지를 얻을 수 있어요!</Text>
            </View>
            <View style={styles.achieveContainer}>
                <View style={styles.achieveItem}>
                    <View style={styles.achieveTitle}>
                        <Text style={styles.achieveBadge}></Text>
                        <Text style={styles.achieveMisson}>좋아요를 눌러볼까요?</Text>
                        <View style={styles.achieveCheck}>
                            <Text style={styles.achieveCheckText}>진행 중</Text>
                        </View>
                    </View>
                    <View style={styles.achieveBody}>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveHint}>힌트: 메인 페이지에서 친구 글에 좋아요를 눌러봐요!</Text>
                    </View>
                </View>


                <View style={styles.achieveItem}>
                    <View style={styles.achieveTitle}>
                        <Text style={styles.achieveBadge}></Text>
                        <Text style={styles.achieveMisson}>좋아요를 눌러볼까요?</Text>
                        <View style={styles.achieveCheck}>
                            <Text style={styles.achieveCheckText}>진행 중</Text>
                        </View>
                    </View>
                    <View style={styles.achieveBody}>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveHint}>힌트: 메인 페이지에서 친구 글에 좋아요를 눌러봐요!</Text>
                    </View>
                </View>


                <View style={styles.achieveItem}>
                    <View style={styles.achieveTitle}>
                        <Text style={styles.achieveBadge}></Text>
                        <Text style={styles.achieveMisson}>좋아요를 눌러볼까요?</Text>
                        <View style={styles.achieveCheck}>
                            <Text style={styles.achieveCheckText}>진행 중</Text>
                        </View>
                    </View>
                    <View style={styles.achieveBody}>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveHint}>힌트: 메인 페이지에서 친구 글에 좋아요를 눌러봐요!</Text>
                    </View>
                </View>

                <View style={styles.achieveItem}>
                    <View style={styles.achieveTitle}>
                        <Text style={styles.achieveBadge}></Text>
                        <Text style={styles.achieveMisson}>좋아요를 눌러볼까요?</Text>
                        <View style={styles.achieveCheck}>
                            <Text style={styles.achieveCheckText}>진행 완료</Text>
                        </View>
                    </View>
                    <View style={styles.achieveBody}>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveDetail}>다른 친구 게시글에 좋아요를 눌러볼까요?</Text>
                        <Text style={styles.achieveHint}>힌트: 메인 페이지에서 친구 글에 좋아요를 눌러봐요!</Text>
                    </View>
                </View>


            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: '#E3F1A9',
        height: 63,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        
    },
    topText: {
        fontSize: 18,
        marginLeft: 140,
        fontWeight: "500",
        color: "#000000"
    },
    textContainer:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
        marginBottom: 25
    },
    text: {
        color: "#000000",
        fontSize: 12
    },
    achieveContainer:{
       paddingLeft: 27,
       paddingRight: 27
    },
    achieveItem: {
        backgroundColor: "#CCCBCB",
        height: 160,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        marginBottom: 20
    },
    achieveTitle:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    achieveBody: {
        marginTop: 16
    },
    achieveBadge: {
        backgroundColor: "#909090",
        width: 40,
        height: 40,
    },
    achieveMisson: {
        color: "#000000",
        fontSize: 14,
        marginLeft: 24,
        marginRight: 44,
        fontWeight: "600"
    },
    achieveCheck: {
        backgroundColor: "#ffffff",
        borderRadius: 50,
        width: 52,
        height: 52,
        justifyContent: "center",
        alignItems: "center"
    },
    achieveCheckText: {
        color: "#000000",
        paddingBottom: 5,
        fontSize: 12,
        fontWeight: "600"
    },
    achieveDetail: {
        color: "#454545",
        fontSize: 13,
    },
    achieveHint: {
        fontSize: 13,
        color: "#909090",
        marginTop: 5,
        marginBottom: 2
    }
})

export default AchievePage;
