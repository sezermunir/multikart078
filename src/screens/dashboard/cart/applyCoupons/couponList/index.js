import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Clipboard, Alert } from 'react-native';
import styles from './styles';
import { Divider} from '@commonComponents';
import { useValues } from '@App';
import { windowWidth } from '@theme/appConstant';
import Copy from '@assets/images/paymentIcon/copy.png';

export default function CouponList({ t, colors, coupons }) {
  const { viewRTLStyle, textRTLStyle } = useValues();

  const copyToClipboard = (code) => {
    Clipboard.setString(code);
    Alert.alert('Kupon Kopyalandı', `"${code}" kodu panoya kopyalandı.`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={coupons}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.mainContainer}>
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: 180, borderRadius: 8 }}
              resizeMode="cover"
            />
            <Text style={[styles.name, { color: colors.text, marginTop: 10 }]}>
              {item.description}
            </Text>
            <View style={[styles.codeRow, { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }]}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>
                {item.code}
              </Text>
              <TouchableOpacity
                onPress={() => copyToClipboard(item.code)}
                style={{ marginLeft: 10 }}
              >
                <Image source={Copy} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
            <Divider />
          </View>
          
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, color: colors.subText }}>
            Aktif kupon bulunamadı.
          </Text>
        }
      />
    </View>
  );
}
