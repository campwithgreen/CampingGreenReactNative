import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from '../layout/Header';
import { getAllUsers, searchUser } from '../apis/admin';
import { showDefaultErrorAlert } from '../global/global';
import Loader from "../components/common/Loader";
import AdminSearchInput from '../components/AdminSearchInput';
import COLOR from '../constants/colors';
import { logout } from '../redux/actions/oauth';
import { useDispatch } from 'react-redux';

const headerContent = {
  middleItemContents: {
    type: 'text',
    content: '회원 관리',
  },
};


const NineteenthScreen = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getUsers = async () => {
    setLoading(true);
    await getAllUsers().then((res) => {
      if (res) {
        //keeping only users not admins
        let users = res?.data?.data.filter((item) => item.role === "USER");
        setUsers(users);
        setLoading(false);
      }
    }).catch((err) => {
      console.log("GET ALL USR ERR", err);
      setLoading(false);
      showDefaultErrorAlert();
    });
  };


  useEffect(() => {
    getUsers();
  }, []);


  const handleLogout = () => {
    dispatch(logout());
    ToastAndroid.showWithGravity(
      'Logged Out Successfully',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingBottom: hp('17%'),
        height: '100%',
      }}>
      <Header headerContent={headerContent} />
      {loading ? <Loader /> : <View>
        <Text style={{ borderBottomWidth: 2, borderBottomColor: '#F8F8F8' }}></Text>
        <View>
          <Button
            title='Logout'
            onPress={() => {
              handleLogout();
            }}
            color={COLOR.compGreen}
          />
        </View>
        <View>
          <AdminSearchInput setUsers={setUsers} setLoading={setLoading} />
        </View>
        <ScrollView style={{ marginTop: hp("5%") }}>
          {/* <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: 'grey',
                  paddingHorizontal: wp('5%'),
                  marginHorizontal: wp('5%'),
                  marginVertical: wp('5%'),
                  height: 40,
                }}
                onChangeText={(text) => {
                  if (text?.length >= 4) {
                    handleSearchUser(text);
                  }
                }}
              /> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: wp('5%'),
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: wp('5%'),
              }}>
              <Text style={{ fontWeight: 'bold' }}>
                최신순
              </Text>
              {/* <Text
              style={{
                paddingLeft: wp('4%'),
                fontWeight: 'bold',
                color: 'black',
              }}>
              오래된순
            </Text> */}
            </View>
            <View></View>
          </View>
          {users && users.length >= 1 ? users.map((ele, i) => (
            <Comp1 item={ele} key={i} />
          )) : <View>
            <Text style={{ textAlign: "center" }}>
              No User Found
            </Text>
          </View>}
        </ScrollView>
      </View>}
      {/* <Comp2 /> */}
    </View>
  );
};

const Comp1 = ({ flag, item }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: wp('5%'),
        borderWidth: 2,
        borderColor: flag ? '#4AAC82' : 'lightgrey',
        backgroundColor: flag ? '#4AAC82' : 'white',
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        marginTop: hp('3%'),
      }}>
      <View style={{ display: 'flex' }}>
        <Text style={[styles.text1, { color: flag ? 'white' : 'black' }]}>
          {item?.firstName}
        </Text>
        <Text></Text>
        <Text></Text>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingLeft: wp('5%'),
        }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            회원코드 :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {item?.createdAt}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            전화번호 :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            {item?.phoneNumber}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[styles.text3, { color: flag ? 'lightgrey' : '' }]}>
            구매내역 :{' '}
          </Text>
          <Text style={[styles.text2, { color: flag ? 'white' : 'black' }]}>
            별빛 캠핑장 외 {item?.totalOrders} 건
          </Text>
        </View>
      </View>
    </View>
  );
};

const Comp2 = () => {
  const [btn, setBtn] = useState({
    btn1: false,
    btn2: false,
    btn3: true,
    btn4: false,
  });
  const fun = btn => {
    if (btn == 1) {
      setBtn({ btn1: true, btn2: false, btn3: false, btn4: false });
    } else if (btn == 2) {
      setBtn({ btn1: false, btn2: true, btn3: false, btn4: false });
    } else if (btn == 3) {
      setBtn({ btn1: false, btn2: false, btn3: true, btn4: false });
    } else {
      setBtn({ btn1: false, btn2: false, btn3: false, btn4: true });
    }
  };
  return (
    <View style={styles.comp2View}>
      <TouchableOpacity>
        <Text
          style={btn.btn1 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(1)}>
          용품대여
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={btn.btn2 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(2)}>
          캠핑장 예약
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={btn.btn3 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(3)}>
          결제승인
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={btn.btn4 ? styles.btntxt2 : styles.btntxt1}
          onPress={() => fun(4)}>
          회원관리
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NineteenthScreen;

const styles = StyleSheet.create({
  text1: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  comp2View: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: wp('5%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: hp('15%'),
    paddingTop: wp('5%'),
  },
  btntxt1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btntxt2: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});
