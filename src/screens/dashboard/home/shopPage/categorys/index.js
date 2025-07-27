import React from 'react';
import {View, FlatList} from 'react-native';
import styles from './styles';
import {Product} from '@commonComponents';

export default categorys = props => {
  const {categorys, t} = props;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.column}
        data={categorys}
        ItemSeparatorComponent={() => <View style={styles.seperator} />} // ItemSeparatorComponent={styles.seperator}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Product
            image={item.image?.src || ''} // Shopify ürün resmi
            title={item.title}
            discountPrice={item.variants[0]?.price || ''} // İlk varyantın fiyatı
            price={item.variants[0]?.compare_at_price || ''} // Karşılaştırmalı fiyat
            discount={null} // Shopify ürünlerinde özel indirim mantığı uygulanabilir
            t={props.t}
            disc
            width={"50%"}
            newProduct={false} // Shopify verilerinde yeni ürün bilgisi yok
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
};