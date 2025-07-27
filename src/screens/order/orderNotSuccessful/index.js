import React from 'react';
import {View, Text, Image, ScrollView, SafeAreaView} from 'react-native';
import {Header, Divider} from '@commonComponents';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {cancelCircle} from '@utils/images/images';
import {windowHeight} from '@theme/appConstant';
import {useTheme} from '@react-navigation/native';
import ButtonContainer from '@commonComponents/buttonContainer';

export default function OrderNotSuccessful({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  return (
    <SafeAreaView>
      <Header text={t('orderSuccess.orderPlaced')} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.order}>
        <View style={styles.circleView}>
          <Image source={cancelCircle} style={styles.circleImage} />
        </View>
        <Text style={styles.title}>Sipariş başarısız</Text>
        <Text style={[styles.subTitle, {color: colors.text}]}>
          Siparişinizi oluştururken bir hata oldu. Lütfen tekrar deneyiniz.
        </Text>
       
        <Divider marginTop={windowHeight(16)} />
        
      </ScrollView>
      <ButtonContainer
        t={t}
        colors={colors}
        
        btnTitle={'Sepete Dön'}
        btnClick={() => {
          navigation.navigate('Cart');
        }}
      />
    </SafeAreaView>
  );
}
