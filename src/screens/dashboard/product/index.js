import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { Header, Divider } from '@commonComponents';
import { windowHeight } from '@theme/appConstant';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import Slider from './slider';
import ProductDescription from './productDescription';
import SizeSection from './sizeSection';
import Data from '@utils/json';
import QuantitySection from './quantitySection';
import OfferSection from './offerSection';
import ProductDetail from './productDetail';
import ReViewSection from './reviewSection';
import ButtonContainer from './ButtonContainer';
import { CommonContext } from '@App';

export const getVariantInfo = async (variantId) => {
  const cleanVariantId = variantId.replace('gid://shopify/ProductVariant/', '').split('?')[0];
  const variantApiUrl = `https://rxj4xi-xa.myshopify.com/admin/api/2023-01/variants/${cleanVariantId}.json`;
  console.log('variantApiUrl:', variantApiUrl);
  const apiToken = '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';
  

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

export default function Product({ navigation, route }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numQuantity, setNumQuantity] = useState(1); // New state for quantity

  let { productId } = route.params;
  const commonContext = useContext(CommonContext);
  let slider = null;

  function isShopifyProductId(input) {
    const gidPattern = /^gid:\/\/shopify\/[A-Za-z]+\/\d+$/; // Matches Shopify GID format
      
    if (gidPattern.test(input))  
      return false;
    return true;
  }

  

  useEffect(() => {
    

    const fetchProduct = async () => {
      
      console.log('productId fetch:', productId);
      if(!isShopifyProductId(productId)) {
        var getData = await getVariantInfo(productId);
        console.log('getVariantInfo:', getData);
        
        productId =  getData.product_id;
        console.log('productId new:', productId);
      }



      const apiUrl = `https://rxj4xi-xa.myshopify.com/admin/api/2023-01/products/${productId}.json`;
      const apiToken = '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';

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
        
        
        if (data && data.product) {
          setProduct({
            id: data.product.id,
            name: data.product.title || 'Unnamed Product',
            description: data.product.body_html || '',
            variants: data.product.variants || [],
            images: data.product.images || [],
            shareUrl: `https://www.silifkesepeti.com/products/${data.product.handle}`,
          }, slider =  <Slider productId={productId} colors={colors} />);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.text }}>{t('product.notFound')}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ paddingBottom: windowHeight(50) }}>

      <Header
        text={'Ürünler'}
        showText
        textStyle={{ marginTop: windowHeight(16)}}
        showIcon
        shareIcon
        navigation={navigation}
        shareUrl={product?.shareUrl}
        style={{ backgroundColor: '#ddd' }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: windowHeight(80) }}
        style={{ backgroundColor: colors.card }}>
        <View style={{ borderTopColor: '#ddd', borderTopWidth: 1, backgroundColor: '#f2f2f2'}}>
        <Text style={{ color: '#000', fontSize: 18, textAlign: 'center', height: 70, padding:10, }}>{product.name}</Text>
        </View>
        <Slider productId={productId} colors={colors} />
        {slider}
        <ProductDescription colors={colors} t={t} description={product.description} variants={product.variants} />
        <Divider />
        {/* <SizeSection title={t('orderSuccess.size')} sizes={Data.sizes} t={t} colors={colors} /> */}
        <QuantitySection t={t} colors={colors} setNumQuantity={setNumQuantity} numQuantity={numQuantity}  />
        <Divider />
        {/* <OfferSection t={t} colors={colors} /> */}
        <Divider />
        <ProductDetail t={t} productId={product.id} colors={colors} /> 
        {/* <Divider /> */}
        {/* <ReViewSection t={t} reviews={Data.customerReview} colors={colors} /> */}
      </ScrollView>
      <ButtonContainer navigation={navigation} t={t} colors={colors} 
        quantity={numQuantity} variant={product.variants[0]} product={product} />
    </SafeAreaView>
  );
}
