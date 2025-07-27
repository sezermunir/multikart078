import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Data from '@utils/json';
import Swiper from 'react-native-swiper';
import {Button} from '@commonComponents';
import styles from './style';

export default slider = props => {
  const bannerSection = Data.bannerSection;
  const {colors} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.mainView, {backgroundColor: colors.background}]}
      onPress={() => {
        props.navigation.navigate('ShopPage');
      }}>
      <Swiper
        paginationStyle={styles.pagination}
        dot={
          <View style={[styles.dot, {backgroundColor: props.colors.divider}]} />
        }
        activeDot={
          <View
            style={[styles.activeDot, {backgroundColor: props.colors.divider}]}
          />
        }
        dotColor={'black'}
        activeDotColor={props.colors.divider}
        key={bannerSection.length}
        loop={true}
        autoplay={true}
        autoplayTimeout={5}
        scrollViewStyle={styles.scrollView}
        showsPagination
        removeClippedSubviews={false}
        containerStyle={styles.container}>
        {bannerSection.map((item, key) => (
          <View key={key}>
            <Image source={item.image} style={styles.img} />
            
          </View>
        ))}
      </Swiper>
    </TouchableOpacity>
  );
};
