import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '@commonComponents';
import {fontSizes, windowHeight} from '@theme/appConstant';
import styles from './styles';
import {useValues} from '@App';

export default buttonContainer = props => {
  const {
    t,
    colors,
    text,
    btnTitle,
    subText,
    subTextColor,
    bottom,
    curruncyIcon,
  } = props;
  const val = bottom == 0 ? 0 : 60;
  const {viewRTLStyle} = useValues();
  const {isLoading = false} = props;

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: colors.card,
          
          borderTopColor: colors.brandsBg,
          flexDirection: viewRTLStyle,
        },
      ]}>
      <View style={{marginHorizontal: windowHeight(25)}}>
        <View style={{flexDirection: viewRTLStyle}}>
          
          <Text style={[styles.text, {color: colors.text}]}>{text} </Text>
          <Text style={[styles.text, {color: colors.text}]}>
            {curruncyIcon}
          </Text>
        </View>
        
      </View>
      <Button
        style={styles.order}
        fontSize={fontSizes.FONT19}
        text={btnTitle}
        t={t}
        disabled={isLoading} // Buton devre dışı olsun
        onPress={props.btnClick}
        loading={isLoading}
      />
    </View>
  );
};
