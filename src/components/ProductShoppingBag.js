import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';


export default function ProductShoppingBag({
  index,
  item,
  productList,
  setProductList,
}) {
  const [count, setCount] = useState(item?.items[0]?.units);


  useEffect(() => {

    productList.map((item) => {
      item.isSelected = false;
    });

  }, []);

  console.log("PL", productList);

  const increment = () => {
    let newData = [...productList];
    newData[index].items[0].units = count + 1;
    setProductList(newData);
    setCount(i => i + 1);
  };

  const decrement = () => {
    if (count > 0) {
      let newData = [...productList];
      newData[index].items[0].units = count - 1;
      setProductList(newData);
      setCount(i => i - 1);
    }
  };

  const [isSelected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  console.log("SELECTED CART ITEMS", selectedItems);

  return (
    <View>
      <View style={styles.view1}>
        <CheckBox
          value={isSelected}
          onValueChange={(value) => {
            setSelected(value);
            if (value) {
              let data = [...selectedItems, item];
              console.log("DT", data);
              setSelectedItems(data);
            }
          }}
          style={styles.checkbox}
        />
        <Text style={styles.btn}>삭제</Text>
      </View>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.text}>{item?.items[0]?.itemId?.title}</Text>
          <Text style={styles.text}>{item?.items[0]?.itemId?.description}</Text>
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
              {item?.items[0]?.units * item?.items[0]?.itemId?.price}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: item?.items[0]?.itemId?.carousel[0],
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
