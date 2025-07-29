import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NextScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bu, bir sonraki ekran!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NextScreen;
