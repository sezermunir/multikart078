import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, TouchableOpacity, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CommonContext } from '@App';

export default function DebitCard() {
  const [paymentPageUrl, setPaymentPageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [shopifyOrderCreated, setShopifyOrderCreated] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { apiUrl } = useContext(CommonContext);

  const { cartItems, shippingAddress, customerId, cartTotal } = route.params || {};

  const buyerInfo = {
    first_name: shippingAddress?.first_name || 'Ad',
    last_name: shippingAddress?.last_name || 'Soyad',
    email: 'test@example.com',
    phone: shippingAddress?.phone || '+905300000000',
    address1: shippingAddress?.address1 || 'Adres',
    city: shippingAddress?.city || 'İstanbul',
    zip: shippingAddress?.zip || '34000',
  };

  useEffect(() => {
    const initIyzi = async () => {
      try {
        const basketItems = cartItems.map(item => ({
          name: item.title || 'Ürün',
          price: (Number(item.price) * (item.quantity || 1)).toFixed(2),
        }));

        const res = await fetch(`${apiUrl}/api/iyzico/init`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartTotal, buyerInfo, basketItems }),
        });

        const json = await res.json();
        if (json.paymentPageUrl) {
          setPaymentPageUrl(json.paymentPageUrl + '&iframe=true');
        } else {
          console.warn('✅ JSON geldi ama paymentPageUrl eksik:', json);
        }
      } catch (e) {
        console.error('❌ iyzico init fetch hatası:', e.message);
      } finally {
        setLoading(false);
      }
    };

    initIyzi();
  }, []);

  const createShopifyOrder = async () => {
    if (shopifyOrderCreated) return;

    try {
      const enrichedItems = cartItems.map(item => ({
        variant_id: item.variant_id,
        price: item.price,
        quantity: item.quantity || 1,
      }));

      const response = await fetch(`${apiUrl}/api/processPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          cartItems: enrichedItems,
          cartTotal,
          paymentMethod: 'iyzico',
          shippingAddress,
        }),
      });

      const json = await response.json();
      if (json.success) {
        setShopifyOrderCreated(true);
        navigation.replace('OrderSuccessful', { orderId: json.shopifyOrderId });
      } else {
        navigation.replace('OrderNotSuccessful');
      }
    } catch (error) {
      console.error('❌ Shopify sipariş hatası:', error);
      navigation.replace('OrderNotSuccessful');
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#000" />;
  if (!paymentPageUrl) return <Text style={{ padding: 20 }}>Ödeme formu yüklenemedi.</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Ödeme</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>

      <WebView
        source={{ uri: paymentPageUrl }}
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={({ url }) => {
          if (url.includes('/pages/payment-success')) createShopifyOrder();
          if (url.includes('/pages/payment-failed')) navigation.replace('OrderNotSuccessful');
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
