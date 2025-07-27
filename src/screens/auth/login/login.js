import React, { useState, useContext } from 'react';
import { View, SafeAreaView, Text, Alert } from 'react-native';
import { HomeHeader } from '@commonComponents';
import styles from './style';
import Images from '@utils/images/images';
import appColors from '@theme/appColors';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Input from './input';
import {CommonContext, useValues} from '@App'; 
import { json } from 'body-parser';

export default function LoginScreen(props) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ email: '', password: '' }); // Form state
  const {customerToken, setCustomerToken} = useValues();
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Giriş başarısı durumu
  const { isDark } = useValues();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const goToSearch = () => {
    props.navigation.navigate('Search');
  };
  const goToNotification = () => {
    props.navigation.navigate('Notification');
  };
  const goToWishlist = () => {
    props.navigation.navigate('wishList');
  };
  const goToCart = () => {
    props.navigation.navigate('cart');
  };
  const goToRegistration = () => {
    props.navigation.navigate('RegistrationScreen');
  };
  const commonContext = useContext(CommonContext);
  const frontToken = commonContext.frontToken;
  const shopifyUrl = commonContext.shopifyUrl;
  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
    if (value !== '') {
      setErrors((prev) => {
        return { ...prev, [name]: null };
      });
    }
  };

  const shopifyLogin = async () => {
    setLoading(true); 
    
    

    try {
      const query = `
        mutation customerAccessTokenCreate {
          customerAccessTokenCreate(input: { email: "${form.email}", password: "${form.password}" }) {
            customerAccessToken {
              accessToken
            }
            customerUserErrors {
              message
            }
          }
        }
      `;

      const response = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': frontToken,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log('response:', JSON.stringify(
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': frontToken,
          },
          body: JSON.stringify({ query }),
        }
      ));

        

      if (data.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
        const errorMessage = data.data.customerAccessTokenCreate.customerUserErrors[0].message;
        throw new Error(errorMessage);
      }

      setLoginSuccess(true);
      setCustomerToken(data.data.customerAccessTokenCreate.customerAccessToken.accessToken);
      Alert.alert(t('Üye Girişi Başarılı'), t('Hoşgeldiniz'));
      setLoading(false);
      console.log('Login success:', data.data.customerAccessTokenCreate.customerAccessToken.accessToken);
      props.navigation.replace('Drawer', { customer: data.data.customerAccessTokenCreate.customerAccessToken });
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrors((prev) => {
        return { ...prev, general: t('authError.invalidCredentials') };
      });
      Alert.alert(t('login.failed'), error.message);
      setLoading(false);
    }
  };

  const goToHome = () => {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!form.email) {
      setErrors((prev) => {
        return { ...prev, email: t('authError.email') };
      });
    } else if (!reg.test(form.email)) {
      setErrors((prev) => {
        return { ...prev, email: t('authError.validEmail') };
      });
    }
    if (!form.password) {
      setErrors((prev) => {
        return { ...prev, password: t('authError.password') };
      });
    } else if (form.password.length < 8) {
      setErrors((prev) => {
        return { ...prev, password: t('authError.validPassword') };
      });
    } else {
      shopifyLogin();
    }
  };

  return (
    <SafeAreaView
      style={[styles.mainView, { backgroundColor: colors.background }]}
    >
      <View style={styles.padding}>
        <HomeHeader
                navigationProps={props.navigation}
                searchPress={goToSearch}
                notificationPress={goToNotification}
                wishlistPress={goToWishlist}
                cartPress={goToCart}
                navigation={props.navigation}
                
              />
        <Input
          t={t}
          colors={colors}
          onChange={onChange}
          goToHome={goToHome}
          navigation={props.navigation}
          errors={errors}
          setLoading={setLoading}
          form={form}
          
        />
        {loginSuccess && (
          <Text style={styles.successMessage}>{t('login.successMessage')}</Text>
        )}
        <Text
          onPress={goToRegistration}
          style={[
            styles.createNewText,
            styles.createNewUnderlineText,
            { color: colors.subText },
          ]}
        >
          {t('login.createNow')}
        </Text>
      </View>
      {loading && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator color={appColors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
}
