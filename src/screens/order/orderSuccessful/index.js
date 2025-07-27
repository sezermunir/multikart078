import React, { useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { Header, Divider } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import { checkCircle } from '@utils/images/images';
import { windowHeight } from '@theme/appConstant';
import { useTheme, useRoute } from '@react-navigation/native';
import ButtonContainer from '@commonComponents/buttonContainer';
import OrderDetails from './orderDetails';
import { removeValue } from '@utils/localStorage';
import { CommonContext } from '@App';
import { getCartId } from '../../dashboard/product/cartsService'; // 🟢 Sepet ID'yi alabilmek için

export default function OrderSuccessful({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const route = useRoute();
  const { setCartItems } = useContext(CommonContext);

  useEffect(() => {
    const clearCartAfterOrder = async () => {
      try {
        setCartItems([]); // Context içindeki cartItems temizlenir
        const cartId = await getCartId(); // Local'den cart_id alınır (gerekirse log için)
        console.log('🧹 Sipariş sonrası cart temizleniyor. ID:', cartId);
        await removeValue('cart_id'); // AsyncStorage'dan silinir
        console.log('✅ cart_id başarıyla silindi');
      } catch (err) {
        console.error('❌ Sipariş sonrası sepet temizleme hatası:', err);
      }
    };
    clearCartAfterOrder();
  }, []);

  return (
    <SafeAreaView>
      <Header text={'Siparişinizi Aldık'} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.order}>
        <View style={styles.circleView}>
          <Image source={checkCircle} style={styles.circleImage} />
        </View>
        <Text style={styles.title}>{t('orderSuccess.orderSuccessfully')}</Text>
        <Text style={[styles.subTitle, { color: colors.text }]}>
          {t('orderSuccess.paymentSuccessful')}
        </Text>

        <OrderDetails
          t={t}
          colors={colors}
          orderId={route.params?.orderId}
          selectedAddress={route.params?.selectedAddress}
          paymentMethod={route.params?.paymentMethod}
        />

        <Divider marginTop={windowHeight(16)} />
      </ScrollView>

      <ButtonContainer
        t={t}
        colors={colors}
        text={t('orderSuccess.trackOrder')}
        btnTitle={t('orderSuccess.continueShopping')}
        btnClick={() => {
          navigation.navigate('HomeStackScreen');
        }}
      />
    </SafeAreaView>
  );
}
