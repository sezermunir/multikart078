import React, { useState } from 'react';
import { SafeAreaView, View, ActivityIndicator, Alert  } from 'react-native';


import styles from './style';
import Images from '@utils/images/images';
import Input from './input';
import { useValues } from '@App';
import { useTheme } from '@react-navigation/native';
import appColors from '@theme/appColors';
import { reg } from '@utils/constant';
import { Header } from '@commonComponents/header';

export default function RegistrationScreen(props) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [loading, setLoading] = useState(false);
  const t = props.route.params.t;
  const { isDark } = useValues();
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


  // Shopify API bilgileri
  const shopifyUrl = "https://www.silifkesepeti.com/api/2023-01/graphql.json";
  const shopifyToken = "e6fb91fdbd43a92d31aa243144d17e7a";

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
    if (value !== '') {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const onSignUp = async () => {
    setLoading(true);
    setErrors({});

    if (!form.email) {
      setErrors(prev => ({ ...prev, email: t('authError.email') }));
      setLoading(false);
      return;
    } else if (!reg.test(form.email)) {
      setErrors(prev => ({ ...prev, email: t('authError.validEmail') }));
      setLoading(false);
      return;
    }

    if (!form.password) {
      setErrors(prev => ({ ...prev, password: t('authError.password') }));
      setLoading(false);
      return;
    } else if (form.password.length < 8) {
      setErrors(prev => ({ ...prev, password: t('authError.validPassword') }));
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(shopifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": shopifyToken
        },
        body: JSON.stringify({
          query: `
            mutation customerCreate($input: CustomerCreateInput!) {
              customerCreate(input: $input) {
                customer {
                  id
                  firstName
                  lastName
                  email
                }
                customerUserErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            input: {
              email: form.email,
              password: form.password,
              firstName: form.firstName || "",
              lastName: form.lastName || "",
              acceptsMarketing: true
            }
          }
        })
      });

      const jsonResponse = await response.json();
      console.log("Shopify Response:", jsonResponse);

      if (jsonResponse.errors) {
        throw new Error(jsonResponse.errors[0].message);
      }

      const errors = jsonResponse.data.customerCreate.customerUserErrors;

      if (errors.length > 0) {
        Alert.alert("Bilgi", errors[0].message);
        setLoading(false);
      } else {
        Alert.alert("Başarılı", "Kullanıcı kaydı tamamlandı. Şimdi giriş yapabilirsiniz.");
        setLoading(false);
        props.navigation.replace('LoginScreen');
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Alert.alert("Hata", error.message || "Kayıt sırasında bir hata oluştu.");
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={[styles.mainView, { backgroundColor: colors.background }]}>
 
 <Header
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
        onSignUp={onSignUp}
        errors={errors}
        setLoading={setLoading}
        form={form}
      />
      {loading && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator color={appColors.primary} />
          
        </View>

      )}
    </SafeAreaView>
  );
}
