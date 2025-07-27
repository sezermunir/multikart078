import React, { useRef, useState, useContext, useEffect } from 'react';
import { SafeAreaView, FlatList, Alert } from 'react-native';
import { Header, Divider } from '@commonComponents';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Data from '@utils/json';
import PaymentMethod from './paymentMethod';
import { windowHeight, windowWidth } from '@theme/appConstant';
import OrderDetails from '../orderDetails';
import ButtonContainer from '@commonComponents/buttonContainer';
import appColors from '@theme/appColors';
import { useValues } from '@App';
import { CommonContext } from '@App';

export default function Payment({ navigation, route }) {
  const { cartTotal, cartItems } = route.params;
  const { colors } = useTheme();
  const { t } = useTranslation();
  const scrollViewRef = useRef();
  const { currSymbol, currValue } = useValues();
  const { storeUrl, customerToken, token, shopifyUrl, frontToken, apiUrl } = useContext(CommonContext);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [finalAmount, setFinalAmount] = useState(cartTotal);
  const [isLoading, setIsLoading] = useState(false);

  const onPaymentMethodChange = (val) => setSelectedPaymentMethod(val);

  // ✅ Adres objesini normalize ederek eksikleri önle
  const onAddressChange = (addressObj) => {
    const normalized = {
      ...addressObj,
      first_name: addressObj.first_name || addressObj.firstName || 'Ad',
      last_name: addressObj.last_name || addressObj.lastName || 'Soyad',
      phone: addressObj.phone || '+900000000000',
      address1: addressObj.address1 || 'Adres',
      address2: addressObj.address2 || '',
      city: addressObj.city || 'Şehir',
      zip: addressObj.zip || '00000',
      country: addressObj.country || 'Türkiye',
      province: addressObj.province || 'İl',
    };
    setSelectedAddress(normalized);
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
      const result = await response.json();
      const gid = result.data?.customer?.id;
      const id = gid ? parseInt(gid.split('/').pop()) : null;
      setCustomerId(id);
    } catch (err) {
      console.error('❌ Müşteri ID alma hatası:', err);
    }
  };

  const fetchCustomerAddresses = async () => {
    try {
      const query = `
        {
          customer(customerAccessToken: "${customerToken}") {
            addresses(first: 5) {
              edges {
                node {
                  id
                  company
                  address1
                  address2
                  city
                  province
                  zip
                  country
                  firstName
                  lastName
                  phone
                }
              }
            }
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
      const result = await response.json();
      const parsedAddresses = result?.data?.customer?.addresses?.edges?.map(edge => {
        const addr = edge.node;
        return {
          id: addr.id,
          company: addr.company,
          address1: addr.address1,
          address2: addr.address2,
          city: addr.city,
          province: addr.province,
          zip: addr.zip,
          country: addr.country,
          first_name: addr.firstName,
          last_name: addr.lastName,
          phone: addr.phone,
        };
      }) || [];

      setAddresses(parsedAddresses);
      if (parsedAddresses.length > 0) onAddressChange(parsedAddresses[0]);
    } catch (err) {
      console.error('📭 Adres çekme hatası:', err);
    }
  };

  useEffect(() => {
    fetchCustomerId();
    fetchCustomerAddresses();
  }, []);

  const onPayNow = async () => {
    console.log('📮 Seçilen Adres:', selectedAddress);
    try {
      setIsLoading(true);
      if (!selectedPaymentMethod) return alert('Lütfen bir ödeme yöntemi seçin.');
      if (!selectedAddress || !selectedAddress.first_name) return alert('Adres bilgisi eksik ya da hatalı.');
      if (!customerId) return alert('Müşteri bilgisi alınamadı.');

      const enrichedCartItems = cartItems
        .map(item => {
          if (item.variant_id && item.price) {
            return {
              variant_id: Number(item.variant_id),
              price: item.price.toString(),
              quantity: item.quantity || 1,
              title: item.title || 'Ürün',
            };
            
          }
          return null;
        })
        .filter(Boolean);

      if (enrichedCartItems.length === 0) return alert('Sepetinizde geçerli ürün bulunamadı.');

      if (selectedPaymentMethod === 'iyzico') {
        setIsLoading(false);
        navigation.navigate('DebitCard', {
          cartTotal,
          cartItems: enrichedCartItems,
          shippingAddress: selectedAddress,
          customerId,
        });
        return;
      }

      const orderData = {
        customerId,
        cartItems: enrichedCartItems,
        cartTotal,
        paymentMethod: selectedPaymentMethod,
        shippingAddress: selectedAddress,
      };

      const response = await fetch(`${apiUrl}/api/processPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        navigation.navigate('OrderSuccessful', { orderId: result.shopifyOrderId });
      } else {
        alert(result.message || 'Sipariş oluşturulamadı.');
      }
    } catch (error) {
      console.error('❌ Payment processing failed:', error);
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
    }
    finally {
    setIsLoading(false); // ✅ işlem bittiğinde loader kapatılır
  }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header text={'Ödeme'} showText subText={'Ödeme Seçenekleri'} navigation={navigation} />
      <FlatList
        data={[1]}
        renderItem={() => (
          <>
            <Divider />
            <OrderDetails
              cartTotal={cartTotal}
              paddingHorizontal={windowWidth(30)}
              applyCoupon
              t={t}
              colors={colors}
              navigation={navigation}
              cartItems={cartItems}
              onFinalAmountChange={(value) => setFinalAmount(value)}
            />
            <PaymentMethod
              t={t}
              colors={colors}
              paymentOptions={Data.paymentOption}
              onPress={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
              navigation={navigation}
              onPaymentMethodChange={onPaymentMethodChange}
              onAddressChange={onAddressChange}
              addressList={addresses}
              selectedAddress={selectedAddress}
            />
          </>
        )}
        keyExtractor={() => 'scroll-content'}
        contentContainerStyle={{ paddingBottom: windowHeight(180) }}
      />

      <ButtonContainer
        t={t}
        colors={colors}
        text={(finalAmount * currValue).toFixed(2)}
        curruncyIcon={'TL'}
        btnTitle={'Siparişi Tamamla'}
        subTextColor={appColors.primary}
        btnClick={onPayNow}
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
}
