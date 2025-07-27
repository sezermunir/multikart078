import {StyleSheet} from 'react-native';
import {windowHeight, windowWidth} from '@theme/appConstant';

export default homeHeaderStyle = StyleSheet.create({
  mainView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: windowWidth(10),
   paddingVertical:windowHeight(10),
    height: windowHeight(50),
    top:windowHeight(2)
  },
  mainLogoView: {
    marginHorizontal: windowWidth(6),
    justifyContent: 'center',
    bottom:0
  },
  logoImg: {
    marginLeft: windowWidth(10),
    width: windowWidth(260),
    resizeMode: 'contain',
  },
  drawer: {
    width: '6%',
    height: windowHeight(36),
    justifyContent: 'center',
  },
  logo: {
    width: '60%',
    marginTop: windowHeight(-18),
  },
  darkLogoImg: {
    marginLeft: windowWidth(10),
    width: windowWidth(150),
    height: windowHeight(20),
    resizeMode: 'contain',
    marginTop: windowHeight(10),
  },
});
