import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Alert, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { t } from 'i18next';
import styles from './styles';
import { useValues } from '@App';

export default function logOut(props) {
  const { navigation } = props;
  const { colors } = useTheme();
  const { shopifyUrl, frontToken, customerToken } = useValues();

  // Kullanıcı bilgileri için state
  const [userEmail, setUserEmail] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  // Shopify'dan Kullanıcı Bilgilerini Getir
  const fetchUserProfile = async () => {
    try {
      const query = `
        query {
          customer(customerAccessToken: "${customerToken}") {
            id
            email
            firstName
            lastName
          }
        }
      `;

      const response = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': frontToken,
        },
        body: JSON.stringify({ query }),
      });

      const userData = await response.json();
      //console.log("fetchUserProfile:", userData.data);

      if (userData.data?.customer?.id) {
        setUserEmail(userData.data.customer.email);
        setCustomerId(userData.data.customer.id);
      } else {
        throw new Error("Müşteri bilgisi alınamadı.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Bileşen açıldığında kullanıcı bilgilerini getir
  }, []);

  const onLogoutBtn = async () => {
   
    try {
      const query = `
        mutation customerAccessTokenDelete {
          customerAccessTokenDelete(customerAccessToken: "${customerToken}") {
            deletedAccessToken
            userErrors {
              field
              message
            }
          }
        }
      `;

      const response = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': frontToken,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log('Logout API Response:', data);

      if (!data.data || !data.data.customerAccessTokenDelete) {
        throw new Error('Oturum kapatma işlemi başarısız oldu.');
      }

      Alert.alert(t('Üye Çıkışı Yapıldı'));
      navigation.navigate('HomeStackScreen');
    } catch (error) {
      console.error('Error during logout:', error.message);
      Alert.alert(t('profile.logoutFailed'), error.message);
    }
  };

  const deleteAccount = async () => {
    Alert.alert(
      "Hesabınızı Silmek İstediğinizden Emin Misiniz?",
      "Bu işlem geri alınamaz!",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Evet, Sil",
          onPress: async () => {
            try {
              if (!customerId) {
                throw new Error("Müşteri ID bulunamadı.");
              }

              const deleteUserQuery = `
                mutation {
                  customerDelete(input: { id: "${customerId}" }) {
                    deletedCustomerId
                    userErrors {
                      field
                      message
                    }
                  }
                }
              `;

              const deleteResponse = await fetch(storeUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Shopify-Storefront-Access-Token': frontToken,
                },
                body: JSON.stringify({ query: deleteUserQuery }),
              });

              const deleteData = await deleteResponse.json();
              console.log("Delete Account Response:", deleteData);

              if (
                deleteData.data?.customerDelete?.userErrors &&
                deleteData.data.customerDelete.userErrors.length > 0
              ) {
                throw new Error(deleteData.data.customerDelete.userErrors[0].message);
              }

              Alert.alert("Hesabınız Başarıyla Silindi");
              navigation.navigate("HomeStackScreen");
            } catch (error) {
              console.error("Error during account deletion:", error.message);
              Alert.alert("Hata", error.message || "Hesap silme işlemi sırasında bir hata oluştu.");
            }
          }
        }
      ]
    );
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onLogoutBtn}
          style={[
            styles.btnContainer,
            { backgroundColor: colors.background, borderColor: colors.text },
          ]}
        >
          <Text style={[styles.btnText, { color: colors.text }]}>
            {t('profile.logOut')}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={deleteAccount}
          style={[
            styles.btnContainer,
            { backgroundColor: 'red', borderColor: colors.text },
          ]}
        >
          <Text style={[styles.btnText, { color: 'white' }]}>
            Üyeliğimi Sil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
