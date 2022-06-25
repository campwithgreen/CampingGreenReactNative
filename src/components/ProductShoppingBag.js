import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function ProductShoppingBag({item}) {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(i => i + 1);
  };
  const decrement = () => {
    if (count > 0) {
      setCount(i => i - 1);
    }
  };
  return (
    <View>
      <View style={styles.view1}>
        <Text>check</Text>
        <Text style={styles.btn}>{item.btn}</Text>
      </View>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.text}>{item.t1}</Text>
          <Text style={styles.text}>{item.t2}</Text>
          <View style={styles.view3}>
            <View style={styles.view4}>
              <Text style={styles.text1} onPress={decrement}>
                -
              </Text>
              <Text style={styles.text2}>{count}</Text>
              <Text style={{fontWeight: 'bold'}} onPress={increment}>
                +
              </Text>
            </View>
            <Text style={styles.text3}>{item.price}</Text>
          </View>
        </View>
        <View>
          <Image source={item.img} />
        </View>
      </View>
      <View style={styles.border}></View>
      <Text style={styles.text5}>{item.t3}</Text>
      <View style={styles.border2}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderWidth: 2,
    borderColor: 'lightgrey',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.3%'),
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 2,
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
    // color: 'lightgrey',
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
    color: '#757575',
    fontSize: 16,
    marginHorizontal: wp('5%'),
  },
  border2: {
    borderBottomWidth: 10,
    borderBottomColor: 'lightgrey',
    marginVertical: hp('4%'),
  },
});
