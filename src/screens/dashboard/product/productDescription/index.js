import React from 'react';
import {View, Text} from 'react-native';
import StarRating from '@commonComponents/starRating';
import styles from './styles';
import {useValues} from '@App';

export default productDescription = props => {
  

  const {t,variants} = props;
  const {viewRTLStyle, textRTLStyle,currSymbol, currValue} = useValues();
  return (
    <View style={styles.container}>
      
      <View style={[styles.priceView, {flexDirection: viewRTLStyle, marginTop:35,}]}>
        <Text style={[styles.discountPrice, {color: props.colors.text, fontSize:22,}]}>
          {(parseFloat(variants[0].price)).toFixed(2)}{' TL'}
        </Text>
       
       
      </View>
      
    </View>
  );
};
