import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import Price from './withPrice';
import AddToCart from './withAddToCart';
import WithWishlist from './withWishlist';
import {t} from 'i18next';
import {Divider} from '@commonComponents';
import {useTheme} from '@react-navigation/native';
import {windowHeight} from '@theme/appConstant';
import LikeAnimation from '../likeAnimation';
import {useValues} from '@App';

export function ProductHorizontal(props) {
  const products = props.products;
  const { colors } = useTheme();
  const { isRTL, viewRTLStyle } = useValues();


  return (
    <View>
      <ScrollView
        contentContainerStyle={props.style}
        showsVerticalScrollIndicator={false}>
        {products.map((item, key) => (
          <TouchableOpacity
          key={key}
          activeOpacity={0.7}
          onPress={() => props.onPress(item.id)}>

          
            <View
              style={[
                styles.dealsView,
                {
                  backgroundColor: colors.product,
                  marginVertical: props.marginVertical
                    ? props.marginVertical
                    : windowHeight(6),
                  flexDirection: viewRTLStyle,
                },
              ]}>
              <Image
                style={[styles.image, props.productStyle, { width: 100, height: 100 }]}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
              <View
                style={[
                  styles.txtView,
                  {flexDirection: viewRTLStyle, width: isRTL ? '60%' : '70%'},
                ]}>
                <View>
                  <Text style={[styles.title, {color: props.colors.text, fontWeight: 'bold'}]}>
                    {props.t(item.title)}
                  </Text>
                  {props.showPrice && (
                    <Price
                      brandName={t(item.brandName)}
                      colors={props.colors}
                      discountPrice={t(item.discountPrice)}
                      price={t(item.price)}
                      
                    />
                  )}
                </View>
                </View>
              </View>
            {props.showDivider && <Divider />}
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
