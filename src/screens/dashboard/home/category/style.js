import {StyleSheet} from 'react-native';
import {fontSizes, windowHeight, windowWidth} from '@theme/appConstant';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';

export default categoryStyles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: windowWidth(10),
    marginVertical: windowHeight(3),
    flexDirection: 'row',
    //marginTop: windowHeight(6),
  },
  categoryView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: windowWidth(10),
  },
  imageView: {
    backgroundColor: '#fff',
    width: windowWidth(80),
    height: windowHeight(58),
    borderRadius: windowWidth(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: windowWidth(2),
    overflow: 'hidden',
  },
  categoryImg: {
    width: windowWidth(70),
    height: windowHeight(50),
  },
  nameView: {
    fontSize: fontSizes.FONT16,
    fontFamily: appFonts.LatoBold,
  },
});
