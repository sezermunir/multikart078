import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { windowHeight, windowWidth } from '@theme/appConstant';
import appColors from '@theme/appColors';
import { useValues } from '@App';

export default function addressDetails(props) {
  const { viewRTLStyle, textRTLStyle } = useValues();
  const address = props.address || []; // 🔥 Adres değerini kontrol ediyoruz
  const { colors } = props;
  const [selectedAddress, setSelectedAddress] = useState('');
  const t = props.t;

  if (!address.length) {
    return (
      <View style={styles.mainView}>
        <Text style={{ color: colors.text }}>No address found.</Text>
      </View>
    );
  }

  const onSelect = (val) => {
    setSelectedAddress(val);
  };

  return (
    <View style={styles.mainView}>
      <FlatList
  data={addresses}
  keyExtractor={(item, index) => index.toString()} // 🔥 index kullanımı
  showsVerticalScrollIndicator={false}
  ItemSeparatorComponent={() => <View style={styles.seperator} />}
  renderItem={({ item }) => (
    <View
      style={[
        styles.rowContainer,
        {
          borderColor: item.id === selectedAddress ? appColors.primary : '',
          borderWidth: item.id === selectedAddress ? 1 : 0,
          backgroundColor:
            item.id === selectedAddress
              ? appColors.bgHighlight
              : colors.cuponsbg,
          flexDirection: viewRTLStyle,
        },
      ]}
    >
      <View>
        <View style={[styles.row, { flexDirection: viewRTLStyle }]}>
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            style={[
              styles.radioButton,
              { backgroundColor: colors.styleBackground },
            ]}
          >
            {item.id === selectedAddress && (
              <View style={styles.radioButtonIcon}></View>
            )}
          </TouchableOpacity>
          <Text style={[styles.area, { color: colors.text, textAlign: 'left' }]}>
            {`${item.address1}, ${item.city}, ${item.province}, ${item.country}`}
          </Text>
        </View>
        <View style={styles.addressView}>
          <Text style={[styles.address, { color: colors.subText, textAlign: textRTLStyle }]}>
            {`${item.first_name} ${item.last_name}`}
          </Text>
          <View style={{ flexDirection: viewRTLStyle }}>
            <Text style={[styles.phone, { color: colors.text }]}>
              {t('ShippingDetails.phoneNo')}
            </Text>
            <Text>: {item.phone || 'N/A'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.serViceView}>
        <Text style={styles.service}>{t('ShippingDetails.deliveryService')}</Text>
      </View>
    </View>
  )}
/>

    </View>
  );
}
