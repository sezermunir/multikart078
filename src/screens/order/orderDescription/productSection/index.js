import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {product15} from '@utils/images/images';
import {windowHeight} from '@theme/appConstant';
import {useValues} from '@App';

export default function ProductSection(props) {
  const {colors, order} = props;
  const {textRTLStyle, viewRTLStyle} = useValues();
  const firstItem = order?.line_items?.[0];

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={[styles.boxView, {backgroundColor: colors.card}]}>
          <View
            style={[
              styles.row,
              {padding: windowHeight(10), flexDirection: viewRTLStyle},
            ]}>
            {/* Ürün Görseli */}
            <Image 
              source={firstItem?.image ? {uri: firstItem.image.src} : product15} 
              style={styles.imageStyle} 
            />

            {/* Ürün Açıklama */}
            <View style={styles.textView}>
              {/* Ürün Adı */}
              <Text style={[styles.name, {color: colors.text}]}>
                {firstItem?.title}
              </Text>

             

              {/* Ürün Adet */}
              <View style={[styles.row, {flexDirection: viewRTLStyle}]}>
                <Text style={[styles.textStyle, {color: colors.subText}]}>
                  Adet: 
                </Text>
                <Text style={[styles.textStyle, {color: colors.subText}]}>
                  {firstItem?.quantity}
                </Text>
              </View>

              {/* Ürün Fiyatı */}
              <Text
                style={[
                  styles.name,
                  {color: colors.text, textAlign: textRTLStyle},
                ]}>
                ${firstItem?.price || '0.00'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
