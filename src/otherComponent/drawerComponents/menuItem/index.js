import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {fontSizes, windowWidth} from '@theme/appConstant';
import appColors from '@theme/appColors';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import {useValues} from '@App';
import {Divider} from '@commonComponents/divider';
import SwitchContainer from '@commonComponents/swithContainer';
import {setValue} from '@utils/localStorage';

export default menuItem = props => {
  const {colors} = useTheme();
  const t = props.t;
  const {isDark, setIsDark, setIsRTL, isRTL, viewRTLStyle, textRTLStyle} =
    useValues();
  const toggleDarkSwitch = () => {
    setIsDark(!isDark);
    var mode = !isDark;
    setValue('darkMode', mode.toString());
  };
  const toggleRtl = () => {
    setIsRTL(!isRTL);
    var rtl = !isRTL;
    setValue('rtl', rtl.toString());
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
      <View style={[styles.text2, {flexDirection: viewRTLStyle}]}>
        <View style={[styles.menu, {flexDirection: viewRTLStyle}]}>
          <View style={styles.drawerIcon}>
            {props.showBg && (
              <View
                style={[
                  styles.background,
                  {
                    backgroundColor: isDark
                      ? appColors.brandsBg
                      : appColors.drawerBg,
                  },
                ]}
              />
            )}
            {props.icon}
          </View>
          <View>
            <Text
              style={[
                styles.txt2,
                {color: colors.text, textAlign: textRTLStyle},
                isRTL
                  ? {marginRight: windowWidth(20)}
                  : {marginLeft: windowWidth(20)},
              ]}>
              {t(props.text)}
            </Text>
          
          </View>
        </View>
        {props.darkModeSwitch && (
          <SwitchContainer
            toggleDarkSwitch={toggleDarkSwitch}
            switchOn={isDark}
          />
        )}
        
      </View>
      <View
        style={[
          props.showLine ? styles.line : '',
          {backgroundColor: colors.divider},
        ]}
      />
      {props.show && <Divider />}
    </TouchableOpacity>
  );
};
