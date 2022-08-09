import { StyleSheet, Text, View, Image, ToastAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import moment from 'moment';


const mapStateToProps = (state, ownProps) => {

  const totalDays = state?.common?.totalDays;
  return {
    totalDays
  };

};

const ProductShoppingBag = (props) => {

  const {
    index,
    item,
    productList,
    setProductList,
    setCheckedCount
  } = props;

  const [count, setCount] = useState(item.units);
  const [isSelected, setSelected] = useState(false);

  console.log("INDEX", index);
  console.log("PL", productList);

  var start = moment(item.startDate);
  var end = moment(item.endDate);
  var mainTotalDays = end.diff(start, "days") - 1;

  const increment = () => {
    let newData = [...productList];
    newData[index].units = count + 1;
    setProductList(newData);
    setCount(i => i + 1);
  };

  const decrement = () => {
    if (count > 1) {
      let newData = [...productList];
      newData[index].units = count - 1;
      setProductList(newData);
      setCount(i => i - 1);
    } else {
      ToastAndroid.showWithGravity(
        "Minimum 1 unit must be for a cart item",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );

    }
  };


  const selectedFilter = (productList) => {
    setCheckedCount(productList.filter((item) => item.isSelected === true).length);
  };

  useEffect(() => {
    selectedFilter(productList);
  }, [productList]);

  return (
    <View>
      <View style={styles.view1}>
        <CheckBox
          value={item.isSelected || isSelected}
          onValueChange={(value) => {
            setSelected(value);
            let newData = [...productList];
            newData[index].isSelected = value;
            setProductList(newData);
          }}
          style={styles.checkbox}
        />
        <Text style={styles.btn}>삭제</Text>
      </View>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.text}>{item?.itemId?.title}</Text>
          <Text style={styles.text}>{item?.itemId?.description}</Text>
          <View style={styles.view3}>
            <View style={styles.view4}>
              <Text style={styles.text1} onPress={decrement}>
                -
              </Text>
              <Text style={styles.text2}>{count}</Text>
              <Text
                style={{ fontWeight: 'bold', color: '#454C53' }}
                onPress={increment}>
                +
              </Text>
            </View>
            <Text style={styles.text3}>
              {mainTotalDays ? mainTotalDays * (item?.units * item?.itemId?.price) :
                item?.units * item?.itemId?.price}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: item?.itemId?.carousel[0],
            }}
            style={{
              height: hp('15%'),
              width: hp('15%'),
            }}
          />
        </View>
      </View>
      <View style={styles.border}></View>
      <Text style={styles.text5}>{item.t3}</Text>
      <View style={styles.border2}></View>
    </View>
  );
};

export default connect(mapStateToProps, null)(ProductShoppingBag);

const styles = StyleSheet.create({
  btn: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.3%'),
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 2,
    color: '#454C53',
  },
  view1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'),
    marginVertical: hp('0.7%'),
  },
  view2: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  view3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F8F9',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    marginTop: hp('4%'),
  },
  view4: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: wp('18%'),
    paddingHorizontal: wp('2%'),
    // paddingVertical: hp('0%'),
    borderWidth: 1.4,
    borderColor: 'lightgrey',
  },
  text: {
    fontWeight: 'bold',
    // fontSize: 18,
    color: 'black',
  },
  text1: {
    color: '#454C53',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text2: {
    fontWeight: 'bold',
    // fontSize: 15,
    color: 'black',
  },
  text3: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  border: {
    borderBottomWidth: 1.7,
    borderBottomColor: 'lightgrey',
    marginVertical: hp('1.5%'),
    marginHorizontal: wp('5%'),
  },
  text5: {
    fontWeight: '600',
    color: '#454C53',
    fontSize: 16,
    marginHorizontal: wp('5%'),
  },
  border2: {
    borderBottomWidth: 10,
    borderBottomColor: 'lightgrey',
    marginVertical: hp('4%'),
  },
  checkbox: {
    alignSelf: "center",
  },
});
