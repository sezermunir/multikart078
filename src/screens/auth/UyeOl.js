import React from 'react';
import { SafeAreaView, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import CookieManager from '@react-native-cookies/cookies';

const screenHeight = Dimensions.get('window').height;

const saveCookies = async () => {
  const cookies = await CookieManager.get('https://www.silifkesepeti.com');
  await AsyncStorage.setItem('userCookies', JSON.stringify(cookies));
};

const loadCookies = async () => {
  const storedCookies = await AsyncStorage.getItem('userCookies');
  if (storedCookies) {
    const cookies = JSON.parse(storedCookies);
    for (const [key, value] of Object.entries(cookies)) {
      await CookieManager.set('https://www.silifkesepeti.com', { name: key, value: value.value, domain: value.domain, path: value.path });
    }
  }
};

const UyeOl = ({ navigation }) => {
  useEffect(() => {
    loadCookies();
  }, []);
  return ( 
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Yeni Üyelik</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: 'https://www.silifkesepeti.com/account/register?view=alternative' }}
        startInLoadingState={true}
        style={{ height: screenHeight * 0.7 }}
        sharedCookiesEnabled={true} // Cookieleri paylaşmayı aktif hale getiriyoruz
        onLoadEnd={saveCookies}
      />
    </SafeAreaView>
  );
};

export default UyeOl;

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
