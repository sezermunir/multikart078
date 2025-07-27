import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();
const CART_ID_KEY = 'shopifyCartId';

export const getCartId = async () => {
  try {
    const cartId = storage.getString(CART_ID_KEY);
    return cartId || null;
  } catch (e) {
    console.error('getCartId error:', e);
    return null;
  }
};

export const removeCartId = async () => {
  try {
    storage.delete(CART_ID_KEY);
    console.log('🗑️ cart_id silindi');
  } catch (e) {
    console.error('removeCartId error:', e);
  }
};

export const setCartId = async (cartId) => {
  try {
    storage.set(CART_ID_KEY, cartId);
  } catch (e) {
    console.error('setCartId error:', e);
  }
};

export const createCart = async (storeUrl, frontToken) => {
  const query = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const response = await fetch(`${storeUrl}/api/2023-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': frontToken,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  console.log('Cart create response:', data);

  const cartId = data?.data?.cartCreate?.cart?.id;
  const checkoutUrl = data?.data?.cartCreate?.cart?.checkoutUrl;
  console.log('checkoutUrl:', checkoutUrl);

  if (cartId) {
    await setCartId(cartId);
  }

  return cartId;
};

export const addToCart = async (productId, quantity, storeUrl, frontToken) => {
  try {
    let cartId = await getCartId();

    if (!cartId) {
      cartId = await createCart(storeUrl, frontToken);
    }

    const mutation = `
      mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
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
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      cartId,
      lines: [
        {
          merchandiseId: productId,
          quantity,
        },
      ],
    };

    console.log('Add to cart variables:', variables);

    const response = await fetch(`${storeUrl}/api/2023-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': frontToken,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const data = await response.json();
    console.log('Add to cart response:', data?.data?.cartLinesAdd?.cart.lines.edges[0]);

    if (data?.data?.cartLinesAdd?.cart) {
      return { success: true, cart: data.data.cartLinesAdd.cart };
    } else {
      throw new Error('Failed to add product to cart.');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};
