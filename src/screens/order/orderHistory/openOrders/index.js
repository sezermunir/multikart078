import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useValues} from '@App';
import styles from './styles';
import appColors from '@theme/appColors';
import {CommonContext} from '@App';

export default function OpenOrders(props) {
  const {t, colors, navigation} = props;
  const {isDark, viewRTLStyle, textRTLStyle, viewSelfRTLStyle} = useValues();
  const {customerToken, token, storeUrl, shopifyUrl, frontToken} = useContext(CommonContext);
  const [openOrders, setOpenOrders] = useState([]);

  // Müşteri ID'sini alma
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
      if (result.data && result.data.customer) {
        const customerId = Number(result.data.customer.id.split('/').pop());
        return customerId;
      }
      return null;
    } catch (error) {
      console.error('Error fetching customer ID:', error);
      return null;
    }
  };

  // Siparişleri çekme
  const fetchOpenOrders = async () => {
    try {
      const customerId = await fetchCustomerId();
      if (!customerId) return;

      const response = await fetch(
        `${storeUrl}/admin/api/2024-01/orders.json?status=open`,
        {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': token,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      if (!result.orders) return;

      const customerOrders = result.orders.filter(
        order => order.customer && Number(order.customer.id) === customerId
      );

      setOpenOrders(customerOrders);
    } catch (error) {
      console.error('Error fetching open orders:', error);
    }
  };

  useEffect(() => {
    if (customerToken && token && storeUrl && shopifyUrl && frontToken) {
      fetchOpenOrders();
    }
  }, [customerToken, token, storeUrl, shopifyUrl, frontToken]);

  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <FlatList
  data={openOrders}
  style={[styles.rowContainer, { paddingLeft: 5, paddingRight: 5 }]}
  keyExtractor={item => item.id.toString()}
  showsVerticalScrollIndicator={false}
  ListEmptyComponent={
    <Text style={{
      textAlign: 'center',
      marginTop: 30,
      color: appColors.grey,
      fontSize: 16
    }}>
      Henüz siparişiniz bulunmuyor
    </Text>
  }
  renderItem={({ item }) => {
    const firstItemImage = item.line_items?.[0]?.image?.src;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('OrderDescription', { orderId: item.id })}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#ddd',
          backgroundColor: '#fff',
          borderWidth: 1,
          borderRadius: 5,
          borderBottomColor: '#ff6900',
          marginBottom: 10,
          borderBottomWidth: 3,
        }}>
          <View style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {firstItemImage ? (
              <Image
                source={{ uri: firstItemImage }}
                style={{ width: 50, height: 50, borderRadius: 5 }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('@assets/images/orderorange.png')}
                style={{ width: 40, height: 40 }}
              />
            )}
          </View>

          <View style={[styles.row, {
            justifyContent: 'space-between',
            height: 80,
            flex: 1,
            paddingLeft: 10,
            paddingTop: 10
          }]}>
            <Text style={[styles.name, {
              color: colors.text,
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'left'
            }]}>
              Sipariş No: {item.name}
              {"\n"}
              Sipariş Tarihi: {new Date(item.created_at).toLocaleDateString()}
              {"\n"}
              Sipariş Tutarı: {item.total_price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }}
/>
    </TouchableOpacity>
  );
}
