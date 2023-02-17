import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Avatar} from '@rneui/themed';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {ActivityIndicator} from 'react-native';
import {getAllPostsReport} from '../apis/community';
import {navigateTo} from '../navigation/utils/RootNavigation';
import Header from '../layout/Header';
import {showDefaultErrorAlert} from '../global/global';
const AdminReportPostScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [reportList, setReportList] = useState([]);
  const headerContent = {
    middleItemContents: {
      type: 'text',
      content: '알림',
    },
  };
  const getAllPostReportDataRefresh = async () => {
    setLoading(true);
    await getAllPostsReport()
      .then(res => {
        if (res.data.success) {
          setReportList(res.data.data);
        }
      })
      .catch(err => {
        if (err) {
          showDefaultErrorAlert(err.response.data.error);
        }
      });
    setLoading(false);
  };
  useEffect(() => {
    (async function getAllPostReportData() {
      setLoading(true);
      await getAllPostsReport()
        .then(res => {
          if (res.data.success) {
            console.log('reported community screen', res.data);
            setReportList(res.data.data);
          }
        })
        .catch(err => {
          if (err) {
            showDefaultErrorAlert(err.response.data.error);
          }
        });
      setLoading(false);
    })();
    return () => {};
  }, []);
  useEffect(() => {
    if (route.params) {
      if (route?.params?.refreshFlag === true) {
        getAllPostReportDataRefresh();
      }
    }

    return () => {};
  }, [route.params]);
  return (
    <View
      style={{
        backgroundColor: '#fff',

        flex: 1,

        width: wp(100),
      }}>
      <Header headerContent={headerContent} />

      {loading ? (
        <ActivityIndicator
          size="small"
          color="#204EE2"
          style={{flex: 1, alignItems: 'center'}}
        />
      ) : null}

      {!loading && reportList?.length > 0 ? (
        <>
          {!loading &&
            reportList?.map(report => (
              <>
                <View
                  style={{
                    width: '100%',
                    borderColor: '#F4F7F9',
                    borderWidth: 1,
                    marginVertical: hp(1),
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigateTo('AdminReportPostDetailScreen', {data: report});
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: wp(7),
                  }}>
                  <Avatar
                    size={35}
                    rounded
                    source={{
                      uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
                    }}
                  />
                  <View>
                    <View style={{marginLeft: hp(2)}}>
                      <Text style={{color: '#878787', fontSize: 14}}>
                        {report?.postId?.content.slice(0, 20)}
                      </Text>
                      <Text
                        style={{color: '#414141', fontSize: 14, width: wp(70)}}>
                        {report?.postId?.writerName || '김그린'}의 게시물 신고가
                        접수되었습니다.
                      </Text>
                      <Text style={{color: '#414141', fontSize: 14}}>
                        "{report?.reason}"
                      </Text>
                      <Text style={{color: '#8A8D95', fontSize: 10}}>
                        {moment(report?.created_at).fromNow()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            ))}
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black', fontSize: 14}}>
            신고된 글이 없습니다.
          </Text>
        </View>
      )}
    </View>
  );
};

export default AdminReportPostScreen;

const styles = StyleSheet.create({});
