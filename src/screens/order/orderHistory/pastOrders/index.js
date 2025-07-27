import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {map, darkMap} from '@utils/images/images';
import styles from './styles';
import Data from '@utils/json';
import {windowHeight} from '@theme/appConstant';
import RatingContainer from './ratingContainer';
import {useValues} from '@App';
export default pastOrders = props => {
  const {t, colors, visibleModal} = props;
  const {isDark, textRTLStyle, viewRTLStyle, viewSelfRTLStyle} = useValues();

  const goToScreen = () => {
    props.navigation.navigate('OrderDescription');
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={goToScreen}>
        <Text
          style={[styles.title, {color: colors.text, textAlign: textRTLStyle}]}>
          {t('orderHistory.pastOrders')}
        </Text>
        <FlatList
          data={Data.pastOrders}
          style={styles.mainView}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={[
                styles.orderSeperator,
                {backgroundColor: colors.brandsBg},
              ]}
            />
          )}
          renderItem={({item, index}) => (
            <View>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent: 'space-between',
                    flexDirection: viewRTLStyle,
                  },
                ]}>
                <Image source={item.image} style={styles.imageStyle} />
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.name,
                      {color: colors.text, textAlign: textRTLStyle},
                    ]}>
                    {t(item.orderName)}
                  </Text>
                  <View
                    style={[
                      styles.row,
                      {
                        marginVertical: windowHeight(3),
                        flexDirection: viewRTLStyle,
                      },
                    ]}>
                    <Text style={[styles.textStyle, {color: colors.subText}]}>
                      {t('orderSuccess.size')} : {t(item.size)},
                    </Text>
                    <Text style={[styles.textStyle, {color: colors.subText}]}>
                      {t('orderSuccess.qty')}: {t(item.quantity)}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text
                      style={[styles.viewDetails, {textAlign: textRTLStyle}]}>
                      {t('cart.viewDetails')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.ongoingView}>
                  <Text style={styles.text}>{t(item.deliveryStatus)}</Text>
                </View>
              </View>
              <ImageBackground
                source={isDark ? darkMap : map}
                style={[styles.mapStyle, {alignItems: viewSelfRTLStyle}]}>
                <View style={styles.bottomView}>
                  <View style={[styles.row, {flexDirection: viewRTLStyle}]}>
                    <View style={styles.margin}>
                      <Text
                        style={[
                          styles.order,
                          {color: colors.subText, textAlign: textRTLStyle},
                        ]}>
                        {t('orderHistory.ordered')}
                      </Text>
                      <Text style={[styles.date, {color: colors.text}]}>
                        {t(item.date)}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={[
                          styles.order,
                          {color: colors.subText, textAlign: textRTLStyle},
                        ]}>
                        {t('orderHistory.deliveryStatus')}
                      </Text>
                      <Text
                        style={[
                          styles.date,
                          {color: colors.text, textAlign: textRTLStyle},
                        ]}>
                        {t(item.deliveryStatus)}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
              <RatingContainer
                colors={colors}
                t={t}
                visibleModal={visibleModal}
              />
            </View>
          )}
        />
      </TouchableOpacity>
    </View>
  );
};
