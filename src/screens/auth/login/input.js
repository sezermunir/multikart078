import React from 'react';
import { Text, View } from 'react-native';
import styles from './style';
import { Input, Button } from '@commonComponents';
import { fontSizes } from '@theme/appConstant';
import SocialLogin from '../login/socialLogin';
import { useValues } from '@App';

const InputComponent = (props) => {
  const { t, colors, onChange, goToHome, errors, setLoading, form } = props;
  const { textRTLStyle, viewRTLStyle } = useValues();

  const goToForgotPassword = () => {
    props.navigation.navigate('SifreUnut');  // props üzerinden navigation
  };

  const goToRegistration = () => {
    props.navigation.navigate('RegistrationScreen');  // props üzerinden navigation
  };

  return (
    <View style={styles.subView}>
      <Text
        style={[
          styles.titleText,
          { color: colors.text, textAlign: textRTLStyle },
        ]}
      >
        {t('authComman.hey')}
      </Text>
      <Text
        style={[
          styles.titleText,
          { color: colors.text, textAlign: textRTLStyle },
        ]}
      >
        {t('login.loginNow')}
      </Text>

      <Input
        placeholder={t('login.usernameOrEmail')}
        value={form.email}
        onChangeText={(value) => {
          onChange({ name: 'email', value });
        }}
        error={errors.email}
      />
      <Input
        placeholder={t('authComman.password')}
        value={form.password}
        error={errors.password}
        onChangeText={(value) => {
          onChange({ name: 'password', value });
        }}
        hidePassword
      />
      <Text
        onPress={goToForgotPassword}
        style={styles.forgotPwdtextview}
      >
        {t('authComman.forgotPassword')} ?
      </Text>

      <View style={styles.blankView}></View>

      <Button
        text={t('authComman.signIn')}
        style={styles.buttonStyle}
        fontSize={fontSizes.FONT22}
        onPress={goToHome}
      />

      <View style={[styles.createNewMainView, { flexDirection: viewRTLStyle }]}>
        <Text style={styles.createNewText}>{t('login.ifNew')}</Text>
        <Text
          onPress={goToRegistration}
          style={[
            styles.createNewText,
            styles.createNewUnderlineText,
            { color: colors.subText },
          ]}
        >
          {t('login.createNow')}
        </Text>
      </View>
    </View>
  );
};

export default InputComponent;
