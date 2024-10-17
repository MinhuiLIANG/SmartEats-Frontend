import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomePage from './Pages/HomePage';
import CusPage from './Pages/CusPage';
import ChatPage from './Pages/ChatPage';
import EndPage from './Pages/EndPage';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Cus" component={CusPage} />
        <Stack.Screen name="Chat" component={ChatPage} />
        <Stack.Screen name="End" component={EndPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}