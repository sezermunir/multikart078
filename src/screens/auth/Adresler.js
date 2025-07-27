import React from 'react';
import { SafeAreaView, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';


const screenHeight = Dimensions.get('window').height;

const Adresler = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Adresler</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: 'https://www.silifkesepeti.com/account?view=alternative#recover' }}
        startInLoadingState={true}
        style={{ height: screenHeight * 0.7 }}
      />
    </SafeAreaView>
  );
};

export default Adresler;

const styles = {
  header: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
};
