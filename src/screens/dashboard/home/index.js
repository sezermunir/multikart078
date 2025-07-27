import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Image, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { HomeHeader, Divider } from '@commonComponents';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';
import Category from './category';
import Slider from './slider';
import DealOfDay from './dealsOfDay';
import KidsCorner from './KidsCorner';
import OfferCorner from './offerCorner';
import styles from './style';
import { windowHeight, windowWidth } from '@theme/appConstant';
import { Dimensions } from 'react-native';

export function home(props) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [showCampaignModal, setShowCampaignModal] = useState(true);

  const goToSearch = () => props.navigation.navigate('Search');
  const goToNotification = () => props.navigation.navigate('Notification');
  const goToWishlist = () => props.navigation.navigate('wishList');
  const goToCart = () => props.navigation.navigate('cart');
  const { width, height } = Dimensions.get('window');
  return (
    <SafeAreaView>
      {/* 🎯 Kampanya Açılış Görseli */}
      <Modal visible={showCampaignModal} transparent animationType="fade">
  <View style={localStyles.modalContainer}>
    <Image
      source={{ uri: 'https://app.silifkesepeti.com/banner/5al4ode_giris.png' }}
      style={[localStyles.campaignImage, { width: width, height: height }]}
      resizeMode="cover"
    />
    <TouchableOpacity onPress={() => setShowCampaignModal(false)} style={localStyles.closeButton}>
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Kapat</Text>
    </TouchableOpacity>
  </View>
</Modal>

      <HomeHeader
        navigationProps={props.navigation}
        searchPress={goToSearch}
        notificationPress={goToNotification}
        wishlistPress={goToWishlist}
        cartPress={goToCart}
        navigation={props.navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Category navigation={props.navigation} t={t} colors={colors} />
        <Divider marginVertical={windowHeight(8)} />
        <Slider t={t} colors={colors} navigation={props.navigation} />
        <DealOfDay t={t} colors={colors} navigation={props.navigation} />
        <Divider marginVertical={windowHeight(8)} />
        <KidsCorner navigation={props.navigation} t={t} colors={colors} />
        <Divider marginVertical={windowHeight(8)} />
        <OfferCorner t={t} colors={colors} navigation={props.navigation} />
        <View style={styles.view} />
      </ScrollView>
    </SafeAreaView>
  );
}

// 🎨 Stil ayarları
const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000dd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignImage: {
    width: windowWidth(90),
    height: windowHeight(90),
  },
  closeButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#000000aa',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
