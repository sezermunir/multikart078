import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import appColors from '@theme/appColors';
import styles from './style';
import { Arrow, Search, Camera } from '@utils/icons';

export default function Header(props) {
  const colors = props.colors;
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false); // Arama işlemi sırasında yükleme göstermek için
  const t = props.t;

  const apiUrl = `https://rxj4xi-xa.myshopify.com/api/2024-10/graphql.json`;
  const apiToken = 'e6fb91fdbd43a92d31aa243144d17e7a';

  const handleSearch = async () => {
    if (!searchText.trim()) {
      Alert.alert(t('search.error'), t('search.empty'));
      return;
    }

    setLoading(true);

    try {
      const query = `
        query {
          products(first: 10, query: "${searchText}") {
            edges {
              node {
                id
                title
                vendor
                productType
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': apiToken,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      console.log('Search Response:', data); // Shopify API yanıtını kontrol edin

      if (data.errors) {
        throw new Error(data.errors[0].message || t('search.errorFetch'));
      }

      const products = data.data.products.edges.map((item) => ({
        id: item.node.id,
        title: item.node.title,
        vendor: item.node.vendor,
        productType: item.node.productType,
        image: item.node.images.edges[0]?.node.src || '',
      }));

      // Arama sonuçlarını props üzerinden parent bileşene iletin
      props.onSearchResults(products);

      setLoading(false);
    } catch (error) {
      console.error('Search Error:', error);
      Alert.alert(t('search.error'), error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Arrow />
      </TouchableOpacity>
      <View style={[styles.camera, { backgroundColor: colors.cuponsbg }]}>
        <View style={styles.search}>
          <Search colors={appColors.search} />
          <TextInput
            placeholder={t('search.search')}
            placeholderTextColor={appColors.grey}
            value={searchText}
            onChangeText={(search) => setSearchText(search)}
            onSubmitEditing={handleSearch} // Enter tuşuna basıldığında arama işlemini tetikler
            style={[styles.input, { color: colors.text }]}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="small" color={appColors.primary} />
        ) : (
          <Camera />
        )}
      </View>
    </View>
  );
}
