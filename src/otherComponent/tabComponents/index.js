import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { windowHeight } from '@theme/appConstant';
import styles from './styles';
import appColors from '@theme/appColors';
import { useTheme } from '@react-navigation/native';
import { useValues } from '@App';
import { ActiveHome } from '../../assets/icons/activeHome';
import { Home, Category, Cart, Profile, Wishlist } from '@utils/icons';

export default function TabComponents(props) {
  const { state, descriptors, navigation } = props;  // props içinden gerekli değerleri aldık
  const { colors } = useTheme();
  const { viewRTLStyle } = useValues();

  return (
    <View
      style={[
        styles.mainView,
        { flexDirection: viewRTLStyle, backgroundColor: colors.card },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const icon = options.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          props.navigation.navigate(route.name);  // navigation props üzerinden erişildi
        };

        // Belirli indexlerdeki öğeleri gizleme
        if ([5, 6, 7, 8, 9, 10].includes(index)) {
          return null;
        }

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={1}
            onPress={onPress}
            style={styles.button}
          >
            <View
              style={{
                marginTop: windowHeight(4),
              }}
            >
              {icon({
                tintColor: isFocused ? appColors.primary : colors.text,
              })}
            </View>
            <Text
              style={[
                styles.label,
                { color: isFocused ? appColors.primary : colors.text },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
