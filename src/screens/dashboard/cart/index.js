import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, Alert, View, Text } from 'react-native';
import { Header } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import styles from './style';
import CartHorizontal from '../../../otherComponent/cartHorizontal';
import EmptyCart from './emptyCart';
import { getCartId, createCart } from '../product/cartsService';
import { CommonContext } from '@App';
import { useValues } from '@App';


const REMOVE_FROM_CART_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    images(first: 1) {
                      edges {
                        node {
                          src
                        }
                      }
                    }
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function cart({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState('');
  const [cleanedCartId, setCleanedCartId] = useState('');
  const commonContext = useContext(CommonContext);
  const frontToken = commonContext.frontToken;
  const storeUrl = commonContext.storeUrl;
  const { cartItems } = commonContext;

  useEffect(() => {
  let isMounted = true; // bileşen hala aktif mi?

  const fetchData = async () => {
    const id = await getCartId();
    if (!isMounted) return;

    setCartId(id);
    const cleanedId = id.replace('gid://shopify/Cart/', '').split('?')[0];
    setCleanedCartId(cleanedId);
    await fetchCart(id);
  };

  fetchData();

  return () => {
    isMounted = false; // cleanup fonksiyonu: unmount sırasında false yapılır
  };
}, [cartItems]);


  const fetchCart = async (cartId) => {
    try {
      const GET_CART_QUERY = `
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                      product {
                        title
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
              }
            }
          }
        }
      `;

      const response = await fetch(`${storeUrl}/api/2023-01/graphql.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': frontToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_CART_QUERY, variables: { cartId } }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCartData(data.data.cart.lines.edges);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`${storeUrl}/api/2023-01/graphql.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Storefront-Access-Token': frontToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: REMOVE_FROM_CART_MUTATION,
          variables: { cartId: cartId, lineIds: [itemId] },
        }),
      });
  
      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));
  
      if (!response.ok || data.errors) {
        throw new Error(data.errors ? data.errors[0]?.message : 'Error removing item from cart');
      }
  
      const updatedCart = data.data?.cartLinesRemove?.cart?.lines?.edges || [];
      setCartData(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateCartTotal = () => {
    return cartData.reduce((sum, { node }) => {
      const quantity = node.quantity;
      const price = parseFloat(node.merchandise.priceV2.amount);
      return sum + quantity * price;
    }, 0);
  };

  const handleCheckout = () => {
  const total = calculateCartTotal();

  const cartItems = cartData.map(({ node }) => ({
    title: node.merchandise.product.title || node.merchandise.title || 'Ürün',
    quantity: node.quantity,
    price: node.merchandise.priceV2.amount,
    variant_id: node.merchandise.id.split('/').pop(), // 🟢 VARIANT ID'Yİ EKLİYORUZ
  }));

  navigation.navigate('Payment', {
    cartTotal: total,
    cartItems: cartItems,
  });
};



  return (
    <SafeAreaView>
      <Header text={t('cart.shoppingCart')} showWishListIcon showText navigation={navigation} />
      {cartData.length === 0 ? (
        <EmptyCart t={t} navigation={navigation} />
      ) : (
        <ScrollView contentContainerStyle={styles.details}>
          <CartHorizontal
            products={cartData}
            t={t}
            colors={colors}
            showPrice
            showDivider
            navigation={navigation}
            onRemove={handleRemoveItem}
          />
          <View style={[styles.totalContainer, { padding: 10, backgroundColor: colors.card }]}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: 'blue',
                borderRadius: 8,
                padding: 12,
                alignItems: 'center',
              }}
              onPress={handleCheckout}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Ödeme Sayfasına Geç</Text>
            </TouchableOpacity>
            <Text style={{ color: '#333', fontSize: 12, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>
              İndirim kuponları, kargo ücretleri, adres seçimleri ve ödeme sayfası bir sonraki adımda yer alır.
            </Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
