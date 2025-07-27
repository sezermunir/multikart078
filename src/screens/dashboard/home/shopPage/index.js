import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Header } from '@commonComponents';

import { useTranslation } from 'react-i18next';
import { windowHeight } from '@theme/appConstant';
import { SHOPIFY_ADMIN_API_TOKEN, SHOPIFY_STORE_URL } from '@env';

export default function ProductListPage({ navigation, route }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState(''); // 🔥 Kategori adını saklamak için state

  const { categoryId } = route.params; // Alınan kategori ID

  // Ürünleri çekme fonksiyonu
  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = `${SHOPIFY_STORE_URL}/admin/api/2023-01/products.json?collection_id=${categoryId}`;
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
        
        console.log('dataaaaaa:', data);

        if (data && Array.isArray(data.products)) {
          const formattedProducts = data.products.map(product => ({
            id: product.id,
            title: product.title || 'Unnamed Product',
            price: product.variants?.[0]?.price || 'N/A',
            image: product.image?.src || '',
          }));
          setProducts(formattedProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryName = async () => {
      const apiUrl = `${SHOPIFY_STORE_URL}/admin/api/2023-01/collections/${categoryId}.json`;
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

        if (data && data.collection) {
          setCategoryName(data.collection.title); // 🔥 Kategori adını state'e kaydet
        }
      } catch (error) {
        console.error('Error fetching category name:', error);
      }
    };

    fetchProducts();
    fetchCategoryName(); // 🔥 Kategori adını çek
  }, [categoryId]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      {/* 🔥 Header içinde kategori adını göster */}
      <Header
        text={categoryName || t('paymentCard.allCollection')}
        showText
        showIcon
        notificationIcon
        showWishListIcon
        subText={`${products.length} 'ürün`}
        navigation={navigation}
      />
      <ScrollView  style={{ marginBottom: windowHeight(70) }}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 0,
            padding: 10,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                marginHorizontal: 5,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 0,
                overflow: 'hidden',
                backgroundColor: '#fff'
              }}
              onPress={() => navigation.navigate('Product', { productId: item.id })}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 160, height: 160, marginBottom: 5 }}
                resizeMode="cover"
              />
              <Text
                style={{
                  margin: 5,
                  textAlignVertical: 'center',
                  color: '#000',
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginBottom: 5,
                  color: '#000',
                  fontSize: 18,
                }}
              >
                {item.price} {t('TL')}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
