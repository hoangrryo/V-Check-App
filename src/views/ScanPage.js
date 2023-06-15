import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import { Button } from "@react-native-material/core";
import { MaterialIcons } from '@expo/vector-icons';
// import QRCodeScaner from './QRCodeScaner';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default ScanPage = ({ navigation }) => {

    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState(null);

    const windowWidth = Dimensions.get('window').width

    const QRCodeScaner = () => {
        return <>
            <Camera
                ratio='4:3'
                style={{ height: '100%', width: '100%' }}
                onBarCodeScanned={
                    ({ type, data }) => {
                        setData(data);
                        setScanned(false)
                        if (data != null) {
                            navigation.navigate('PhotoPage')
                        }
                    }}
            />
        </>
    }

    const handleCheckIn = () => {
        setData(null)
        setScanned(!scanned)
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: 300, marginTop: 30 }}>
                {scanned ? <QRCodeScaner /> : <MaterialIcons name="qr-code-scanner" size={200} color="#0794B5" />}
            </View>

            {/* THÔNG TIN XE VÀ TÀI XẾ */}
            {data === null ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>Vui lòng quét mã QR!</Text>
                </View> :
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{data}</Text>
                    <Text style={{ fontSize:20, fontStyle: 'italic', color: 'red' }}>Đây không phải xe của bạn!</Text>
                </View>
            }

            {/* CHỨC NĂNG CHECK IN & CHECK OUT */}
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row', width: '85%', }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#0794B5', width: windowWidth*0.4, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, shadowColor: 'black', elevation: 5 }}
                    activeOpacity={0.7}
                    onPress={handleCheckIn}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>CHECK IN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#0794B5', width:  windowWidth*0.4, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, shadowColor: 'black', elevation: 5 }}
                    activeOpacity={0.7}
                    onPress={handleCheckIn}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>CHECK OUT</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
