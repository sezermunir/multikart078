import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import styles from './style';
import Header from './header';
import Data from '@utils/json';

export default function SearchScreen({ navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { colors } = useTheme();

  const handleSearchResults = (products) => {
    console.log('Search Results:', products);
    setSearchResults(products);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          t={t}
          colors={colors}
          navigation={navigation}
          onSearchResults={handleSearchResults}
          setLoading={setLoading}
        />

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 15,
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
                  overflow: 'hidden',
                }}
                onPress={() => {
                  // GID formatındaki productId'den sayısal ID'yi ayıkla
                  const numericId = item.id?.split('/').pop();
                  navigation.navigate('Product', { productId: numericId });
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 160, height: 160 }}
                />
                <Text
                  style={{
                    marginHorizontal: 15,
                    marginVertical: 5,
                    color: '#000',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Aradığınız ürün bulunamadı.</Text>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
