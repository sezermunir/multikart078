import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Alert, Text } from 'react-native';
import { Header } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import styles from './style';
import { BottomDialogModal } from '@otherComponent';
import CartModal from '@otherComponent/cartModal';
import { windowHeight } from '@theme/appConstant';
import CartHorizontal from '@otherComponent/cartHorizontal';
import { CommonContext } from '@App';

export function wishList({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { customerToken, shopifyUrl, frontToken } = useContext(CommonContext);

  const fetchWishlist = async () => {
    if (!customerToken) {
      Alert.alert(t('Lütfen Üye Girişi Yapın'), '', [{ text: t('Üye Girişi'), onPress: () => navigation.navigate('Login') }]);
      return;
    }

    const query = `
      {
        customer(customerAccessToken: "${customerToken}") {
          metafield(namespace: "custom", key: "wishlist") {
            value
          }
        }
      }
    `;

    try {
      const response = await fetch(`${shopifyUrl}/api/2023-01/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': frontToken,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data?.data?.customer?.metafield?.value) {
        try {
          const wishlistData = JSON.parse(data.data.customer.metafield.value);
          setWishlist(wishlistData);
        } catch (error) {
          console.error('JSON Parse Error:', error.message);
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error('Favori getirme hatası:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [customerToken]);

  return (
    <SafeAreaView>
      <View style={{ height: '100%', width: '100%' }}>
        <Header text={t('wishList.yourWishlist')} navigation={navigation} showIcon />
        {wishlist.length > 0 ? (
          <CartHorizontal
            products={wishlist}
            t={t}
            colors={colors}
            showPrice
            showDivider
            productStyle={styles.products}
            containerStyle={windowHeight(50)}
            showCart
            navigation={navigation}
          />
        ) : (
          <Text style={{ textAlign: 'center', color: colors.text, marginTop: 20 }}>
            {t('Favori Listeniz boş')}
          </Text>
        )}
      </View>
      <BottomDialogModal
        modal={
          <CartModal
            onPress={showModal}
            t={t}
            setShowModal={setShowModal}
            showModal={showModal}
            title={t('wishList.addToCart')}
          />
        }
        showModal={showModal}
        visibleModal={() => setShowModal(!showModal)}
      />
    </SafeAreaView>
  );
}
