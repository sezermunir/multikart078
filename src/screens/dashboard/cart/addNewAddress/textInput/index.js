import React from 'react';
import { View } from 'react-native';
import DropDown from '@commonComponents/dropdown';
import Data from '@utils/json';
import styles from './styles';
import { Input } from '@commonComponents';
import { fontSizes, windowHeight, windowWidth } from '@theme/appConstant';

export default function TextInputComponent({ t, formData, updateForm }) {
  const country = Data.country;
  const state = Data.states;

  return (
    <View style={styles.container}>
      
      <Input
        placeholder={'İsim Soyisim'}
        onChangeText={val => updateForm('fullName', val)}
        value={formData.fullName}
        fontSize={fontSizes.FONT17}
      />
      <Input
        placeholder={'Adres - Mahalle Cad'}
        onChangeText={val => updateForm('address', val)}
        value={formData.address}
        fontSize={fontSizes.FONT17}
      />
      <Input
        placeholder={'Adres - Sokak Numara '}
        onChangeText={val => updateForm('area', val)}
        value={formData.area}
        fontSize={fontSizes.FONT17}
      />
      <Input
        placeholder={'İlçe'}
        onChangeText={val => updateForm('landMark', val)}
        value={formData.landMark}
        fontSize={fontSizes.FONT17}
      />
      <Input
        placeholder={'Şehir'}
        onChangeText={val => updateForm('city', val)}
        value={formData.city}
        fontSize={fontSizes.FONT17}
      />
      <Input
        placeholder={'Telefon Numarası'}
        onChangeText={val => updateForm('mobileNumber', val)}
        value={formData.mobileNumber}
        keyboardType="phone-pad"
        fontSize={fontSizes.FONT17}
      />
      <Input
        placeholder={'Posta Kodu'}
        onChangeText={val => updateForm('pinCode', val)}
        value={formData.pinCode}
        keyboardType="phone-pad"
        fontSize={fontSizes.FONT17}
      />
      <View style={{ height: windowHeight(20) }} />
      
    </View>
  );
}
