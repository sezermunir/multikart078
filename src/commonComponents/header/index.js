import React from 'react';
import { View, Text, TouchableOpacity, Share as NativeShare } from 'react-native';
import styles from './styles';
import { useTheme } from '@react-navigation/native';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { Wishlist, Cart, Arrow, Search } from '@utils/icons';
import { Share } from '@assets/icons/share';
import { Notification } from '../../assets/icons/notification';
import { useValues } from '@App';

export function Header(props) {
  const { colors } = useTheme();
  const { viewRTLStyle, imageRTLStyle, isDark } = useValues();

  const handleShare = async () => {
    try {
      const shareUrl = props.shareUrl || 'https://www.silifkesepeti.com';
      await NativeShare.share({
        message: `${shareUrl}`,
      });
    } catch (error) {
      console.error('❌ Share error:', error);
    }
  };

  return (
    <View
      style={[
        styles.mainView,
        {
          backgroundColor: isDark ? colors.card : null,
          flexDirection: viewRTLStyle,
        },
      ]}>
      <View style={[styles.first, {flexDirection: viewRTLStyle}]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => props.navigation.goBack()}>
          <View style={{transform: [{scaleX: imageRTLStyle}]}}>
            <Arrow />
          </View>
        </TouchableOpacity>
        <View style={styles.text}>
          <Text
            style={[
              styles.text1,
              {
                color: colors.text,
              },
              props.textStyle,
            ]}>
            {props.text}
          </Text>
          {props.showText && <Text style={styles.text2}>{props.subText}</Text>}
        </View>
      </View>
      <View style={[styles.cart, {flexDirection: viewRTLStyle}]}>
        {props.shareIcon && (
         
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleShare}
            style={[
              styles.share,
              {
                position: 'absolute',
                right: 20,
                top: -4,
                borderRadius: 6,
                padding: 5,
                width: 30,
                height: 34,
              },
            ]}>
            <Share width={windowWidth(24)} height={windowHeight(24)} color={'#fff'} />
          </TouchableOpacity>
          
        )}
        {props.searchIcon && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.search}
            onPress={() => {
              props.navigation.navigate('Search');
            }}>
            <Search width={windowWidth(24)} height={windowHeight(24)} />
          </TouchableOpacity>
        )}
        {props.notificationIcon && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.share}
            onPress={() => {
              props.navigation.navigate('Notification');
            }}>
            <Notification width={windowWidth(24)} height={windowHeight(24)} />
          </TouchableOpacity>
        )}
        {props.showWishListIcon && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => props.navigation.navigate('wishList')}
            style={styles.wishlist}>
            <Wishlist width={windowWidth(24)} height={windowHeight(24)} />
          </TouchableOpacity>
        )}
        {props.showIcon && (
          <TouchableOpacity
            style={styles.cartIcon}
            activeOpacity={0.9}
            onPress={() => props.navigation.navigate('cart')}>
            <Cart />
          </TouchableOpacity>
        )}
        {props.showIcon2 && (
          <TouchableOpacity
            style={[styles.cartIcon,{position: 'absolute', right: -5, top: 0, backgroundColor: 'red', borderRadius: 6, padding: 5, width: 30, height: 34, color: '#fff'}]}
            activeOpacity={0.9}
            onPress={() => props.navigation.navigate('cart')}>
            <Cart width={windowWidth(24)} height={windowHeight(24)} color={'#fff'} />
          </TouchableOpacity>
        )}
        {props.shareIcon2 && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleShare}
            style={[
              styles.share,
              {
                position: 'absolute',
                left: 135,
                top: 0,
                backgroundColor: 'red',
                borderRadius: 6,
                padding: 5,
                width: 30,
                height: 34,
              },
            ]}>
            <Share width={windowWidth(24)} height={windowHeight(24)} color={'#fff'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
