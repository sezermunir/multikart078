import React, {useContext} from 'react';
import { SafeAreaView, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import {CommonContext, useValues} from '@App'; 

const screenHeight = Dimensions.get('window').height;


const OrderHistoryWebView = ({ navigation }) => {
  const commonContext = useContext(CommonContext);
  const { customerToken } = useValues();
  const webUrl =  customerToken
  ? `https://www.silifkesepeti.com/account?customer_access_token=${customerToken}`
  : 'https://www.silifkesepeti.com/account';

  console.log('webUrl', webUrl);
  /**'https://rxj4xi-xa.myshopify.com/account?view=alternative' */

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sipariş Geçmişi</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView
        source={{ uri: webUrl }}
        startInLoadingState={true}
        style={{ height: screenHeight * 0.7 }}
      />
    </SafeAreaView>
  );
};

export default OrderHistoryWebView;

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
