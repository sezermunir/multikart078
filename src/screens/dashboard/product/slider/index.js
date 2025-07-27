import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import { SHOPIFY_ADMIN_API_TOKEN } from '@env';

export const getVariantInfo = async (variantId) => {
  const cleanVariantId = variantId.replace('gid://shopify/ProductVariant/', '').split('?')[0];
  const variantApiUrl = `${SHOPIFY_STORE_URL}/admin/api/2023-01/variants/${cleanVariantId}.json`;
  console.log('variantApiUrl:', variantApiUrl);
  const apiToken = SHOPIFY_ADMIN_API_TOKEN;
  

  try {
    const response = await fetch(variantApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': apiToken,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const variantData = await response.json();
    return variantData.variant; // Variant details including product ID
  } catch (error) {
    console.error('Error fetching variant details:', error);
    return null;
  }
}
export default slider = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const {  colors } = props;
  let { productId } = props;

  function isShopifyProductId(input) {
    const gidPattern = /^gid:\/\/shopify\/[A-Za-z]+\/\d+$/; // Matches Shopify GID format
      
    if (gidPattern.test(input))  
      return false;
    return true;
  }

  useEffect(() => {

    

    const fetchProductImages = async () => {
      console.log('productId fetch:', productId);
          if(!isShopifyProductId(productId)) {
            var getData = await getVariantInfo(productId);
            console.log('getVariantInfo:', getData);
            
            productId =  getData.product_id;
            console.log('productId new:', productId);
          }

      const apiUrl = `${SHOPIFY_STORE_URL}/admin/api/2023-01/products/${productId}.json`;
      const apiToken = SHOPIFY_ADMIN_API_TOKEN;

      
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': apiToken,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.product && Array.isArray(data.product.images)) {
          const productImages = data.product.images.map((image) => image.src);
          setImages(productImages);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductImages();
  }, [productId]);

  if (loading) {
    return (
      <View style={[styles.mainView, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.brandsBg} />
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={[styles.mainView, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Resim bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainView}>
      <Swiper
        paginationStyle={styles.pagination}
        dot={<View style={[styles.dot, { backgroundColor: colors.brandsBg }]} />}
        activeDot={<View style={[styles.activeDot, { backgroundColor: colors.brandsBg }]} />}
        loop={true}
        autoplay={true}
        autoplayTimeout={5}
        showsPagination
        removeClippedSubviews={false}
        containerStyle={styles.container}
      >
        {images.map((src, index) => (
          <View key={index}>
            <Image
              source={
                src && typeof src === 'string' && src !== ''
                  ? { uri: src }
                  : require('@assets/default-image.png') // 🔥 Boş URI için varsayılan resim
              }
              style={[styles.img, { resizeMode: 'cover' }]}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};
