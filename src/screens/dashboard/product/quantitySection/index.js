import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {useValues} from '@App';

export default quantitySection = props => {
  const {t, numQuantity, setNumQuantity} = props;
  
  const {viewRTLStyle, textRTLStyle, viewSelfRTLStyle} = useValues();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {color: props.colors.text, textAlign: textRTLStyle},
        ]}>
        {t('product.quantity')}:
      </Text>
      <View
        style={[
          styles.row,
          {
            backgroundColor: props.colors.styleBackground,
            flexDirection: viewRTLStyle,
            alignSelf: viewSelfRTLStyle,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.mainView, {borderColor: props.colors.text}]}
          onPress={() => {
            numQuantity > 1 && setNumQuantity(numQuantity - 1);
          }}>
          <Text style={{color: '#000', fontSize: 16 }} > - </Text>
        </TouchableOpacity>
        <Text style={[styles.text, {color: props.colors.text}]}>
          {numQuantity}
        </Text>
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.mainView, {borderColor: props.colors.text}]}
          onPress={() => {
            setNumQuantity(numQuantity + 1);
            console.log('numQuantity:', numQuantity);
          }}>
          <Text style={{color: '#000', fontSize: 16 }} > + </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
