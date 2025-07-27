import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import appColors from '@theme/appColors';
import styles from './style';
import { windowWidth } from '@theme/appConstant';
import { useValues } from '@App';

const calculateShippingFee = (cartTotal) => {
  return cartTotal <= 1000 ? 150 : 0;
};

const kampanyaIndirimiHesapla = (cartItems, cartTotal, couponCode) => {
  const normalizedCode = couponCode?.toLowerCase().trim();
  let discount = 0;

  if (normalizedCode === '5al4ode') {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (totalQuantity >= 5) {
      const sortedItems = [...cartItems].sort((a, b) => a.price - b.price);
      discount = sortedItems[0]?.price || 0;
    }
  }

  if (normalizedCode === '150tl') {
    if (cartTotal >= 1500) {
      discount = 150;
    }
  }

  return discount;
};

export default orderDetails = (props) => {
  const {
    t,
    colors,
    title,
    paddingHorizontal,
    navigation,
    cartTotal,
    cartItems = [],
    onFinalAmountChange, // ✅ dışarı veri gönderilecek fonksiyon
  } = props;
  const { viewRTLStyle, textRTLStyle, currSymbol, currValue } = useValues();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCode, setAppliedCode] = useState('');
  const [campaignDiscount, setCampaignDiscount] = useState(0);

  const applyCampaign = () => {
    const discount = kampanyaIndirimiHesapla(cartItems, cartTotal, couponCode);
    if (discount > 0) {
      setCampaignDiscount(discount);
      setAppliedCode(couponCode);
    } else {
      alert('❗ Bu koda ait geçerli bir kampanya bulunamadı.');
    }
  };

  const shippingFee = calculateShippingFee(cartTotal - campaignDiscount);
  const finalAmount = cartTotal - campaignDiscount + shippingFee;

  useEffect(() => {
    if (typeof onFinalAmountChange === 'function') {
      onFinalAmountChange(finalAmount);
    }
  }, [finalAmount]);

  return (
    <View style={[styles.mainView, { paddingHorizontal: paddingHorizontal || windowWidth(14) }]}>
      {title && (
        <View style={[styles.rowContainer, { flexDirection: viewRTLStyle }]}>
          <Text style={[styles.orderDetails, { color: colors.text, textAlign: textRTLStyle }]}>
            {t('orderDetails.orderDetail')}
          </Text>
          <Text style={styles.orderDetails}> :</Text>
        </View>
      )}

      <View style={{ marginBottom: 10 }}>
        <Text style={[styles.title, { color: colors.text }]}>Kampanya Kodu:</Text>
        <TextInput
          placeholder="Kod giriniz"
          placeholderTextColor={colors.placeholder || '#999'}
          value={couponCode}
          onChangeText={setCouponCode}
          style={{
            borderWidth: 1,
            borderColor: colors.line,
            borderRadius: 5,
            paddingHorizontal: 10,
            paddingVertical: 8,
            color: colors.text,
            backgroundColor: colors.product,
            marginTop: 5,
          }}
        />

        <TouchableOpacity
          onPress={applyCampaign}
          style={{
            marginTop: 8,
            backgroundColor: appColors.primary,
            borderRadius: 5,
            paddingVertical: 8,
            alignItems: 'center',
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Uygula</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.details, { flexDirection: viewRTLStyle }]}>
        <Text style={styles.title}>Sepet Toplamı:</Text>
        <Text style={styles.title}>{(cartTotal * currValue).toFixed(2)} TL</Text>
      </View>

      <View style={[styles.details, { flexDirection: viewRTLStyle }]}>
        <Text style={styles.title}>Kampanya İndirimi:</Text>
        <Text style={[styles.title, { color: appColors.savings }]}>
          {(campaignDiscount * currValue).toFixed(2)} TL
        </Text>
      </View>

      <View style={[styles.details, { flexDirection: viewRTLStyle }]}>
        <Text style={styles.title}>Kargo:</Text>
        <Text style={styles.title}>{(shippingFee * currValue).toFixed(2)} TL</Text>
      </View>

      <View style={[styles.details, { flexDirection: viewRTLStyle }]}>
        <Text style={styles.title}>Toplam:</Text>
        <Text style={styles.title}>{(finalAmount * currValue).toFixed(2)} TL</Text>
      </View>
    </View>
  );
};
