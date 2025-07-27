import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { GlobalStyle } from '@style';
import styles from './styles';
import { windowHeight } from '@theme/appConstant';
import { useValues } from '@App';
import { WebView } from 'react-native-webview'; // 📌 Youtube gösterimi için WebView

export default productDetail = (props) => {
  const { t, productId, colors } = props;
  const { viewRTLStyle, textRTLStyle } = useValues();

  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;

      const apiUrl = `https://rxj4xi-xa.myshopify.com/admin/api/2023-01/products/${productId}.json`;
      const metafieldsUrl = `https://rxj4xi-xa.myshopify.com/admin/api/2023-01/products/${productId}/metafields.json`;
      const apiToken = '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';

      try {
        const [productRes, metafieldsRes] = await Promise.all([
          fetch(apiUrl, {
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': apiToken,
            },
          }),
          fetch(metafieldsUrl, {
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': apiToken,
            },
          }),
        ]);

        const productData = await productRes.json();
        const metafieldsData = await metafieldsRes.json();

        const videoMetafield = metafieldsData.metafields.find(
          (meta) => meta.namespace === 'custom' && meta.key === 'urun_video'
        );

        if (productData.product) {
          setProductDetails({
            name: productData.product.title || 'Unnamed Product',
            description: productData.product.body_html || 'No description available',
            attributes: productData.product.options || [],
            videoId: videoMetafield?.value || null,
          });
        } else {
          setProductDetails(null);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const renderCustomDescription = (html) => {
    if (!html) return null;
    const cleanedHtml = html.replace(/<\/?(a|strong|b|em)[^>]*>/gi, '');
    const regex = /<p class="(arabaslik|arametin)">(.*?)<\/p>/g;
    const result = [];
    let match;

    while ((match = regex.exec(cleanedHtml)) !== null) {
      const className = match[1];
      const content = match[2];
      result.push({ type: className, content });
    }

    const ulRegex = /<ul>(.*?)<\/ul>/gs;
  let ulMatch;
  while ((ulMatch = ulRegex.exec(cleanedHtml)) !== null) {
    const ulContent = ulMatch[1];
    const liRegex = /<li>(.*?)<\/li>/g;
    const liItems = [];
    let liMatch;

    while ((liMatch = liRegex.exec(ulContent)) !== null) {
      liItems.push(liMatch[1]);
    }

    if (liItems.length > 0) {
      result.push({ type: 'list', items: liItems });
    }
  }

    return result.map((block, index) => (
      <Text
        key={index}
        style={[
          block.type === 'arabaslik' ? styles.arabaslik : styles.arametin,
          { textAlign: textRTLStyle, marginBottom: windowHeight(1) },
        ]}
      >
        {block.content}
      </Text>
    ));
  };

  if (loading) {
    return (
      <View style={[GlobalStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!productDetails) {
    return (
      <View style={[GlobalStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>{t('productDetail.noDetails')}</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyle.container}>
      {/* 📺 Youtube videosu */}
      {productDetails.videoId && (
        <View style={{ height: 200, marginVertical: windowHeight(2) }}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${productDetails.videoId}` }}
            style={{ borderRadius: 10 }}
          />
        </View>
      )}

      {/* 📄 Açıklama */}
      <View style={{ marginVertical: windowHeight(6) }}>
        {renderCustomDescription(productDetails.description)}
      </View>
    </View>
  );
};
