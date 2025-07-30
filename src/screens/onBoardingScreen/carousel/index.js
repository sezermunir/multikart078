import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import styles from './styles';
import Data from '@utils/json';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = 390;

export default function CarouselItem(props) {
  const { colors, t } = props;
  const [key, setKey] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setKey(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <FlatList
          ref={flatListRef}
          data={Data.data}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item }) => (
            <View style={[styles.imageContainer, { width: ITEM_WIDTH, height: ITEM_HEIGHT }]}>
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
