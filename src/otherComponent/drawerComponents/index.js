 import React, { useState, useEffect } from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Images from '@utils/images/images';
import MenuItem from './menuItem';
import Data from '@utils/json';
import {useTheme} from '@react-navigation/native';
import {MultiLangauge, CommonModal, CurrencyConverter} from '../';
import styles from './styles';
import {DrawerArrow} from '@utils/icons';
import LogOut from '../logoutButton';
import { useValues } from '@App';
export default drawerComponent = props => {
  const [showModal, setShowModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [userName, setUserName] = useState(''); // Kullanıcı adı state
  const {colors} = useTheme();
  const { shopifyUrl, frontToken, customerToken } = useValues();
  const t = props.t;

  const goToScreen = key => {
    if (key === 0) {
    } else if (key === 1) {
      props.navigation.navigate('Pages');
    }
    //  else if (key === 2) {
    //   props.navigation.navigate('OrderHistoryWebView');
    // } 
    else if (key === 2) {
      props.navigation.navigate('wishList');
    } else if (key === 3) {
      props.navigation.navigate('profile');
    } else if (key === 4) {
      props.navigation.navigate('Settings');
    } else if (key == 5) {
      props.navigation.navigate('AboutUs');
    } else if (key == 6) {
      props.navigation.navigate('HelpCenter');
    }
  };

  const visibleModal = () => {
    setShowModal(!showModal);
  };
  const visibleCurrencyModal = () => {
    setShowCurrencyModal(!showCurrencyModal);
  };

  // Shopify API'den kullanıcı bilgilerini al
  const fetchUserProfile = async () => {
    console.log('fetchUserProfile giriş:', customerToken);
    
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
      console.log('fetchUserProfile:', data.data);
      if (data && data.data && data.data.customer) {
        setUserName(
          `${data.data.customer.firstName || ''} ${data.data.customer.lastName || ''}`.trim()
        );
        setUserEmail(data.data.customer.email || t('profile.userEmail'));
      } else {
        
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
     
    }
  };

  useEffect(() => {
      fetchUserProfile();
    }, []);

  return (
    <View>
      <CommonModal
        modal={
          <MultiLangauge
            onPress={visibleModal}
            navigation={props.navigation}
            t={t}
            from="drawer"
          />
        }
        showModal={showModal}
        visibleModal={visibleModal}
      />
      <CommonModal
        modal={
          <CurrencyConverter
            onPress={visibleCurrencyModal}
            navigation={props.navigation}
            from="drawer"
          />
        }
        showModal={showCurrencyModal}
        visibleModal={visibleCurrencyModal}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.mainView, {backgroundColor: colors.brandsBg}]}>
        <View style={[styles.imageView, {borderBottomColor: colors.line}]}>
          
          <Text style={[styles.name, {color: colors.text}]}>
          Hoşgeldiniz {userName}
            
          </Text>
          <DrawerArrow />
        </View>
        <View style={[styles.menuItem, {backgroundColor: colors.background}]}>
          {Data.drawerItems.map((items, key) => (
            <MenuItem
              icon={items.icons}
              text={items.name}
              show={key == 10 ? true : false}
              showLine={key == 10 ? false : true}
              description={items.description}
              showSwitch={items.showSwitch}
              onPress={() => goToScreen(key)}
              t={t}
              darkModeSwitch={key == 0 ? true : false}
              rtlSwitch={key == 1 ? true : false}
            />
          ))}
          <View style={styles.logoutBtn}>
            <LogOut navigation={props.navigation} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
