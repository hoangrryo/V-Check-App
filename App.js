import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import PaperProvider from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, IconButton, Button } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer, TabRouter } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/views/LoginPage';
import DetailPage from './src/views/DetailPage';
import QRCodeScanner from './src/views/QRCodeScaner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import PhotoPage from './src/views/PhotoPage';
import PhotoView from './src/views/PhotoView';
import { AppProvider } from './src/Context/AppContext';

const Stack = createNativeStackNavigator();
export default function App() {

  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  const handleLogin = () => {
    axios({
      url: 'https://cpvdev.cp.com.vn/api_vcheck/api/users/login',
      method: 'POST',
      data: {
        Username: username,
        Password: password
      }
    })
      .then((res) => {
        navigation.navigate('DetailPage')
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    AsyncStorage.getItem('Username').then(res => setUsername(res))
    AsyncStorage.getItem('Password').then(res => setPassword(res))
    handleLogin()
  }, [])

  return (
    <AppProvider>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='LoginPage' options={{ headerShown: false }} component={LoginPage} />
            <Stack.Screen name='DetailPage' options={{ headerShown: false }} component={DetailPage} />
            <Stack.Screen name='QRScanner' options={{ headerShown: false }} component={QRCodeScanner} />
            <Stack.Screen name='PhotoPage' options={{ headerShown: false }} component={PhotoPage} />
            <Stack.Screen name='PhotoView' options={{ headerShown: false }} component={PhotoView} />
          </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
