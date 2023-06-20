import React, { useState, useEffect, useRef, useContext, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Entypo } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Button } from '@react-native-material/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Appcontext } from '../Context/AppContext';

export default PhotoView = ({ navigation }) => {

    // const { photoList, setPhotoList, setIsPhotoList } = useContext(Appcontext)

    const [isPhoto, setIsPhoto] = useState(false)
    const [photo, setPhoto] = useState(null)

    const cameraRef = useRef()

    const takePic = async () => {
          if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            setIsPhoto(true);
            setPhoto(uri);
      }}

    const savePic = () => {
          setPhotoList([...photoList,photo]);
          setIsPhotoList(true);
          navigation.navigate('PhotoPage');
      }

    const unSavePic = () => {
        return (
            setIsPhoto(false)
        )
    }

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            {console.log('photoList:', photoList)}
            <StatusBar style="light" />
            {
                !isPhoto ?
                    <View style={{ flex: 1 }}>
                        <Camera style={{ flex: 4 }} ratio='16:9' ref={cameraRef} />
                    </View>
                    :
                    <Image
                        source={{ uri: photo }}
                        style={{ resizeMode: 'stretch', flex: 4, width: '100%' }}
                    />
            }
            <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-evenly', alignItems: 'center', position: 'absolute', bottom: 60 }}>
                <TouchableOpacity
                    style={{ height: 70, width: 70, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}
                    onPress={unSavePic}
                >
                    <Ionicons name="close" size={50} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ height: 80, width: 80, borderRadius: 50, borderWidth: 3, borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.3)' }}
                    onPress={takePic}
                >
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ height: 70, width: 70, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}
                    onPress={savePic}
                >
                    <Ionicons name="checkmark-sharp" size={50} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}