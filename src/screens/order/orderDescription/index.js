import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Divider } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { CommonContext } from '@App';
import styles from './styles';

export default function OrderDescription({ route, navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { orderId } = route.params; // Seçilen siparişin ID'si
  const { customerToken, token, storeUrl, shopifyUrl, frontToken } = useContext(CommonContext);
  
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchCustomerId = async () => {
    try {
      console.log('Fetching customer ID from access token...');
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
      if (result.data && result.data.customer) {
        const customerId = Number(result.data.customer.id.split('/').pop());
        console.log(`Fetched Customer ID: ${customerId}`);
        return customerId;
      } else {
        console.error('Customer ID not found:', result);
        return null;
      }
    } catch (error) {
      console.error('Error fetching customer ID:', error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const customerId = await fetchCustomerId();
        if (!customerId) {
          console.error('No valid customer ID, skipping order fetch.');
          return;
        }

        const response = await fetch(`${storeUrl}/admin/api/2024-01/orders/${orderId}.json`, {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': token,
            'Content-Type': 'application/json',
          },
        });
        
        const result = await response.json();
        if (!result || !result.order) {
          console.warn('Order not found!');
          return;
        }
        
        setOrderDetails(result.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    
    if (customerToken && token && storeUrl && shopifyUrl && frontToken) {
      fetchOrderDetails();
    }
  }, [customerToken, token, storeUrl, shopifyUrl, frontToken, orderId]);

  if (!orderDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>{t('loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Header text={('Sipariş Detayı')} navigation={navigation} textStyle={[styles.textStyle, {fontSize: 20, color: '#000'}]} />
      <ScrollView style={styles.contentContainer}> 
        <Divider />
        <View style={{marginTop: 10 , marginBottom: 10, }}>
        <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24, }]}>Sipariş Numarası: {orderDetails.id}</Text>
        <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24, }]}>Sipariş Tarihi: {new Date(orderDetails.created_at).toLocaleDateString()}</Text>
        <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24, }]}>Sipariş Tutarı: {orderDetails.total_price} {orderDetails.currency}</Text>
        <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24, }]}>Takip Numarası:</Text> 
        <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24, }]}>{orderDetails.tracking_number || ('Takip Numarası Sistemde Bulunamadı')}</Text>
        </View>
        <Divider />
        <View style={{marginTop: 10 , marginBottom: 10, }}>
        <Text style={[styles.name, {color: colors.text, fontSize: 18, lineHeight: 36, fontWeight: 'bold' }]}>Ürünler:</Text>
        {orderDetails?.line_items?.length > 0 ? (
          orderDetails.line_items.map((item) => (
            <View key={item.id} style={styles.productItem}>
              <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24,}]}>{item.title}</Text>
              <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24,}]}>{item.quantity} adet x {item.price} {orderDetails.currency}</Text>
            </View>
          ))
        ) : (
          <Text>Siparişte ürün bulunamadı</Text>
        )}
        </View>
        <Divider />
        <View style={{marginTop: 10 , marginBottom: 10, }}>
        <Text style={[styles.name, {color: colors.text, fontSize: 18, lineHeight: 36, fontWeight: 'bold' }]}>Teslim Adres:</Text>
        <Text style={[styles.name, {color: colors.text, fontSize: 14, lineHeight: 24,}]}>
          {orderDetails?.shipping_address
            ? `${orderDetails.shipping_address.address1}, ${orderDetails.shipping_address.city}, ${orderDetails.shipping_address.country}`
            : t('orderDetails.noAddress')}
        </Text>
        </View>
      </ScrollView>
    </View>
  );
}
