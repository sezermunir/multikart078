import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useValues } from '@App';
import { useTheme } from '@react-navigation/native';
import { windowHeight, windowWidth } from '@theme/appConstant';

import Images from '@utils/images/images';
import { Wishlist, Notification, Drawer, Search, Cart } from '@utils/icons';

export function HomeHeader(props) {
  const { isDark, viewRTLStyle, viewSelfRTLStyle, isRTL } = useValues();
  const { colors } = useTheme();

  const toggleDrawer = () => {
    props.navigation.toggleDrawer();
  };

  const goToHome = () => {
    props.navigation.navigate('HomeStackScreen');
  };

  return (
    <View
      style={[
        styles.mainView,
        { backgroundColor: colors.card, flexDirection: viewRTLStyle },
      ]}
    >
      {/* Logo alanı dokunulabilir hale getirildi */}
      <TouchableOpacity onPress={goToHome} style={styles.logo} activeOpacity={0.9}>
        <Image
          source={require('@assets/images/logo/logo.png')}
          resizeMode="contain"
          style={[
            styles.logoImg,
            { alignSelf: viewSelfRTLStyle },
            { right: windowWidth(0) },
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mainLogoView}
        activeOpacity={0.8}
        onPress={props.searchPress}>
        <Search />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mainLogoView}
        activeOpacity={0.8}
        onPress={props.wishlistPress}>
        <Wishlist />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mainLogoView}
        activeOpacity={0.8}
        onPress={props.cartPress}>
        <Cart width={windowWidth(24)} height={windowHeight(24)} />
      </TouchableOpacity>
    </View>
  );
}
