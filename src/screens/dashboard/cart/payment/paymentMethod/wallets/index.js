import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Wallets({ t, colors, onCodSelected }) {
  const [selectedCod, setSelectedCod] = useState(false);

  useEffect(() => {
    if (selectedCod && onCodSelected) {
      onCodSelected('cod'); // COD seçildiğinde parent'a bildir
    }
  }, [selectedCod]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSelectedCod(!selectedCod)}
        style={{ padding: 10, backgroundColor: selectedCod ? '#ddd' : '#fff', borderRadius: 6 }}>
        <Text style={{ color: colors.text }}>
          {selectedCod ? '✓ ' : ''}Kapıda Ödeme ile siparişinizi oluşturun.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
