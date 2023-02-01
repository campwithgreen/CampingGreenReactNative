import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useState} from 'react';
import {showDefaultErrorAlert} from '../global/global';
import {useDispatch} from 'react-redux';
import {searchUser} from '../apis/admin';
import {RFPercentage} from 'react-native-responsive-fontsize';

const AdminSearchInput = props => {
  const {setUsers, setLoading, getUser} = props;
  const [searchText, setSearchText] = useState(null);

  const handleSearch = async () => {
    if (searchText && searchText !== '') {
      setLoading(true);
      let searchV = {
        query: searchText,
      };
      await searchUser(searchV)
        .then(res => {
          if (res) {
            let users = res?.data?.data?.filter(item => item.role === 'USER');
            setUsers(users);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log('SERCH USER ERROR', err);
          setLoading(false);
          showDefaultErrorAlert();
        });
    } else {
      getUser();
    }
  };

  return (
    <View style={styles.view1}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: hp(1),
          paddingVertical: Platform.OS === 'android' ? hp(0) : hp(1),
        }}>
        <TextInput
          placeholder="사용자 이름이나 번호로 검색해주세요."
          placeholderTextColor={'gray'}
          style={styles.searchbox}
          onChangeText={value => {
            setSearchText(value);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            handleSearch();
          }}>
          <Image source={require('../assets/images/search_icon.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminSearchInput;

const styles = StyleSheet.create({
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: wp('5%'),
    // position: 'absolute',
    zIndex: 22,
    backgroundColor: '#fff',
    width: wp(90),
    marginLeft: 'auto',
    marginRight: 'auto',
    // height: 70,
    borderRadius: 3,
    borderWidth: 1,
  },
  searchbox: {
    fontSize: RFPercentage(1.8),

    width: wp('80%'),
  },
});
