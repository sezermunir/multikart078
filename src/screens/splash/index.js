import React, {useEffect, useRef} from 'react';
import {Animated, View, Text, Easing} from 'react-native';
import {useValues} from '@App';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {getValue, setValue} from '@utils/localStorage';

export default function Splash({navigation}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(-50)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const {setIsRTL, setCurrSymbol, setCurrValue, setIsFirstLaunch} = useValues();
  const {i18n} = useTranslation();

  useEffect(() => {
    runAnimation();
    getSelectedLanguage();
    getCurrencySymbol();
    getCurrencyValue();
    getRtlValue();
  }, []);

  const runAnimation = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Slogan animasyonu
      Animated.parallel([
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          checkIsFirstLaunch();
        }, 1000);
      });
    });
  };

  const getSelectedLanguage = async () => {
    const lang = await getValue('language');
    if (lang) {
      const parsed = JSON.parse(lang);
      if (parsed) i18n.changeLanguage(parsed);
    }
  };

  const getRtlValue = async () => {
    const rtl = await getValue('rtl');
    if (rtl) setIsRTL(JSON.parse(rtl));
  };

  const getCurrencySymbol = async () => {
    const symbol = await getValue('curruncySymbol');
    if (symbol) setCurrSymbol(JSON.parse(symbol));
  };

  const getCurrencyValue = async () => {
    const value = await getValue('curruncyValue');
    if (value) setCurrValue(JSON.parse(value));
  };

  const checkIsFirstLaunch = async () => {
    const isFirstLaunch = await getValue('isFirstLaunch');
    if (isFirstLaunch == null) {
      await setValue('isFirstLaunch', true.toString());
      navigation.replace('onBoarding');
    } else {
      navigation.replace('Drawer');
    }
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.mainContainer}>
      <Animated.Image
        source={require('@assets/images/logo/logo.png')}
        style={{
          width: 200,
          height: 200,
          opacity,
          transform: [
            {scale},
            {rotate: rotateInterpolate},
          ],
        }}
        resizeMode="contain"
      />
      <Animated.Text
        style={{
          color: '#333',
          fontSize: 28,
          fontWeight: 'bold',
          marginTop: 20,
          transform: [{translateY: textTranslateY}],
          opacity: textOpacity,
        }}>
        Silifke Sepeti
      </Animated.Text>
    </View>
  );
}
