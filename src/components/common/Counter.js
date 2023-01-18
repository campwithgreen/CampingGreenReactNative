import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import COLOR from '../../constants/colors';
import {setQuantity} from '../../redux/actions/common';
import Toast from 'react-native-toast-message';

const Counter = props => {
  const {initiaCount = 1} = props;
  const dispatch = useDispatch();
  const [count, setCount] = useState(initiaCount);
  const handleIncremnt = () => {
    dispatch(setQuantity(count + 1));
    setCount(count + 1);
  };
  const handleDecremnt = () => {
    if (count !== 1) {
      dispatch(setQuantity(count - 1));
      setCount(count - 1);
    } else {
      Toast.show({
        type: 'info',
        text1: '한 개 이상 있어야 합니다.',
        visibilityTime: 2000,
      });
    }
  };

  const {wrapper, text, content} = styles;

  return (
    <View style={wrapper}>
      <TouchableOpacity onPress={() => handleIncremnt()}>
        <View style={content}>
          <Text style={text}>+</Text>
        </View>
      </TouchableOpacity>
      <View style={content}>
        <Text style={text}>{count}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDecremnt()}>
        <View style={content}>
          <Text style={text}>-</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLOR.white,
    borderRadius: 2,
  },
  text: {
    color: COLOR.white,
  },
  content: {
    paddingHorizontal: 7,
  },
});
