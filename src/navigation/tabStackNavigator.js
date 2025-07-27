import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen } from './homeStackNavigator';
import { cart } from '../screens/dashboard/cart/index';
import { wishList } from '../screens/dashboard/wishList/index';
import { profile } from '../screens/dashboard/profile/index';
import { CategoryStackScreen } from './categoryStackScreen';
import ProductListPage from '../screens/dashboard/home/shopPage/index';
import RegistrationScreen from '../screens/auth/registration/registration';
import SearchScreen from '../screens/dashboard/search';
import TabComponents from '@otherComponent/tabComponents';
import { Home, Category, Cart, Profile, Wishlist } from '@utils/icons';
import { useTranslation } from 'react-i18next';
import { CommonContext } from '@App';
import LoginScreen from '../screens/auth/login/login';
import Pages from '../screens/pages/index';

const Tab = createBottomTabNavigator();

export default function TabStackScreen(props) {
  const { t } = useTranslation();
  const { customerToken, cartItems = [] } = useContext(CommonContext); // 🛒 sepet öğeleri burada

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const CartIconWithBadge = ({ color }) => (
    <View>
      <Cart height={26} width={20} color={color} />
      {cartItemCount > 0 && (
        <View style={{
          position: 'absolute',
          right: -8,
          top: -4,
          backgroundColor: 'red',
          borderRadius: 10,
          width: 16,
          height: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{cartItemCount}</Text>
        </View>
      )}
    </View>
  );


  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      tabBar={(props) => <TabComponents {...props} />}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: t('tabBar.home'),
          tabBarIcon: ({ tintColor }) => <Home color={tintColor} />,
          headerShown: false,
        }}
        initialParams={{ t }}
      />
      <Tab.Screen
        name="CategoryStackScreen"
        component={CategoryStackScreen}
        options={{
          tabBarLabel: t('tabBar.category'),
          tabBarIcon: ({ tintColor }) => <Category color={tintColor} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="cart"
        component={cart}
        options={{
          tabBarLabel: t('tabBar.cart'),
          tabBarIcon: ({ tintColor }) => <CartIconWithBadge color={tintColor} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="wishList"
        component={wishList}
        options={{
          tabBarLabel: t('tabBar.wishList'),
          tabBarIcon: ({ tintColor }) => (
            <Wishlist color={tintColor} height={25} width={20} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="profile"
        component={profile}
        options={{
          tabBarLabel: t('tabBar.profile'),
          tabBarIcon: ({ tintColor }) => (
            <Profile height={22} width={20} color={tintColor} />
          ),
          headerShown: false,
        }}
      />
      
      <Tab.Screen
        name="ShopPage"
        component={ProductListPage}
        options={{
          style: { display: 'none' },
          tabBarLabel: () => null,
          tabBarIcon: () => null,  // Iconu gizle
          tabBarStyle: { display: 'flex' },  // Tab barı göstermeye devam et
          headerShown: false,                // Header'ı gizle
        }}
      />
      <Tab.Screen
        name="registration"
        component={RegistrationScreen}
        options={{
          style: { display: 'none' },
          tabBarLabel: () => null,
          tabBarIcon: () => null,  // Iconu gizle
          headerShown: false,                // Header'ı gizle
        }}
      />
      <Tab.Screen
        name="login"
        component={LoginScreen}
        options={{
          presentation: 'modal',  // Modal olarak açılır
          headerShown: false,
          tabBarStyle: { display: 'flex' },  // Tabbar görünür
          tabBarLabel: () => null,
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="pages"
        component={Pages}
        options={{
          style: { display: 'none' },
          tabBarLabel: () => null,
          tabBarIcon: () => null,  // Iconu gizle
          headerShown: false,                // Header'ı gizle
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          style: { display: 'none' },
          tabBarLabel: () => null,
          tabBarIcon: () => null,  // Iconu gizle
          headerShown: false,                // Header'ı gizle
        }}
      />
     
    </Tab.Navigator>
  );
}
