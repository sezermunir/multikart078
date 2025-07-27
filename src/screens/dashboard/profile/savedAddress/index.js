import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, ActivityIndicator, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Header, Divider } from '@commonComponents';
import BtnContainer from '../../cart/deliveryDetails/btnContainer';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import { CommonContext } from '@App';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';
import styles from './styles';

const SavedAddress = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { customerToken, token, storeUrl, shopifyUrl, frontToken } = useContext(CommonContext);
  const [selectedAddress, setSelectedAddress] = useState(null);

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
      console.log('Customer Info:', JSON.stringify(result, null, 2));

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

  const fetchCustomerAddresses = async () => {
    try {
      const customerId = await fetchCustomerId();
      if (!customerId) {
        console.error('No valid customer ID, skipping address fetch.');
        setLoading(false);
        return;
      }
  
      console.log(`Fetching addresses for customer ID: ${customerId}`);
      const response = await fetch(`${storeUrl}/admin/api/2024-01/customers/${customerId}/addresses.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': token,
        },
      });
  
      const result = await response.json();
      console.log('API Address Data:', JSON.stringify(result, null, 2)); // JSON çıktısını yazdır
  
      setAddresses(result?.addresses || []);
    } catch (error) {
      console.error('Error fetching customer addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerToken && token && storeUrl && shopifyUrl && frontToken) {
      fetchCustomerAddresses();
    }
  }, [customerToken, token, storeUrl, shopifyUrl, frontToken]);

  if (loading) {
    return (
      <ScrollView>
        <ActivityIndicator size="large" color={colors.primary} />
      </ScrollView>
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <View style={styles.mainContainer}>
          <Header
            text={('Kayıtlı Adresler')}
            navigation={navigation}
            textStyle={styles.textStyle}
          />
          <Divider />
      <ScrollView>
        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
          {'Kayıtlı adresiniz bulunmamaktadır.'}
        </Text>
      </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
          <Header
            text={('Kayıtlı Adresler')}
            navigation={navigation}
            textStyle={styles.textStyle}
          />
          <Divider />
    <SafeAreaView>
    <ScrollView>
      <Header text={t('profile.savedAddress')} navigation={navigation} />
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.rowContainer,
              {
                marginLeft: 20, 
                marginRight: 20,
                borderRadius: 5,
                borderColor: item.id === selectedAddress ? appColors.primary : '',
                borderWidth: item.id === selectedAddress ? 1 : 0,
                backgroundColor:
                  item.id === selectedAddress
                    ? appColors.bgHighlight
                    : '#f7f7f7',
              },
            ]}
          >
            <View>
              <View style={[styles.row]}>
                <TouchableOpacity
                  onPress={() => setSelectedAddress(item.id)}
                  style={[styles.radioButton, { backgroundColor: appColors.styleBackground }]}
                >
                  {item.id === selectedAddress && (
                    <View style={styles.radioButtonIcon}></View>
                  )}
                </TouchableOpacity>
                <Text style={[styles.area, { color: '#333', textAlign: 'left' }]}>
                {item.name} {item.city}, {item.province} il ilçe
                </Text>
              </View>
              <View style={styles.addressView}>
                <Text style={[styles.address, { color: '#333', textAlign: 'left' }]}>
                {item.address1}, {item.address2 ? item.address2 + ', ' : ''}{item.city}, {item.province}, {item.country}
                </Text>
                <Text style={[styles.phone, { color: '#333' }]}>Telefon: {item.phone || 'N/A'}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <BtnContainer t={t} navigation={navigation} colors={colors} />
    </ScrollView>
    </SafeAreaView>
    </View>
  );
};

export default SavedAddress;
