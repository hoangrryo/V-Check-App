import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Button } from '@react-native-material/core';

export default function QRCodeScaner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // const handleBarCodeScanned = ({ type, data }) => {
  //   setScanned(true);
  //   setData(data);
  // };

  // const handleScanAgain = () => {
  //   setScanned(false);
  //   setData('');
  // };

  if (hasPermission === null) {
    return <Text>Đang yêu cầu quyền truy cập máy ảnh...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Quyền truy cập máy ảnh bị từ chối!</Text>;
  }

  return <>
    <Camera
      ratio='4:3'
      style={{ height: '100%', width: '100%' }}
      // onBarCodeScanned={handleBarCodeScanned}
    />
  </>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  data: {
    fontSize: 16,
    marginBottom: 20,
  },
});
