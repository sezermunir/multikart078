require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Iyzipay = require('iyzipay');

const app = express();
app.use(bodyParser.json());

// Shopify Ayarları
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
const SHOPIFY_ADMIN_API_TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;

// iyzico Ayarları
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_BASE_URL,
});

/**
 * 📦 Shopify Sipariş Oluşturma
 */
app.post('/api/processPayment', async (req, res) => {
  const { customerId, cartItems, cartTotal, paymentMethod, shippingAddress } = req.body;

  const validItems = cartItems.filter(item => item.variant_id && item.quantity && item.price);
  if (validItems.length === 0) {
    return res.status(400).json({ success: false, message: 'Geçerli ürün yok, variant_id kontrolü başarısız.' });
  }

  const orderPayload = {
    order: {
      source_name: 'mobile-app',
      financial_status: 'pending',
      fulfillment_status: 'unfulfilled',
      customer: customerId ? { id: parseInt(customerId) } : undefined,
      line_items: validItems.map(item => ({
        variant_id: Number(item.variant_id),
        quantity: item.quantity,
        price: item.price.toString(),
      })),
      shipping_address: {
        address1: shippingAddress.address1 || 'Adres',
        address2: shippingAddress.address2 || '',
        city: shippingAddress.city || 'İstanbul',
        province: shippingAddress.province || '',
        country: shippingAddress.country || 'TR',
        zip: shippingAddress.zip || '',
        first_name: shippingAddress.first_name || 'Ad',
        last_name: shippingAddress.last_name || 'Soyad',
        phone: shippingAddress.phone || '',
      },
      transactions: [
        {
          kind: 'sale',
          status: 'pending',
          amount: Number(cartTotal).toFixed(2),
          gateway: paymentMethod === 'cod' ? 'manual' : (paymentMethod === 'iyzico' ? 'iyzico' : 'money_order'),
        },
      ],
      tags: [paymentMethod || 'manual'],
    }
  };

  try {
    const response = await axios.post(
      `${SHOPIFY_STORE_URL}/admin/api/2025-04/orders.json`,
      orderPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_TOKEN,
        },
      }
    );

    const order = response.data.order;
    res.json({ success: true, shopifyOrderId: order.id });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Sipariş oluşturulamadı.',
      raw: error.response?.data || error.message
    });
  }
});

/**
 * 💳 iyzico Checkout Form Başlatma
 */
app.post('/api/iyzico/init', (req, res) => {
  const { cartTotal, buyerInfo = {}, basketItems = [] } = req.body;

  const basketTotal = basketItems.reduce((sum, item) => sum + Number(item.price), 0);
  const formattedCartTotal = parseFloat(Number(cartTotal).toFixed(2));
  const formattedBasketTotal = parseFloat(Number(basketTotal).toFixed(2));

  console.log('🧾 Gelen cartTotal:', formattedCartTotal);
  console.log('🧺 Hesaplanan basketTotal:', formattedBasketTotal);
  console.log('📦 basketItems:', basketItems);

if (formattedBasketTotal !== formattedCartTotal) {
  return res.status(400).json({
    success: false,
    message: `Gönderilen tutar tüm kırılımların toplam tutarına eşit olmalıdır. Beklenen: ${formattedBasketTotal}, Gelen: ${formattedCartTotal}`,
  });
}
    

  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: `checkout-${Date.now()}`,
    price: Number(cartTotal).toFixed(2),
    paidPrice: Number(cartTotal).toFixed(2),
    currency: Iyzipay.CURRENCY.TRY,
    basketId: 'B67832',
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: 'https://www.silifkesepeti.com/pages/payment-success',
    successUrl: 'https://www.silifkesepeti.com/pages/payment-success',
    failureUrl: 'https://www.silifkesepeti.com/pages/payment-failed',
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: buyerInfo.id || 'BY789',
      name: buyerInfo.first_name || 'Ad',
      surname: buyerInfo.last_name || 'Soyad',
      gsmNumber: buyerInfo.phone || '+905350000000',
      email: buyerInfo.email || 'test@ornek.com',
      identityNumber: '11111111110',
      registrationAddress: buyerInfo.address1 || 'Adres',
      city: buyerInfo.city || 'Istanbul',
      country: 'Turkey',
      zipCode: buyerInfo.zip || '34000',
      ip: '85.34.78.112',
    },
    shippingAddress: {
      contactName: buyerInfo.first_name || 'Ad Soyad',
      city: buyerInfo.city || 'Istanbul',
      country: 'Turkey',
      address: buyerInfo.address1 || 'Adres',
      zipCode: buyerInfo.zip || '34000',
    },
    billingAddress: {
      contactName: buyerInfo.first_name || 'Ad Soyad',
      city: buyerInfo.city || 'Istanbul',
      country: 'Turkey',
      address: buyerInfo.address1 || 'Adres',
      zipCode: buyerInfo.zip || '34000',
    },
    basketItems: basketItems.map((item, index) => ({
      id: `BI${index + 1}`,
      name: item.name || 'Ürün',
      price: Number(item.price).toFixed(2),
      category1: 'Kategori',
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
    })),
  };

  iyzipay.checkoutFormInitialize.create(request, (err, result) => {
    if (err) return res.status(500).json({ success: false });
    if (result.status === 'success') {
      return res.json({
        success: true,
        token: result.token,
        paymentPageUrl: result.paymentPageUrl,
        checkoutFormContent: result.checkoutFormContent,
      });
    }
    res.status(400).json({ success: false, message: result.errorMessage });
  });
});

app.post('/api/iyzico/callback', (req, res) => {
  console.log('🔁 iyzico ödeme callback:', req.body);
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log('🚀 Server çalışıyor: http://localhost:5000');
});
