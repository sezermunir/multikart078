import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appFonts from '@theme/appFonts';
import appColors from '@theme/appColors';

export default headerStyle = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight(60),
    paddingHorizontal: windowWidth(20),
  },
  first: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    marginHorizontal: windowWidth(20),
  },
  text1: {
    fontFamily: appFonts.LatoBold,
    fontSize: fontSizes.FONT24,
  },
  text2: {
    fontFamily: appFonts.LatoMedium,
    fontSize: fontSizes.FONT18,
    color: appColors.grey,
  },
  cart: {
    flexDirection: 'row',
  },
  wishlist: {
    marginHorizontal: windowWidth(20),
  },
  share: {
    marginHorizontal: windowWidth(4),
    color: '#fff'
  },
  search: {
    paddingHorizontal: windowWidth(7),
    right: windowWidth(8),
    marginBottom: windowHeight(-2),
  },
  cartIcon: {bottom: 2},
});
