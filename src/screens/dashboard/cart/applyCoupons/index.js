import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Header } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import CouponList from './couponList';
import { windowHeight } from '@theme/appConstant';
import axios from 'axios';

export default function ApplyCoupon({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('https://app.silifkesepeti.com/json/kupon.json');
      
      if (response.data && Array.isArray(response.data)) {
        setCoupons(response.data);
      }
    } catch (error) {
      console.error('Kuponlar alınamadı:', error);
    }
  };

  return (
    <SafeAreaView>
      <Header text={'Kampanyalar'} navigation={navigation} />
      <ScrollView contentContainerStyle={{ paddingBottom: windowHeight(120) }}>
        <CouponList t={t} colors={colors} coupons={coupons} />
      </ScrollView>
    </SafeAreaView>
  );
}
