import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, StyleSheet } from 'react-native';
import {Header, Divider} from '@commonComponents';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import SearchBar from '@commonComponents/searchBar';
import OpenOrders from './openOrders';
import PastOrders from './pastOrders';
import {BottomDialogModal, CommonModal} from '@otherComponent';
import OrderFilterModal from '@otherComponent/orderFilterModal';
import OrderReviewModal from '@otherComponent/orderReviewModal';
import {CommonContext} from '@App'; 
import styles from './styles';

export default function OrderHistory({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {
    customerToken, 
    token, 
    storeUrl
  } = useContext(CommonContext);

  const [pastOrders, setPastOrders] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (customerToken && token && storeUrl) {
      fetchCustomerOrders();
    }
  }, [customerToken, token, storeUrl]);


  console.log('customerToken:', customerToken);
  console.log('token:', token);
  console.log('storeUrl:', storeUrl);
  

  const fetchCustomerOrders = async () => {
    try {
      const response = await fetch(
        `${storeUrl}admin/api/2024-01/orders.json`,
        {
          method: 'GET',
          headers: {
            'X-Shopify-Access-Token': token,
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      const customerOrders = result.orders.filter(
        order => order.customer && order.customer.id === customerToken
      );
      setPastOrders(customerOrders);
    } catch (error) {
      console.error('Error fetching past orders:', error);
    }
  };

  const visibleModal = () => {
    setShowModal(!showModal);
  };

  const onFilterPress = () => {
    setShowOrderModal(!showOrderModal);
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        text={('Geçmiş Siparişler')}
        navigation={navigation}
        textStyle={styles.textStyle}
      />
      <Divider />
      <ScrollView style={style.scrollView}>
        <OpenOrders t={t} colors={colors} navigation={navigation} />
        
      
      </ScrollView>
      <CommonModal
        modal={
          <OrderReviewModal t={t} setShowModal={setShowModal} colors={colors} />
        }
        showModal={showModal}
        visibleModal={visibleModal}
        onPress={visibleModal}
      />
      <BottomDialogModal
        modal={
          <OrderFilterModal
            onPress={showOrderModal}
            navigation={navigation}
            t={t}
            setShowOrderModal={setShowOrderModal}
            colors={colors}
          />
        }
        showModal={showOrderModal}
        visibleModal={() => setShowOrderModal(!showOrderModal)}
      />
    </View>
  );
}

const style = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Arka plan rengi burada ayarlanıyor
  }
});
