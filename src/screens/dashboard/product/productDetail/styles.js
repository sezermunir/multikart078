import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';

export default productDetailStyles = StyleSheet.create({
  title: {
    fontFamily: appFonts.LatoBold,
    fontSize: fontSizes.FONT21,
    color: appColors.black,
  },
  description: {
    fontSize: fontSizes.FONT19,
    color: appColors.gray,
    fontFamily: appFonts.LatoMidum,
    lineHeight: windowHeight(18),
  },
  seperator: {
    padding: windowHeight(5),
  },
  name: {
    fontSize: fontSizes.FONT24,
    color: appColors.black,
    fontFamily: appFonts.LatoBold,
    marginVertical: windowHeight(6),
  },
  arabaslik: {
    fontSize: fontSizes.FONT24,
    color: '#ff6900',
    fontFamily: appFonts.LatoBold,
    marginVertical: windowHeight(6),
    fontWeight: 'bold',
  },
  arametin: {
    fontSize: fontSizes.FONT19,
    color: '#000',
    fontFamily: appFonts.LatoMidum,
    lineHeight: windowHeight(18),
  },
  slogan: {
    fontSize: fontSizes.FONT24,
    color: appColors.black,
    fontFamily: appFonts.LatoBold,
    marginVertical: windowHeight(6),
  },
});
