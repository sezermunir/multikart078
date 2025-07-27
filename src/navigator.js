import React, {useContext} from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {CommonContext} from '../App';
import colors from './theme/appColors';
import {createStackNavigator} from '@react-navigation/stack';
import onBoarding from './screens/onBoardingScreen';
import RegistrationScreen from './screens/auth/registration/registration';
import ForgotPasswordScreen from './screens/auth/forgotPassword/forgotPassword';
import ResetpasswordScreen from './screens/auth/resetpassword/resetPassword';
import Search from './screens/dashboard/search';
import ProfileSettings from './screens/dashboard/profile/profileSettings';
import OrderSuccessful from './screens/order/orderSuccessful';
import OrderNotSuccessful from './screens/order/orderNotSuccessful';
import Drawer from './navigation/drawerNavigator';
import {useTranslation} from 'react-i18next';
import OrderHistory from './screens/order/orderHistory';
import Product from './screens/dashboard/product';
import ApplyCoupon from './screens/dashboard/cart/applyCoupons';
import Notification from './screens/notification';
import Payment from './screens/dashboard/cart/payment';
import AddNewAddress from './screens/dashboard/cart/addNewAddress';
import {innerCategory} from './screens/dashboard/category/innerCategory';
import {CategoryStackScreen} from './navigation/categoryStackScreen';
import DeliveryDetails from './screens/dashboard/cart/deliveryDetails';
import AboutUs from './screens/aboutUs';
import HelpCenter from './screens/helpCenter';
import TermsCondition from './screens/termsConditions';
import Category from './screens/dashboard/home/category';
import {cart} from './screens/dashboard/cart';
import {profile} from './screens/dashboard/profile';
import ShopPage from './screens/dashboard/home/shopPage';
import PaymentCard from './screens/dashboard/profile/paymentCard';
import {HomeStackScreen} from './navigation/homeStackNavigator';
import {wishList} from './screens/dashboard/wishList';
import LoginScreen from './screens/auth/login/login';
import orderScreen from './screens/order/orderDescription';
import orderSummary from './screens/order/orderSuccessful/orderSummary';
import Splash from './screens/splash';
import Pages from './screens/pages';
import Settings from './screens/settings';
import OrderDescription from './screens/order/orderDescription';
import EmptyCart from './screens/dashboard/cart/emptyCart';
import SavedAddress from './screens/dashboard/profile/savedAddress';
import {commenOTPlayout} from './screens/auth/resetpassword/otpVerification';
import OrderHistoryWebView from './screens/order/OrderHistoryWebView';
import SifreUnut from './screens/auth/SifreUnut';
import UyeOl from './screens/auth/UyeOl';
import Odeme from './screens/auth/Odeme';
import DebitCard from './screens/dashboard/cart/payment/paymentMethod/debitCard';

const Stack = createStackNavigator();

const MyStack = () => {
  const {t} = useTranslation();
  const commonContext = useContext(CommonContext);
  const customeDefaultTheme = {
    ...DefaultTheme,
    colors: {
      background: colors.white,
      text: colors.darkGray,
      primary: colors.brandsBg,
      card: colors.white,
      productColor: colors.productColor,
      subText: colors.grey,
      divider: colors.border,
      drawerBg: colors.drawerBg,
      dropdown: colors.dropdown,
      line: colors.line,
      styleBackground: colors.styleBackground,
      brandsBg: colors.divider,
      search: colors.search,
      icon: colors.icon,
      product: colors.divider,
      cuponsbg: colors.styleBackground,
      placeholderBg: colors.white,
    },
  };
  const customeDarkTheme = {
    ...DarkTheme,
    colors: {
      background: colors.dark,
      text: colors.white,
      primary: colors.black,
      card: colors.black,
      productColor: colors.black,
      subText: colors.subTextDark,
      divider: colors.black,
      drawerBg: colors.black,
      dropdown: colors.productDarkColor,
      line: colors.productDarkColor,
      styleBackground: colors.productDarkColor,
      brandsBg: colors.productDarkColor,
      search: colors.white,
      icon: colors.darkIcon,
      product: colors.black,
      cuponsbg: colors.black,
      placeholderBg: colors.productDarkColor,
    },
  };
  const linking = {
  prefixes: ['https://www.silifkesepeti.com', 'silifkesepeti://'],
  config: {
    screens: {
      OrderSuccessful: 'payment-success',
    },
  },
};
  const theme = commonContext.isDark ? customeDarkTheme : customeDefaultTheme;
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <Stack.Navigator
        screenOptions={{headerShown: false, t}}
        initialRouteName={Splash}>
        <Stack.Screen name="Splash" component={Splash} initialParams={{t}} />
        <Stack.Screen
          name="onBoarding"
          component={onBoarding}
          initialParams={{t}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          initialParams={{t}}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          initialParams={{t}}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          initialParams={{t}}
        />
        <Stack.Screen
          name="ResetpasswordScreen"
          component={ResetpasswordScreen}
          initialParams={{t}}
        />
        <Stack.Screen
          name="commenOTPlayout"
          component={commenOTPlayout}
          initialParams={{t}}
        />
        <Stack.Screen name="Drawer" component={Drawer} initialParams={{t}} />
        <Stack.Screen
          name="HomeStackScreen"
          component={HomeStackScreen}
          initialParams={{t}}
        />
        <Stack.Screen
          name="CategoryStackScreen"
          component={CategoryStackScreen}
          initialParams={{t}}
        />
        <Stack.Screen
          name="innerCategory"
          component={innerCategory}
          initialParams={{t}}
        />
        <Stack.Screen
          name="wishList"
          component={wishList}
          initialParams={{t}}
        />
        <Stack.Screen name="profile" component={profile} initialParams={{t}} />
        <Stack.Screen
          name="ProfileSettings"
          component={ProfileSettings}
          initialParams={{t}}
        />
        <Stack.Screen
          name="AddNewAddress"
          component={AddNewAddress}
          initialParams={{t}}
        />
        <Stack.Screen
          name="OrderSuccessful"
          component={OrderSuccessful}
          initialParams={{t}}
        />
        <Stack.Screen
          name="OrderNotSuccessful"
          component={OrderNotSuccessful}
          initialParams={{t}}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          initialParams={{t}}
        />
        <Stack.Screen
          name="orderScreen"
          component={orderScreen}
          initialParams={{t}}
        />
        <Stack.Screen
          name="orderSummary"
          component={orderSummary}
          initialParams={{t}}
        />
        <Stack.Screen
          name="OrderDescription"
          component={OrderDescription}
          initialParams={{t}}
        />

        <Stack.Screen name="Product" component={Product} initialParams={{t}} />
        <Stack.Screen
          name="ApplyCoupon"
          component={ApplyCoupon}
          initialParams={{t}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          initialParams={{t}}
        />
        <Stack.Screen
          name="DebitCard"
          component={DebitCard}
          initialParams={{t}}
        />
        <Stack.Screen name="Payment" component={Payment} initialParams={{t}} />
        <Stack.Screen name="Search" component={Search} initialParams={{t}} />
        <Stack.Screen
          name="DeliveryDetails"
          component={DeliveryDetails}
          initialParams={{t}}
        />
        <Stack.Screen name="AboutUs" component={AboutUs} initialParams={{t}} />
        <Stack.Screen
          name="TermsCondition"
          component={TermsCondition}
          initialParams={{t}}
        />
        <Stack.Screen name="cart" component={cart} initialParams={{t}} />
        <Stack.Screen
          name="PaymentCard"
          component={PaymentCard}
          initialParams={{t}}
        />
        <Stack.Screen
          name="ShopPage"
          component={ShopPage}
          initialParams={{t}}
        />
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenter}
          initialParams={{t}}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          initialParams={{t}}
        />
        <Stack.Screen name="Pages" component={Pages} initialParams={{t}} />
        <Stack.Screen
          name="Settings"
          component={Settings}
          initialParams={{t}}
        />
        <Stack.Screen
          name="EmptyCart"
          component={EmptyCart}
          initialParams={{t}}
        />
        <Stack.Screen
          name="SavedAddress"
          component={SavedAddress}
          initialParams={{t}}
        />
        <Stack.Screen name="OrderHistoryWebView" component={OrderHistoryWebView} />
        <Stack.Screen name="SifreUnut" component={SifreUnut} />
        <Stack.Screen name="UyeOl" component={UyeOl} />
        <Stack.Screen name="Odeme" component={Odeme} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
