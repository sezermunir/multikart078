import React from 'react';
import {View, Text} from 'react-native';
import {Button} from '@commonComponents';
import styles from './style';
import {fontSizes} from '@theme/appConstant';

export default startShopping = props => {
  const t = props.t;
  const goToHome = () => {
    props.navigation.replace('HomeStackScreen');  };
  const goToLogin = () => {
    props.navigation.replace('LoginScreen');  };
  return (
    <View>
      <Button
        text={'onBoarding.startShopping'}
        style={styles.buttonStyle}
        fontSize={fontSizes.FONT20}
        onPress={goToHome}
        t={t}
      />
      <View style={styles.createNewMainView}>
        <Text style={styles.createNewText}>
          {t('authComman.alreadyHaveAccount')}
        </Text>
        <Text
          onPress={() => goToLogin()}
          style={[styles.createNewText, styles.createNewUnderlineText]}>
          {t('authComman.signIn')}
        </Text>
      </View>
    </View>
  );
};
