import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useTheme } from '@react-navigation/native';
import { Wishlist, Cart, Arrow, Home, Profile, Category } from '@utils/icons'; 
import { useValues } from '@App';

export function LoginHeader(props) {
  const { colors } = useTheme();
  const { viewRTLStyle, imageRTLStyle, isDark } = useValues();

  return (
    <View
    style={styles.tabBarContainer}
    >
      

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => props.navigation.navigate('HomeStackScreen')}
        >
          <Home color={colors.text} />
          <Text style={[styles.tabText, { color: colors.text }]}>Ana Sayfa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => props.navigation.navigate('CategoryStackScreen')}
        >
          <Category color={colors.text} />
          <Text style={[styles.tabText, { color: colors.text }]}>Kategoriler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => props.navigation.navigate('cart')}
        >
          <Cart color={colors.text} />
          <Text style={[styles.tabText, { color: colors.text }]}>Sepet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => props.navigation.navigate('wishList')}
        >
          <Wishlist color={colors.text} />
          <Text style={[styles.tabText, { color: colors.text }]}>Favoriler</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => props.navigation.navigate('profile')}
        >
          <Profile color={colors.text} />
          <Text style={[styles.tabText, { color: colors.text }]}>Profil</Text>
        </TouchableOpacity>
      </View>
   
  );
}
