import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';
import { windowHeight } from '@theme/appConstant';

export default function DebitCard({ t, colors }) {
  const [formHtml, setFormHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch('https://2be4-195-33-246-179.ngrok-free.app/api/iyzico/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            cartTotal: 99.90,
            buyerInfo: {
              first_name: 'Ahmet',
              last_name: 'Deneme',
              email: 'test@example.com',
              phone: '+905300000000',
              address1: 'Test Mah. Deneme Sk.',
              city: 'İstanbul',
              zip: '34000',
            },
            basketItems: [
              {
                name: 'Ürün 1',
                price: 99.90,
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Sunucu hatası:', errorText);
          throw new Error('iyzico endpoint hata verdi');
        }

        const result = await response.json();

        if (result.success && result.checkoutFormContent) {
          // 👉 Formu tam HTML iskeleti ile sarmalıyoruz
          const wrappedHtml = `
            <html>
              <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
              <body style="margin:0;padding:0;">
                ${result.checkoutFormContent}
              </body>
            </html>
          `;
          setFormHtml(wrappedHtml);
        } else {
          console.warn('⚠️ Form alınamadı:', result.message);
        }
      } catch (error) {
        console.error('iyzico form alma hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, []);

  return (
    <View style={styles.mainView}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : formHtml ? (
        <WebView
          originWhitelist={['*']}
          source={{ html: formHtml }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={{ height: windowHeight(500), marginTop: 10 }}
        />
      ) : (
        <Text style={{ color: colors.text }}>Ödeme formu yüklenemedi.</Text>
      )}
    </View>
  );
}
