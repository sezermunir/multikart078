import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import { Divider } from '@commonComponents';
import { Picker } from '@react-native-picker/picker';
import style from './styles';
import Wallets from './wallets';
import Data from '@utils/json';
import { useValues, CommonContext } from '@App';
import appColors from '@theme/appColors';
import appFonts from '@theme/appFonts';
import { useIsFocused } from '@react-navigation/native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function PaymentMethod(props) {
  const {
    t,
    paymentOptions,
    onPress,
    colors,
    navigation,
    onPaymentMethodChange,
    onAddressChange,
  } = props;

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const { isDark, viewRTLStyle, textRTLStyle } = useValues();
  const { customerToken, shopifyUrl, frontToken } = useContext(CommonContext);
  const isFocused = useIsFocused();

  const fetchAddresses = async () => {
    if (!customerToken) return;

    const query = `
      {
        customer(customerAccessToken: "${customerToken}") {
          addresses(first: 10) {
            edges {
              node {
                id
                address1
                address2
                city
                company
                province
                country
                zip
                firstName
                lastName
                phone
              }
            }
          }
        }
      }
    `;

    try {
      const res = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': frontToken,
        },
        body: JSON.stringify({ query }),
      });

      const json = await res.json();
      const edges = json?.data?.customer?.addresses?.edges || [];
      const formattedAddresses = edges.map(edge => {
        const node = edge.node;
        return {
          id: node.id,
          address1: node.address1,
          address2: node.address2,
          city: node.city,
          company: node.company,
          province: node.province,
          country: node.country,
          zip: node.zip,
          firstName: node.firstName,
          lastName: node.lastName,
          phone: node.phone,
        };
      });

      setAddressList(formattedAddresses);

      if (formattedAddresses.length > 0) {
        setSelectedAddressId(formattedAddresses[0].id);
        onAddressChange?.(formattedAddresses[0]); // ✅ Eksiksiz adres gönder
      }
    } catch (error) {
      console.error('🚫 Adresler alınamadı:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchAddresses();
    }
  }, [isFocused]);

  const onSelectAddress = addressId => {
    setSelectedAddressId(addressId);
    const fullAddress = addressList.find(item => item.id === addressId);
    if (onAddressChange && fullAddress) {
      onAddressChange(fullAddress); // ✅ Tüm adres bilgisi gönder
    }
  };

  const handlePaymentSelect = (index, value) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedPayment(index);
    onPress?.();
    onPaymentMethodChange?.(value);
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.container}>
        {/* Adres Seçimi */}
        <Text style={[style.title, {
          color: colors.text,
          marginTop: 20,
          textAlign: textRTLStyle,
          fontWeight: 'bold',
        }]}>
          Adres Seçin
        </Text>

        {addressList.length > 0 ? (
          <Picker
            selectedValue={selectedAddressId}
            onValueChange={onSelectAddress}
            style={{ backgroundColor: '#f2f2f2', color: '#000' }}>
            <Picker.Item label="Lütfen Adres Seçin" value={null} enabled={false} />
            {addressList.map(item => (
              <Picker.Item
                key={item.id}
                label={`${item.firstName || ''} ${item.city || ''} ${item.address1 || ''}`}
                value={item.id}
              />
            ))}
          </Picker>
        ) : (
          <Text style={{ color: colors.text, textAlign: 'center', paddingVertical: 10 }}>
            {'Kayıtlı Adres Bulunamadı'}
          </Text>
        )}

        <TouchableOpacity
          style={[style.addAddressButton, {
            backgroundColor: colors.primary,
            marginTop: 10,
            marginBottom: 10,
          }]}
          onPress={() => navigation.navigate('AddNewAddress')}>
          <Text style={[style.addAddressButtonText, {
            backgroundColor: appColors.primary,
            fontFamily: appFonts.LatoMedium,
            fontSize: 16,
            color: '#fff',
            padding: 6,
            borderRadius: 5,
            textAlign: 'center',
          }]}>
            Yeni Adres Ekle
          </Text>
        </TouchableOpacity>

        <Divider />

        {/* Ödeme Yöntemi */}
        <Text style={[style.title, {
          color: colors.text,
          textAlign: textRTLStyle,
          fontWeight: 'bold',
        }]}>
          Ödeme Yöntemi Seçin
        </Text>

        {paymentOptions?.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              activeOpacity={1}
              style={[style.mainView, { backgroundColor: colors.product }]}
              onPress={() => handlePaymentSelect(index, item.value)}>
              <View style={[style.row, { flexDirection: viewRTLStyle }]}>
                <Image source={isDark ? item.darkImg : item.image} style={style.image} />
                <Text style={[style.name, { color: colors.text }]}>{t(item.name)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePaymentSelect(index, item.value)}
                style={[style.radioButton, { backgroundColor: colors.styleBackground }]}>
                {index === selectedPayment && <View style={style.radioButtonIcon} />}
              </TouchableOpacity>
            </TouchableOpacity>

            {index === selectedPayment && item.value === 'cod' && (
              <Wallets
                t={t}
                colors={colors}
                wallets={Data.paymentwallets}
                onCodSelected={val => onPaymentMethodChange(val)}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
