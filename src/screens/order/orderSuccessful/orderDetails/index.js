import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import { windowHeight } from '@theme/appConstant';
import { useValues } from '@App';

export default function OrderDetails({ t, colors, orderId, selectedAddress, paymentMethod }) {
  const { textRTLStyle, isRTL } = useValues();

  const formattedAddress = selectedAddress
    ? `${selectedAddress.first_name || ''} ${selectedAddress.last_name || ''}, ${selectedAddress.address1 || ''}, ${selectedAddress.city || ''}, ${selectedAddress.province || ''}, ${selectedAddress.zip || ''}, ${selectedAddress.country || ''}`
    : t('orderSuccess.address');

  const paymentMethodLabel = {
    iyzico: 'Kredi Kartı',
    money_order: 'Havale / EFT',
    cod: 'Kapıda Ödeme',
  }[paymentMethod] || t('orderSuccess.googleUPI'); // fallback

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text style={[styles.title, { color: colors.text, textAlign: textRTLStyle }]}>
          {t('orderSuccess.orderDetails')}
        </Text>

        {/* Sipariş Numarası */}
        <Text style={[styles.subTitle, { color: colors.text, textAlign: textRTLStyle }]}>
          Sipariş No: #{orderId || '—'}
        </Text>

        {/* E-posta bilgilendirme */}
        <Text style={[styles.emailReceipt, { color: colors.subText, textAlign: textRTLStyle }]}>
          {t('orderSuccess.emailReceipt')}
        </Text>

        
        <Text style={[styles.discription, { color: colors.subText, textAlign: textRTLStyle }, isRTL ? 0 : { width: '100%', paddingVertical: 50, }]}>
          Siparişinizi en kısa sürede kargoya teslim edeceğiz. Siparişiniz ile ilgili soru ve isteklerinizi 0531 305 0227 numaralı Whatsapp hattımızdan iletebilirsimiz.
        </Text>

        
      </View>
    </View>
  );
}
