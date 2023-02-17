import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar} from '@rneui/themed';

import {useSelector} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CommentComponent = ({
  postCommentData,

  setDeleteCommentId,
}) => {
  const user = useSelector(st => st?.oauth?.user_data?.data);
  const [currentUser, setCurrentUser] = useState(user);

  return (
    <>
      <View style={{borderTopWidth: 1, borderColor: '#F4F7F9'}} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',

          marginHorizontal: hp(2),
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginVertical: hp(1),
        }}>
        <Avatar
          size={35}
          rounded
          source={{
            uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
          }}
        />
        <View
          style={{
            flexDirection: 'column',
            marginLeft: hp(1.5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>
              {postCommentData?.writer?.firstName.slice(0, 3)}***
            </Text>
          </View>

          <Text style={styles.commentText}>
            {postCommentData?.commentContent}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',

              flex: 1,
              alignItems: 'center',
              width: wp(75),
            }}>
            <Text style={styles.date}>
              {postCommentData?.created_at?.slice(0, 10)}
            </Text>
            {postCommentData?.writer?._id === currentUser?._id && (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={() => {
                  const commentId = {
                    commentId: postCommentData._id,
                  };
                  console.log('deleted commentId', commentId);
                  setDeleteCommentId(commentId);
                }}>
                <Text style={{color: '#A4A4A4', fontSize: 11}}>삭제하기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 8,
    fontWeight: '400',
    color: '#5C6990',
  },
  commentText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#525252',
    marginVertical: 2,
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
    color: '#5C6990',
    marginVertical: hp(1),
  },
});
