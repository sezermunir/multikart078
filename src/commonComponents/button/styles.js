import { StyleSheet } from "react-native";
import {
    fontSizes,
    windowHeight,
    windowWidth,
} from "@theme/appConstant";
import appColors from "@theme/appColors";
import appFonts from "@theme/appFonts";


const onBoardingStyles = StyleSheet.create({
    button: {
        borderRadius: windowHeight(4),
        marginTop: windowHeight(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    buttonText: {
        fontFamily: appFonts.mulishBold,
        color: appColors.white
    },
});

export default onBoardingStyles;