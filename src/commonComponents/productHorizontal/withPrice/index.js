import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {useValues} from '@App';

export default withPrice = props => {
  const {viewRTLStyle, textRTLStyle, currSymbol, currValue} = useValues();
  return (
    <View>
      <Text style={[styles.brand, {textAlign: textRTLStyle}]}>
        {props.brandName}
      </Text>
      <View style={[styles.priceView, {flexDirection: viewRTLStyle}]}>
        <Text
          style={[
            styles.discountPrice,
            {color: props.colors.text, textAlign: textRTLStyle},
          ]}>
          
          {(props.price * currValue).toFixed(2)}{'TL'}
        </Text>
        
        
      </View>
    </View>
  );
};
