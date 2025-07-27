import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';
import { Product } from '@commonComponents';
import { useValues } from '@App';
import { SHOPIFY_ADMIN_API_TOKEN } from '@env';

export default kidsCorner = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { textRTLStyle, viewRTLStyle } = useValues();

  // Shopify API'den ürünleri çekmek için fonksiyon
  const fetchBestSellers = async () => {
    const apiUrl = `${SHOPIFY_STORE_URL}/admin/api/2023-01/products.json?collection_id=509468639534`;
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
      if (data && data.products) {
        // İlk 12 ürünü alın
        const formattedProducts = data.products.slice(0, 12).map((product) => ({
          id: product.id,
          title: product.title,
          image: product.image?.src || '',
          price: product.variants?.[0]?.price || 'N/A',
          discount: product.variants?.[0]?.compare_at_price
            ? Math.round(
                ((product.variants[0].compare_at_price - product.variants[0].price) /
                  product.variants[0].compare_at_price) *
                  100
              )
            : null,
        }));
        setProducts(formattedProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loader, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={props.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.mainView}>
      <Text
        style={[
          styles.kidsCorner,
          { color: props.colors.text, textAlign: textRTLStyle, fontWeight: 'bold', fontSize:20, marginBottom:10},
        ]}
      >
        {'En Çok Satanlar'}
      </Text>
      <FlatList
        horizontal
        
        data={products}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: viewRTLStyle }}
        ItemSeparatorComponent={() => <View style={styles.itemSeprator} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.navigation.navigate('Product', { productId: item.id })}
            style={{width:180}}
          >
            <Product
              image={item.image}
              title={item.title}
              discountPrice={item.price}
              price={item.price}
              discount={item.discount}
              t={props.t}
              disc
              navigation={props.navigation}
              productId={item.id}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
