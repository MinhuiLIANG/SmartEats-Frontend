import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import CusPage from './Pages/CusPage';
import ChatPage from './Pages/ChatPage';
import EndPage from './Pages/EndPage';
import IntroPage from './Pages/IntroPage';
import QualiPage from './Pages/QualiPage';
import InfoPage from './Pages/InfoPage';
import IDPage from './Pages/IDPage';
import TestPage from './Pages/TestPage';
import AvaPage from './Pages/AvaPage';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}> 
        <Stack.Screen name="SmartEats-login" component={TestPage} />
        <Stack.Screen name="SmartEats-Introduction" component={IntroPage} />
        <Stack.Screen name="SmartEats-ScreeningQuestion" component={QualiPage} />
        <Stack.Screen name="SmartEats-UserProfile" component={InfoPage} />
        <Stack.Screen name="SmartEats-ChatbotCustomization" component={CusPage} />
        <Stack.Screen name="SmartEats-ChatbotAvatar" component={AvaPage} />
        <Stack.Screen name="SmartEats-Chat" component={ChatPage} />
        <Stack.Screen name="SmartEats-Feedback" component={EndPage} />
        <Stack.Screen name="SmartEats-Finish" component={IDPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}