    import React, { useState, useEffect } from 'react';
    import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
    import styles from './style';
    import { ProductHorizontal } from '@commonComponents';
    import { useValues } from '@App';
    import { SHOPIFY_ADMIN_API_TOKEN, SHOPIFY_STORE_URL } from '@env';
    
    export default dealOfDay = (props) => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const { viewRTLStyle } = useValues();
      const {customerToken, setCustomerToken} = useValues();
    
      // Shopify API'den ürünleri çekmek için fonksiyon
      const fetchNewArrivals = async () => {
        const apiUrl = `${SHOPIFY_STORE_URL}/admin/api/2023-01/products.json?collection_id=509079224622`;
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
            // İlk 8 ürünü alın
            const formattedProducts = data.products.slice(0, 8).map((product) => ({
              id: product.id,
              title: product.title,
              image: product.image?.src || '',
              price: product.variants?.[0]?.price || 'N/A',
            }));
            setProducts(formattedProducts);
          } else {
            setProducts([]);
          }
        } catch (error) {
          console.error('Error fetching new arrivals:', error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchNewArrivals();
      }, []);
    
      if (loading) {
        return (
          <View style={[styles.loader, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={props.colors.primary} />
          </View>
        );
      }
    
      return (
        <View>
          <View style={[styles.headerView, { flexDirection: viewRTLStyle }]}>
            <Text style={[styles.dealOfDay, { color: props.colors.text, fontWeight: 'bold', fontSize:20, }]}>
              {'Yeni Gelenler'}
              
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Shoppage', {
                  collectionId: '509079224622', // Koleksiyon ID'si
                });
              }}
            >
              <Text style={styles.seeAll}>{'tümünü gör'}</Text>
            </TouchableOpacity>
          </View>
          <ProductHorizontal
            products={products}
            t={props.t}
            colors={props.colors}
            image
            showPrice
            isWishlist
            productStyle={styles.product}
            onPress={(productId) => props.navigation.navigate('Product', { productId })}
          />
        </View>
      );
    };