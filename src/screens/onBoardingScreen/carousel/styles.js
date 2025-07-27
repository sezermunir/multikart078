import { StyleSheet } from "react-native";
import {
  fontSizes,
  windowHeight,
  windowWidth
} from "@theme/appConstant";
import appColors from "@theme/appColors";
import appFonts from "@theme/appFonts";

export default StyleSheet.create({
  imageContainer: {
    width: '100%',
  },
  sliderImage: {
    width: '100%',
    height: windowHeight(390),
  },
  titleMainView: {
    alignSelf: 'center',
    width: windowWidth(420),
    marginBottom: windowHeight(10)
  },
  header: {
    color: appColors.darkGray,
    fontSize: fontSizes.FONT20,
    alignSelf: 'center',
    fontFamily: appFonts.LatoBold
  },
  body: {
    color: appColors.grey,
    fontSize: fontSizes.FONT18,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: appFonts.LatoRegular
  },
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },
  view: {
    height: '78%'
  },
});
