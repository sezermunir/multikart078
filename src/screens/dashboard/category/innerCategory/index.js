import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {Header} from '@commonComponents';
import {useTranslation} from 'react-i18next';
import Data from '@utils/json';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import TrendingCategory from '../../search/trendingCategory';
import Brands from '@otherComponent/topBrands';
import Category from './category';
import SubCategory from './subCategory';

export function innerCategory({navigation}) {
  const {t} = useTranslation();
  const trendingCategory = Data.trendingCategory;
  const subCategory = Data.subCategory;
  const brands = Data.topBrands;
  const {colors} = useTheme();
  const [openCat, setOpenCat] = useState(null);

  return (
    <SafeAreaView>
      <Header
        showIcon
        showWishListIcon
        text={t('category.categories')}
        navigation={navigation}
        notificationIcon
        searchIcon
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        
        
        <TrendingCategory
          colors={colors}
          t={t}
          trendingCategory={trendingCategory}
          text
          navigation={navigation}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}
