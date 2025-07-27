import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { useValues } from '@App';
import { windowHeight } from '@theme/appConstant';

export function Button(props) {
  const { t } = useTranslation();
  const { viewSelfRTLStyle } = useValues();
  const { loading = false } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      disabled={loading} // Buton yüklenirken tıklanamaz hale gelir
      style={[
        props.style,
        styles.button,
        {
          alignSelf: viewSelfRTLStyle,
          marginTop: props.marginTop ? props.marginTop : windowHeight(10),
          opacity: loading ? 0.6 : 1, // Yüklenirken biraz soluk görünür
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.buttonText, { fontSize: props.fontSize }]}>
          {t(props.text)}
        </Text>
      )}
    </TouchableOpacity>
  );
}
