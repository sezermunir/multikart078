// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [customerToken, setCustomerToken] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [customerId, setCustomerId] = useState('');

  return (
    <AuthContext.Provider value={{ customerToken, setCustomerToken, userName, setUserName, userEmail, setUserEmail, customerId, setCustomerId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
