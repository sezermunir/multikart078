import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Header} from '@commonComponents';
import {useTranslation} from 'react-i18next';
import Data from '@utils/json';
import styles from './style';
import {windowHeight} from '@theme/appConstant';
import {useTheme} from '@react-navigation/native';
import {useValues} from '@App';

export function category({navigation}) {
  const {t} = useTranslation();
  const category = Data.category;
  const {colors} = useTheme();
  const {isDark} = useValues();

  const goToScreen = () => {
    navigation.navigate('cart');
  };

  // Kategorileri 3'erli gruplar halinde bölme
  const chunkArray = (array, chunkSize) => {
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const groupedCategories = chunkArray(category, 3);

  return (
    <SafeAreaView>
      <Header
        showIcon
        text={t('category.categories')}
        navigation={navigation}
        onCartPress={goToScreen}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {groupedCategories.map((group, groupIndex) => (
          <View
            key={groupIndex}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: windowHeight(10),
            }}>
            {group.map((item, key) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ShopPage', { categoryId: item.categoryId })}
                key={key}
                style={[
                  styles.category,
                  {
                    flex: 1,
                    backgroundColor: '#FFF',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    marginHorizontal: 5,
                  },
                ]}>
                <Image style={styles.categoryImg} source={item.categoryImg} />
                <View>
                  <Text style={[styles.categoryName, {color: '#000'}]}>
                    {t(item.name).toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  ); 
}