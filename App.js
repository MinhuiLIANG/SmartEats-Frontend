import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import ChatPage from './Pages/ChatPage';
import EndPage from './Pages/EndPageSM';
import IntroPage from './Pages/IntroPagebl';
import QualiPage from './Pages/QualiPage';
import InfoPage from './Pages/infoPagebl';
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
        <Stack.Screen name="SmartEats-Chat" component={ChatPage} />
        <Stack.Screen name="SmartEats-Feedback" component={EndPage} />
        <Stack.Screen name="SmartEats-Finish" component={IDPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}