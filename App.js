import React, { createContext, useState, useContext, useEffect } from 'react';
import { LogBox } from 'react-native';
import Navigator from './src/navigator';
import { NavigationContainer } from '@react-navigation/native';
import { getValue } from './src/utils/localStorage';
import {
  textRTLStyle,
  viewRTLStyle,
  imageRTLStyle,
  viewSelfRTLStyle,
} from './src/style/rtlStyle';
// import { LogLevel, OneSignal } from 'react-native-onesignal'; // ⛔️ Geçici olarak kaldırıldı
import {
  SHOPIFY_ADMIN_API_TOKEN,
  SHOPIFY_FRONT_TOKEN,
  SHOPIFY_URL,
  SHOPIFY_STORE,
  API_URL,
} from '@env';

export const CommonContext = createContext({});

// LogBox.ignoreAllLogs();

const App = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currSymbol, setCurrSymbol] = useState('$');
  const [currValue, setCurrValue] = useState(1);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [token, setToken] = useState(null);
  const [customerToken, setCustomerToken] = useState(null);
  const [shopifyUrl, setShopifyUrl] = useState(null);
  const [frontToken, setFrontToken] = useState(null);
  const [storeUrl, setStoreUrl] = useState(null);
  const [apiUrl, setApiUrl] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const contextValues = {
    isRTL,
    setIsRTL,
    isDark,
    setIsDark,
    textRTLStyle: textRTLStyle(isRTL),
    viewRTLStyle: viewRTLStyle(isRTL),
    imageRTLStyle: imageRTLStyle(isRTL),
    viewSelfRTLStyle: viewSelfRTLStyle(isRTL),
    currSymbol,
    setCurrSymbol,
    currValue,
    setCurrValue,
    isFirstLaunch,
    setIsFirstLaunch,
    token,
    setToken,
    shopifyUrl,
    setShopifyUrl,
    customerToken,
    setCustomerToken,
    frontToken,
    setFrontToken,
    storeUrl,
    setStoreUrl,
    apiUrl,
    setApiUrl,
    cartItems,
    setCartItems,
  };

  useEffect(() => {
    getValue('darkMode').then((res) => {
      try {
        const parsed = JSON.parse(res);
        if (parsed !== null) setIsDark(parsed);
      } catch (e) {
        console.warn('darkMode parse hatası:', e);
      }
    });
  }, []);

  useEffect(() => {
    if (!SHOPIFY_ADMIN_API_TOKEN || !SHOPIFY_URL) {
      console.error('Shopify ortam değişkenleri eksik');
    }
    setToken(SHOPIFY_ADMIN_API_TOKEN);
    setFrontToken(SHOPIFY_FRONT_TOKEN);
    setShopifyUrl(SHOPIFY_URL);
    setStoreUrl(SHOPIFY_STORE);
    setApiUrl(API_URL);
  }, []);

  // OneSignal kaldırıldı
  /*
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize('62f08d95-9fda-42ac-bd7d-d3af79e34072');
    OneSignal.Notifications.requestPermission(true);
    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('Bildirim tıklandı:', event);
    });
  }, []);
  */

  const linking = {
    prefixes: ['https://www.silifkesepeti.com', 'silifkesepeti://'],
    config: {
      screens: {
        OrderSuccessful: 'payment-success',
      },
    },
  };

  return (
    <CommonContext.Provider value={contextValues}>
      <NavigationContainer linking={linking}>
        <Navigator />
      </NavigationContainer>
    </CommonContext.Provider>
  );
};

export const useValues = () => useContext(CommonContext);
export default App;
