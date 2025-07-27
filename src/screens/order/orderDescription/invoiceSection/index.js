import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Divider} from '@commonComponents';
import OrderDetails from '../../../dashboard/cart/orderDetails';
import {useValues} from '@App';

export default function InvoiceSection(props) {
  const {t, colors, order} = props; // order props olarak geldi
  const {viewRTLStyle, textRTLStyle, isRTL} = useValues();

  // Siparişten fatura ve kargo bilgilerini alma
  const shippingAddress = order?.shipping_address;
  const billingAddress = order?.billing_address;

  // Fiyat detayları
  const subtotal = order?.subtotal_price || '0.00';
  const shippingCost = order?.total_shipping_price_set?.presentment_money?.amount || '0.00';
  const totalAmount = order?.total_price || '0.00';
  const phone = shippingAddress?.phone || '---';

  return (
    <View style={styles.container}>
      {/* Kargo Detayları */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {borderBottomColor: colors.brandsBg, color: colors.text, textAlign: textRTLStyle},
          ]}>
          {t('ShippingDetails.ShippingDetails')}
        </Text>
        <Text style={[styles.area, {color: colors.text, textAlign: textRTLStyle}]}>
          {shippingAddress?.name || t('ShippingDetails.recipient')}
        </Text>
        <Text
          style={[
            styles.address,
            {color: colors.subText, textAlign: textRTLStyle},
            isRTL ? {width: '100%'} : {width: '48%'},
          ]}>
          {shippingAddress
            ? `${shippingAddress.address1}, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.country}`
            : t('orderSuccess.address')}
        </Text>
        <View style={[styles.row, {flexDirection: viewRTLStyle}]}>
          <Text style={[styles.phone, {color: colors.text, textAlign: textRTLStyle}]}>
            {t('ShippingDetails.phoneNo')}
          </Text>
          <Text>:</Text>
          <Text style={[styles.phone, {color: colors.text, textAlign: textRTLStyle}]}>
            {phone}
          </Text>
        </View>
      </View>

      <Divider />

      {/* Fiyat Detayları */}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {borderBottomColor: colors.brandsBg, color: colors.text, textAlign: textRTLStyle},
          ]}>
          {t('ShippingDetails.priceDetails')}
        </Text>
        
        {/* Fiyat Detayları */}
        <View style={[styles.row, {flexDirection: viewRTLStyle}]}>
          <Text style={[styles.phone, {color: colors.text}]}>{t('invoice.subtotal')}</Text>
          <Text>:</Text>
          <Text style={[styles.phone, {color: colors.text}]}>${subtotal}</Text>
        </View>

        <View style={[styles.row, {flexDirection: viewRTLStyle}]}>
          <Text style={[styles.phone, {color: colors.text}]}>{t('invoice.shipping')}</Text>
          <Text>:</Text>
          <Text style={[styles.phone, {color: colors.text}]}>${shippingCost}</Text>
        </View>

        <View style={[styles.row, {flexDirection: viewRTLStyle, marginTop: 8}]}>
          <Text style={[styles.phone, {fontWeight: 'bold', color: colors.text}]}>
            {t('invoice.total')}
          </Text>
          <Text>:</Text>
          <Text style={[styles.phone, {fontWeight: 'bold', color: colors.text}]}>
            ${totalAmount}
          </Text>
        </View>

       
      </View>
    </View>
  );
}

// Fatura İndirme İşlevi
const handleDownloadInvoice = (orderId) => {
  if (!orderId) {
    console.warn('Sipariş kimliği bulunamadı.');
    return;
  }
  console.log(`Fatura indiriliyor... Sipariş No: ${orderId}`);
  alert(`Fatura indiriliyor... Sipariş No: ${orderId}`);
};
