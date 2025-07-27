import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { t } from 'i18next';
import { useTheme } from '@react-navigation/native';
import { windowHeight } from '@theme/appConstant';
import Price from '../../commonComponents/productHorizontal/withPrice';
import { Divider } from '@commonComponents';
import { useValues } from '@App';

export default function CartHorizontal(props) {
  const products = props.products;
  const { colors } = useTheme();
  const { viewRTLStyle, textRTLStyle } = useValues();

  console.log('products:', JSON.stringify(products));

  
  const handleRemove = (itemId) => {
    Alert.alert('Ürün Sepetten Silindi');
    props.onRemove(itemId);
  };

  const calculateTotal = () => {
    return products.reduce((sum, item) => {
      const price = parseFloat(item.node.merchandise.priceV2.amount);
      const quantity = item.node.quantity;
      return sum + price * quantity;
    }, 0).toFixed(2);
  };



  return (
    <View style={{ paddingBottom: props.containerStyle }}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const price = parseFloat(item.node.merchandise.priceV2.amount);
          const quantity = item.node.quantity;
          const totalPrice = (price * quantity).toFixed(2); // Toplam fiyat hesaplama

          return (
            <View style={styles.productContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  console.log(item.node.merchandise.id);
                  if (props.navigation && item.node.merchandise.id) {
                    props.navigation.navigate('Product', {
                      productId: item.node.merchandise.id,
                    });
                  } else {
                    Alert.alert('Hata', 'Ürün detayına gidilemiyor.');
                  }
                }}
                style={styles.productTouchable}
              >
                <View
                  style={[
                    styles.dealsView,
                    {
                      backgroundColor: colors.brandsbg,
                      flexDirection: viewRTLStyle,
                    },
                  ]}
                >
                  <Image
                    style={[styles.image, props.productStyle]}
                    source={{ uri: item.node.merchandise.product.images.edges[0].node.src }}
                  />
                  <View
                    style={[styles.txtView, { flexDirection: viewRTLStyle }]}
                  >
                    <View>
                      <Text
                        style={[
                          styles.title,
                          { color: props.colors.text, textAlign: textRTLStyle },
                        ]}
                      >
                        {props.t(item.node.merchandise.product.title)}
                      </Text>
                      {props.showPrice && (
                        <Price
                          colors={props.colors}
                          price={t(item.node.merchandise.priceV2.amount)}
                        />
                      )}
                      <Text
                        style={[
                          styles.quantityText,
                          { color: colors.text, textAlign: textRTLStyle },
                        ]}
                      >
                        {'Adet'}: {quantity}
                      </Text>
                      <Text
                        style={[
                          styles.totalPriceText,
                          { color: colors.text, textAlign: textRTLStyle, fontWeight: 'bold' },
                        ]}
                      >
                        {'Toplam Fiyat'}: {totalPrice} {item.node.merchandise.priceV2.currencyCode}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.deleteButtonBox, { position: 'absolute', top: 10, right: 10, backgroundColor: 'red', borderRadius: 6, padding: 5 }]}
                onPress={() => handleRemove(item.node.id)}
              >
                <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>Sil</Text>
              </TouchableOpacity>
              {props.showDivider && <Divider />}
            </View>
          );
        }}
      />
      <View style={[styles.totalContainer, { padding: 10, backgroundColor: colors.card }]}>
        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 16, textAlign: 'center' }}>
          {`Sepet Toplamı: ${calculateTotal()} ${products[0]?.node.merchandise.priceV2.currencyCode}`}
        </Text>
        
        
        
      </View>
    </View>
  );
}
