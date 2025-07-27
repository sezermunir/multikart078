import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Drawer from './drawerNavigator';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Drawer"
    >
      <Stack.Screen name="Drawer" component={Drawer} />
    </Stack.Navigator>
  );
};

export default MyStack;
