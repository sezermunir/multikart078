import {Linking} from 'react-native';

const linking = {
  prefixes: ['https://www.silifkesepeti.com', 'silifkesepeti://'],
  config: {
    screens: {
      OrderSuccessful: 'payment-success',
      // diğer deep link'li ekranlar eklenebilir
    },
  },
};

import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import {LogBox} from 'react-native';
import Navigator from './src/navigator';
import { NavigationContainer } from '@react-navigation/native';
import {getValue} from './src/utils/localStorage';
import {
  textRTLStyle,
  viewRTLStyle,
  imageRTLStyle,
  viewSelfRTLStyle,
} from './src/style/rtlStyle';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import {
  SHOPIFY_ADMIN_API_TOKEN,
  SHOPIFY_FRONT_TOKEN,
  SHOPIFY_URL,
  SHOPIFY_STORE,
  API_URL,
} from '@env';

type CommonContextType = {
  [key: string]: any; // dilersen detaylı şekilde de tipleri belirtebilirim
};

export const CommonContext = createContext<CommonContextType>({} as CommonContextType);

LogBox.ignoreAllLogs();

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
    setCartItems
  };

  console.log('IS FIRST TIME', isFirstLaunch);

  
// Remove this method to stop OneSignal Debugging
OneSignal.Debug.setLogLevel(LogLevel.Verbose);

// OneSignal Initialization
OneSignal.initialize("62f08d95-9fda-42ac-bd7d-d3af79e34072");

// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);

// Method for listening for notification clicks
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log('OneSignal: notification clicked:', event);
});

  useEffect(() => {
    const getDarkModeval = async () => {
      getValue('darkMode')
        .then(res => JSON.parse(res))
        .then(val => {
          if (val !== null) {
            setIsDark(val);
          }
        });
    };
    getDarkModeval();
  }, []);

  useEffect(() => {
  setToken(SHOPIFY_ADMIN_API_TOKEN);
}, []);

useEffect(() => {
  setFrontToken(SHOPIFY_FRONT_TOKEN);
}, []);

useEffect(() => {
  setShopifyUrl(SHOPIFY_URL);
}, []);

useEffect(() => {
  setStoreUrl(SHOPIFY_STORE);
  setApiUrl(API_URL);
}, []);
  
  useEffect(() => {
    // if (OneSignal) {
    //   OneSignal.setAppId('62f08d95-9fda-42ac-bd7d-d3af79e34072');
    //   OneSignal.setLogLevel(6, 0);
  
    //   OneSignal.setNotificationOpenedHandler(notification => {
    //     console.log('Notification opened:', notification);
    //   });
  
    //   OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //     console.log('Prompt response:', response);
    //   });
    // } else {
    //   console.error('OneSignal is not initialized properly.');
    // }
  }, []);


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
