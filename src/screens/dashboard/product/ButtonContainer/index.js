import React, { useState,useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { Wishlist, Cart } from '@utils/icons';
import appColors from '@theme/appColors';
import { useValues } from '@App';
import {CommonContext} from '@App'; 
import { addToCart } from '../cartsService';

export default buttonContainer = props => {
  const { t, colors, variant, quantity } = props; // productId, props olarak alınıyor
  const { viewRTLStyle } = useValues();
  const [isInWishlist, setIsInWishlist] = useState(false); // Favori durumu
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Sepete ekleme işlemi
  const { setCartItems } = useContext(CommonContext);
  const commonContext = useContext(CommonContext);
  const frontToken = commonContext.frontToken;
  const storeUrl = commonContext.storeUrl;
  
  console.log('Button Props:', props);
  // Favorilere ekleme veya çıkarma işlemi
  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
    Alert.alert(
      t('tabBar.wishList'),
      isInWishlist
        ? t('Ürün favori ürünlerden kaldırıldı')
        : t('Ürün favorilere eklendi')
    );
  };

  // Sepete ekleme işlemi
  const handleAddToCart = async () => {
    setIsAddingToCart(true);


    try {
      const response = await addToCart(variant.admin_graphql_api_id, quantity, storeUrl, frontToken);

      setCartItems(prev => [...prev, {
      variant_id: variant.admin_graphql_api_id,
      quantity,
    }]);


     Alert.alert(t('Ürün Sepete Eklendi'), t(''));
  } catch (error) {
    Alert.alert(t('Hata'), t('Ürün Sepete Eklenemedi.'));
  } finally {
    setIsAddingToCart(false);
  }
};

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: colors.card,
          borderTopColor: colors.divider,
          flexDirection: viewRTLStyle,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handleWishlistToggle}
        style={[styles.rowContainer, { flexDirection: viewRTLStyle }]}
      >
        <Wishlist color={isInWishlist ? appColors.primary : colors.text} />
        <Text style={[styles.text, { color: colors.text }]}>
          {isInWishlist ? t('Favorilerden Çıkar') : t('Favorilere Ekle')}
        </Text>
      </TouchableOpacity>
      <View>
        <View
          style={[
            styles.verticleLine,
            { backgroundColor: colors.divider },
          ]}
        ></View>
      </View>
      <TouchableOpacity
        onPress={handleAddToCart}
        style={[styles.rowContainer, { flexDirection: viewRTLStyle }]}
        disabled={isAddingToCart} // İşlem sırasında butonu devre dışı bırak
      >
        <Cart color={appColors.primary} />
        <Text style={styles.cartText}>
          {isAddingToCart
            ? t('Sepete Ekleniyor')
            : t('checkDelivery.addToBag')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
