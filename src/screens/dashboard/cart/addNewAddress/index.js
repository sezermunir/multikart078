import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView, Alert } from 'react-native';
import { Header, Divider } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import TextInput from './textInput';
import AddressTypes from './addressTypes';
import { windowHeight } from '@theme/appConstant';
import ButtonContainer from '@commonComponents/buttonContainer';
import { useTheme } from '@react-navigation/native';
import { CommonContext } from '@App';

export default function AddNewAddress({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { customerToken, shopifyUrl, frontToken, token, storeUrl } = useContext(CommonContext);

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    pinCode: '',
    address: '',
    area: '',
    landMark: '',
    city: '',
    stateName: '',
    countryName: ''
  });
  const [defaultAddress, setDefaultAddress] = useState(false);

  const updateForm = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const fetchCustomerId = async () => {
    try {
      const query = `
        {
          customer(customerAccessToken: "${customerToken}") {
            id
          }
        }
      `;
      const response = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': frontToken,
        },
        body: JSON.stringify({ query }),
      });

      const json = await response.json();
      const gid = json?.data?.customer?.id;
      return gid ? gid.split('/').pop() : null;
    } catch (error) {
      console.error('❌ Müşteri ID alınamadı:', error);
      return null;
    }
  };

  const handleAddAddress = async () => {
    if (!customerToken) {
      Alert.alert(t('Lütfen giriş yapın'));
      return;
    }

    const customerId = await fetchCustomerId();
    if (!customerId) {
      Alert.alert(t('Müşteri ID bulunamadı!'));
      return;
    }

    const [firstName, ...lastParts] = formData.fullName.trim().split(' ');
    const lastName = lastParts.join(' ') || '-';
    const countryToSend = formData.countryName || 'Turkey';
    try {
    const response = await fetch(`${storeUrl}/admin/api/2024-01/customers/${customerId}/addresses.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({
        address: {
          first_name: firstName,
          last_name: lastName,
          phone: formData.mobileNumber,
          address1: formData.address,
          address2: formData.area + (formData.landMark ? ` - ${formData.landMark}` : ''),
          city: formData.city,
          province: formData.stateName,
          country: countryToSend,
          zip: formData.pinCode,
          default: defaultAddress,
        },
      }),
    });

    const result = await response.json();
    console.log('📦 Address Add Result:', JSON.stringify(result, null, 2));

    if (response.ok) {
      Alert.alert(t('Adres başarıyla eklendi'));
      navigation.goBack();
    } else {
      Alert.alert(t('Adres eklenirken hata oluştu'));
    }
  } catch (error) {
    console.error('❌ Adres eklenemedi:', error);
    Alert.alert(t('Adres eklenirken bir hata oluştu'));
  }
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header text={'Yeni Adres Ekle'} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: windowHeight(120) }}
      >
        <TextInput t={t} formData={formData} updateForm={updateForm} />
        
      </ScrollView>
      <ButtonContainer
        t={t}
        colors={colors}
        btnTitle={'Adresi Ekle'}
        btnClick={handleAddAddress}
      />
    </SafeAreaView>
  );
}
