import React, { useState } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styles from './styles';
import Data from '@utils/json';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = 390; // Aynı yükseklik değeri

export default function CarouselItem(props) {
  const { colors, t } = props;
  const [key, setKey] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Carousel
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
          data={Data.data}
          scrollAnimationDuration={500}
          mode="parallax"
          onSnapToItem={(index) => setKey(index)}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={item.imgUrl} style={styles.sliderImage} />
            </View>
          )}
        />
      </View>
      <View style={styles.titleMainView}>
        <Text style={[styles.header, { color: colors.text }]}>
          {t(Data.data[key].title)}
        </Text>
        <Text style={[styles.body, { color: colors.subText }]}>
          {t(Data.data[key].body)}
        </Text>
      </View>
    </View>
  );
}
