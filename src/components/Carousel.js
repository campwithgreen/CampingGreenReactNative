import React from 'react';
import {
  View,
  Platform,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
} from 'react-native';
import Slick from 'react-native-slick';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFPercentage} from 'react-native-responsive-fontsize';

const defaultCarouselData = [
  'https://res.cloudinary.com/dchcqwskd/image/upload/v1657473807/camping-product-items/carousel-images/jorgen_v60ny3.jpg',
  'https://res.cloudinary.com/dchcqwskd/image/upload/v1657473876/camping-product-items/carousel-images/martin_ocdslb.png',
];

const Carousel = ({
  textFlag,
  imageSize,
  paginationType,
  carouselData = defaultCarouselData,
}) => {
  let {width, height} = Dimensions.get('window');
  const {backgroundImage} = styles;

  const renderPagination = (index, total, context) => {
    return (
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: hp('30%'),
          left: paginationType === 'right' ? wp('80%') : 0,
          right: 0,
        }}>
        <View
          style={{
            borderRadius: wp('3%'),
            padding: 3,
            paddingHorizontal: 8,
            backgroundColor: paginationType === 'right' ? '#fff' : '#000',
            color: '#ffff',
          }}>
          <Text
            style={{
              color: paginationType === 'right' ? '#000' : '#fff',
              fontSize: RFPercentage(1.9),
            }}>
            {index + 1} / {total}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Slick
      height={Platform.OS == 'ios' ? height / 2.45 : height / 2.9}
      width={width}
      autoplay={true}
      autoplayTimeout={5}
      renderPagination={renderPagination}
      dot={
        <View
          style={{
            backgroundColor: '#fff',
            borderColor: '#BD1461',
            borderWidth: 2,
            width: 12,
            height: 12,
            borderRadius: 40,
            marginTop: hp('14%'),
            marginBottom: hp('2%'),
            marginLeft: 12,
            marginRight: 12,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: '#BD1461',
            width: 12,
            height: 12,
            borderRadius: 40,
            marginTop: hp('14%'),
            marginBottom: hp('2%'),
            marginLeft: 12,
            marginRight: 12,
          }}
        />
      }>
      {/* <View style={{width: '100%'}}>
        <ImageBackground
          source={require('../assets/images/jorgen.jpg')}
          style={backgroundImage}>
          <View>
            <Text
              style={{
                paddingBottom: hp('2%'),
                fontSize: RFPercentage(3.65),
                fontWeight: 'bold',
                color: "#fff",
              }}>
              나만 알고싶은{'\n'}힙한 캠핑장 지금 공개
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: RFPercentage(2.2),
                fontWeight: '300',
                color: "#fff",
              }}>
              바퀴달린집 출연 캠핑장 최대 할인가로{'\n'}떠나보면 어때요?
            </Text>
          </View>
        </ImageBackground>
      </View> */}
      {carouselData.map(it => {
        return (
          <View style={{height: hp('30%')}} key={it}>
            <ImageBackground
              resizeMethod="scale"
              resizeMode={imageSize ? 'cover' : 'contain'}
              source={{uri: it}}
              style={backgroundImage}>
              {textFlag && (
                <>
                  <View>
                    <Text
                      style={{
                        paddingBottom: hp('2%'),
                        fontSize: RFPercentage(3.65),
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      나만 알고싶은{'\n'}힙한 캠핑장 지금 공개
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: RFPercentage(2.2),
                        fontWeight: '300',
                        color: '#fff',
                      }}>
                      바퀴달린집 출연 캠핑장 최대 할인가로{'\n'}떠나보면 어때요?
                    </Text>
                  </View>
                </>
              )}
            </ImageBackground>
          </View>
        );
      })}
    </Slick>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  backgroundImage: {
    display: 'flex',
    // height: hp('48%'),
    height: 251,
    paddingLeft: wp('16%'),
    paddingTop: hp('10%'),
    resizeMethod: 'repeat',
    resizeMode: 'cover',
  },
});
