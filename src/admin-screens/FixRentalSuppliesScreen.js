import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React from 'react';
import Header from '../layout/Header';
import { goBack } from '../navigation/utils/RootNavigation';
import { connect } from 'react-redux';

const data = [
  {
    id: '1',
    img: require('../assets/images/jorgen.jpg'),
  },
  {
    id: '2',
    img: require('../assets/images/jorgen.jpg'),
  },
];


const mapStateToProps = (st, ownProps) => {
  const storee = st;
  return {
    storee
  };
};


const headerContent = {
  leftItemContents: {
    type: 'image',
    content: require('../assets/images/arrow-left.png'),
    navigateScreen: () => goBack(),
  },
};

const FixRentalSuppliesScreen = (props) => {

  const { storee } = props;
  console.log("THE MAIN STORE", storee);


  return (
    <View>
      <Header headerContent={headerContent} />
      <ScrollView>
        {data.map((item, i) => {
          return <Comp img={item.img} id={item.id} key={i} />;
        })}
      </ScrollView>
      <View style={styles.btn}>
        <TouchableOpacity>
          <Text style={styles.btnText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Comp = ({ img, id }) => {
  return (
    <View>
      <ImageBackground
        source={img}
        style={{
          height: 300,
          width: wp('100%'),
          borderWidth: 1,
          borderColor: 'lightgrey',
        }}>
        <View style={styles.view}>
          <Text style={styles.num}>{id}</Text>
          <Text></Text>
        </View>
        <Text style={styles.cross}>+</Text>
      </ImageBackground>
      <TextInput
        placeholder="설명 추가 …"
        style={{
          paddingLeft: wp('10%'),
          backgroundColor: 'white',
          height: 35,
          color: 'grey',
        }}
      />
    </View>
  );
};

export default connect(mapStateToProps, null)(FixRentalSuppliesScreen);

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: wp('5%'),
    alignItems: 'flex-start',
  },
  num: {
    backgroundColor: 'white',
    paddingHorizontal: 7,
    paddingVertical: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
  cross: {
    color: 'white',
    transform: [{ rotate: '45deg' }],
    fontSize: 40,
    position: 'absolute',
    right: 5,
    top: -12,
  },
  btn: {
    backgroundColor: '#E5E5E5',
    position: 'absolute',
    bottom: 30,
    zIndex: 22,
    paddingVertical: hp('2%'),
    width: wp('90%'),
    marginHorizontal: wp('5%'),
  },
  btnText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
  },
});
