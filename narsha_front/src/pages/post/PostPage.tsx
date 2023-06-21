import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import ArrowLeft from '../../assets/arrow-left.svg';
import ArrowRight from '../../assets/arrow-right.svg';
import PostLoadingPage from './PostLoadingPage';
import WritePage from './WritePage';
import SelectImagePage from './SelectImagePage';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const isLoading = false

//@ts-ignore
const PostPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      { isLoading ? (<PostLoadingPage />) : (<WritePage />)
        
      }
    </View>
  );
};



export default PostPage;