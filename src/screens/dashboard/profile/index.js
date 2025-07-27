import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Header, Button } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import { fontSizes } from '@theme/appConstant';
import Images from '@utils/images/images';
import { useTheme } from '@react-navigation/native';
import MenuItem from '@otherComponent/drawerComponents/menuItem';
import Data from '@utils/json';
import styles from './style';
import { MultiLangauge, CommonModal, CurrencyConverter } from '@otherComponent';
import { useValues } from '@App';
import LogOut from '@otherComponent/logoutButton';

export function profile({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const { viewRTLStyle, viewSelfRTLStyle } = useValues();
  const [userName, setUserName] = useState(''); // Kullanıcı adı state
  const [userEmail, setUserEmail] = useState(''); // Kullanıcı email state
  const { shopifyUrl, frontToken, customerToken } = useValues();

  // Shopify API'den kullanıcı bilgilerini al
  const fetchUserProfile = async () => {
    if (!customerToken) {
      // Kullanıcı giriş yapmamışsa alanlar boş bırakılır
      setUserName('');
      setUserEmail('');
      return;
    }

    try {
      const query = `
        { customer(customerAccessToken: \"${customerToken}\") { id firstName lastName email } }
      `;

      const response = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': frontToken,
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data && data.data.customer) {
        setUserName(
          `${data.data.customer.firstName || ''} ${data.data.customer.lastName || ''}`.trim() || t('profile.userName')
        );
        setUserEmail(data.data.customer.email || t('profile.userEmail'));
      } else {
        setUserName(t('profile.userName'));
        setUserEmail(t('profile.userEmail'));
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserName(t('profile.userName'));
      setUserEmail(t('profile.userEmail'));
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const goToScreen = (key) => {
    const routes = [
      '#',
      'ApplyCoupon',
      'OrderHistory',
      'wishList',
      'SavedAddress',
      'Pages',
      // 'Notification',
      'Settings',
      'TermsCondition',
      'HelpCenter',
    ];

    if (routes[key]) {
      navigation.navigate(routes[key]);
    }
  };

  const visibleModal = () => {
    setShowModal(!showModal);
  };

  const visibleCurrencyModal = () => {
    setShowCurrencyModal(!showCurrencyModal);
  };

  return (
    <SafeAreaView>
      <View>
        <Header text={t('profile.profile')} navigation={navigation} />
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View
             style={{
                  flexDirection: 'row',
                  backgroundColor: '#f2f2f2',
                  
                }}>
            <Image
              // source={Images.user}
              // resizeMode="contain"
              // style={styles.profileImg}
            />
            {customerToken ? (
              <View
                style={[styles.profileDetail, { alignItems: viewSelfRTLStyle, paddingVertical: 20,
                  paddingHorizontal: 32,
                  borderRadius: 10,
                  marginHorizontal: 0,
                   }]}
              >
                <Text style={[styles.userName, { color: '#000', fontSize: 18, lineHeight: 36, fontWeight: 'bold'}]}>
                 Hoşgeldiniz, {userName} 
                </Text>
                <Text style={[styles.userEmail, { color: '#000', fontSize: 16}]}>{userEmail}</Text>
                
              </View>
            ) : (
              

            <View
             style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingVertical: 120,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginHorizontal: 0,
                  marginTop: 20
                }}>
               <View
             style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  paddingVertical: 120,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginHorizontal: 0,
                  borderColor: '#ddd',
                  border: 1,
                  marginTop: 20
                }}>
              <View style={{
                  flexDirection: 'row',
                }}>
                <View style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                overflow: 'hidden',
                marginRight: 12,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
                }}>
                <Image
                  source={Images.user}
                  style={{ width: 100, height: 100 }}
                  resizeMode="cover"
                />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>
          Uygulamamızı daha verimli kullanmak için lütfen üye girişi yapın
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{
            backgroundColor: '#007AFF',
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 6,
            marginTop: 15,
            alignSelf: 'flex-start'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Üye Girişi</Text>
        </TouchableOpacity>
      </View>
                
              </View>
              </View>
              </View>
            )}
          </View>
          
         {customerToken && Data.profileItems.map((items, key) => (
          <MenuItem
            key={key}
            icon={items.icons}
            text={items.name}
            show={key === 11 ? true : false}
            showLine={key === 13 ? false : true}
            description={items.description}
            showSwitch={items.showSwitch}
            onPress={() => goToScreen(key)}
            showBg
            t={t}
            darkModeSwitch={key === 0 ? true : false}
            rtlSwitch={key === 1 ? true : false}
          />
        ))}
        {customerToken ? (
          
          <LogOut navigation={navigation} />
           ) : (
            <View></View>
           )}

          
        </ScrollView>
        <CommonModal
          modal={
            <MultiLangauge
              onPress={visibleModal}
              navigation={navigation}
              t={t}
              from="profile"
            />
          }
          showModal={showModal}
          visibleModal={visibleModal}
        />
        <CommonModal
          modal={
            <CurrencyConverter
              onPress={visibleCurrencyModal}
              navigation={navigation}
              from="profile"
            />
          }
          showModal={showCurrencyModal}
          visibleModal={visibleCurrencyModal}
        />
      </View>
    </SafeAreaView>
  );
}
