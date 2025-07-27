import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import styles from './style';
import Images from '@utils/images/images';

export default emptyCart = props => {
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <View style={{backgroundColor: colors.card, marginLeft: 20, marginRight: 0 }}>
      <Image source={Images.emptyCart} style={{width: '100%'}} />
      <View style={styles.blankView}></View>
      <Text style={[styles.cartEmpty, {color: colors.text}]}>
       
      </Text>
      <Text style={[styles.addCart, {color: colors.subText}]}>
        Sepetiniz boş, alışverişe başlayın
      </Text>
      <TouchableOpacity activeOpacity={1} style={styles.btnView}>
        <Text style={styles.btn}>Alışverişe Başla</Text>
      </TouchableOpacity>
    </View>
  );
};
