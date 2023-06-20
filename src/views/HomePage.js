import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AppContext } from '../Context/AppContext';

export default function HomePage() {
  const { chooseLicense_plates } = useContext(AppContext);

  if (chooseLicense_plates === undefined) {
    // Xử lý trường hợp chooseLicensePlates là undefined
    return null; // Hoặc hiển thị một phần tử tải dữ liệu, thông báo lỗi, hoặc điều gì đó tương tự
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Page</Text>
      <Text>Giá trị license_plates: {chooseLicense_plates}</Text>
    </View>
  );
}
