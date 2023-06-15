import { View, TouchableOpacity, Text, Image, Dimensions, Modal, TouchableOpacityBase, Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useContext, useRef, useState } from 'react';
import { Appcontext } from '../Context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper'

export default PhotoPage = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [isPhoto, setIsPhoto] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [photoKey, setPhotoKey] = useState(1)
    const [hasPermission, setHasPermission] = useState(null);
    const [photoList, setPhotoList] = useState({ photo1: '', photo2: '', photo3: '', photo4: '', photo5: '' })

    const cameraRef = useRef()

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePic = async () => {
        if (cameraRef.current) {
            const { uri } = await cameraRef.current.takePictureAsync();
            setIsPhoto(true);
            setPhoto(uri);
        }
    }

    const savePic = () => {
        let temp = { ...photoList }
        if (photoKey === 1) {
            temp.photo1 = photo
            setIsPhoto(false)
            setModalVisible(false)
            setPhotoList(temp)
        }
        else if (photoKey === 2) {
            temp.photo2 = photo
            setPhotoList(temp)
            setIsPhoto(false)
            setModalVisible(false)
        }
        else if (photoKey === 3) {
            temp.photo3 = photo
            setPhotoList(temp)
            setIsPhoto(false)
            setModalVisible(false)
        }
        else if (photoKey === 4) {
            temp.photo4 = photo
            setPhotoList(temp)
            setIsPhoto(false)
            setModalVisible(false)
        }
        else if (photoKey === 5) {
            temp.photo5 = photo
            setPhotoList(temp)
            setIsPhoto(false)
            setModalVisible(false)
        }
    }

    const unSavePic = () => {
        return (
            setIsPhoto(false)
        )
    }

    const deletePic = () => {
        let temp = { ...photoList }
        if (photoKey === 1) {
            temp.photo1 = ''
            setPhotoList(temp)
        }
        else if (photoKey === 2) {
            temp.photo2 = ''
            setPhotoList(temp)
        }
        else if (photoKey === 3) {
            temp.photo3 = ''
            setPhotoList(temp)
        }
        else if (photoKey === 4) {
            temp.photo4 = ''
            setPhotoList(temp)
        }
        else if (photoKey === 5) {
            temp.photo5 = ''
            setPhotoList(temp)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>

            {/* MODAL HIỂN THỊ GIAO DIỆN CHỤP ẢNH */}
            <Modal style={{ flex: 1, height: '100%', width: '100%' }} transparent={false} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={{ flex: 1, position: 'relative' }}>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 50, left: 20, zIndex: 2 }}
                        onPress={() => setModalVisible(false)}
                    >
                        <Entypo name="arrow-left" size={40} color="white" />
                    </TouchableOpacity>
                    <StatusBar style="light" />

                    {/* NẾU BIẾN PHOTO KHÔNG CÓ GÌ THÌ HIỂN THỊ GIAO DIỆN CHỤP ẢNH, NẾU CÓ THÌ HIỂN THỊ ẢNH */}
                    {
                        !isPhoto ?
                            <View style={{ flex: 1 }}>
                                <Camera style={{ flex: 4 }} ratio='16:9' ref={cameraRef} />
                            </View>
                            :
                            <View style={{ flex: 1 }}>
                                <Image
                                    source={{ uri: photo }}
                                    style={{ resizeMode: 'stretch', flex: 4, width: '100%' }}
                                />
                            </View>
                    }

                    {/* 3 NÚT XÓA, CHỤP, LƯU */}
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-evenly', alignItems: 'center', position: 'absolute', bottom: 60 }}>
                        <TouchableOpacity
                            style={{ height: 70, width: 70, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}
                            onPress={unSavePic}
                        >
                            <Ionicons name="close" size={50} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 3, borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.3)' }}
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
            </Modal>


            {/* PHOTOPAGE HEADER */}
            <TouchableOpacity
                style={{ position: 'absolute', top: 90, left: 20, zIndex: 2 }}
                onPress={() => navigation.navigate('DetailPage')}
            >
                <Entypo name="arrow-left" size={40} color="black" />
            </TouchableOpacity>
            <View style={{ height: 150, backgroundColor: '#0794B5', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 70 }}>
                    UPLOAD PHOTO
                </Text>
            </View>


            {/* CHỤP ẢNH XE */}
            <View style={{ flex: 4, justifyContent: 'space-between', width: '95%', alignItems: 'center' }}>

                {/* SLIDE ẢNH */}
                <Swiper
                    style={{ marginTop: 20 }}
                    loop={false}
                    activeDot={
                        <View style={{
                            width: 15,
                            height: 15,
                            backgroundColor: 'red',
                            borderRadius: 50,
                        }}>

                        </View>
                    }
                >
                    {/* HIỂN THỊ ẢNH 1 */}
                    <Pressable
                        style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { return (setModalVisible(true), setPhotoKey(1)) }}
                    >
                        {
                            photoList.photo1 != '' ?
                                <Image
                                    source={{ uri: photoList.photo1 }}
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                />
                                :
                                <Entypo name="camera" size={50} color="black" />
                        }

                        {/* NÚT XÓA ẢNH 1 */}
                        <Pressable
                            style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 100, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 10, right: 40 }}
                            onPress={() => { setPhotoKey(1), deletePic() }}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </Pressable>
                    </Pressable>


                    {/* HIỂN THỊ ẢNH 2 */}
                    <Pressable
                        style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { return (setModalVisible(true), setPhotoKey(2)) }}
                    >
                        {
                            photoList.photo2 != '' ?
                                <Image
                                    source={{ uri: photoList.photo2 }}
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                />
                                :
                                <Entypo name="camera" size={50} color="black" />
                        }

                        {/* NÚT XÓA ẢNH 2 */}
                        <Pressable
                            style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 100, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 10, right: 40 }}
                            onPress={() => { setPhotoKey(2), deletePic() }}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </Pressable>
                    </Pressable>


                    {/* HIỂN THỊ ẢNH 3 */}
                    <Pressable
                        style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { return (setModalVisible(true), setPhotoKey(3)) }}
                    >
                        {
                            photoList.photo3 != '' ?
                                <Image
                                    source={{ uri: photoList.photo3 }}
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                />
                                :
                                <Entypo name="camera" size={50} color="black" />
                        }

                        {/* NÚT XÓA ẢNH 3 */}
                        <Pressable
                            style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 100, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 10, right: 40 }}
                            onPress={() => { setPhotoKey(3), deletePic() }}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </Pressable>
                    </Pressable>


                    {/* HIỂN THỊ ẢNH 4 */}
                    <Pressable
                        style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { return (setModalVisible(true), setPhotoKey(4)) }}
                    >
                        {
                            photoList.photo4 != '' ?
                                <Image
                                    source={{ uri: photoList.photo4 }}
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                />
                                :
                                <Entypo name="camera" size={50} color="black" />
                        }

                        {/* NÚT XÓA ẢNH 4 */}
                        <Pressable
                            style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 100, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 10, right: 40 }}
                            onPress={() => { setPhotoKey(4), deletePic() }}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </Pressable>
                    </Pressable>


                    {/* HIỂN THỊ ẢNH 5 */}
                    <Pressable
                        style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => { return (setModalVisible(true), setPhotoKey(5)) }}
                    >
                        {
                            photoList.photo5 != '' ?
                                <Image
                                    source={{ uri: photoList.photo5 }}
                                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                                />
                                :
                                <Entypo name="camera" size={50} color="black" />
                        }

                        {/* NÚT XÓA ẢNH 5 */}
                        <Pressable
                            style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 100, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 10, right: 40 }}
                            onPress={() => { setPhotoKey(5), deletePic() }}
                        >
                            <Ionicons name="close" size={30} color="white" />
                        </Pressable>
                    </Pressable>

                </Swiper>
            </View>
            

            {/* NÚT CHECK IN -> ĐIỀU HƯỚNG VỀ TRANG SCAN_PAGE, LOGIC CHƯA VIẾT */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '85%' }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#0794B5', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, shadowColor: 'black', elevation: 5 }}
                    activeOpacity={0.7}
                    onPress={() => {
                        setPhotoList({ photo1: '', photo2: '', photo3: '', photo4: '', photo5: '' })
                        navigation.navigate('DetailPage')
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>CHECK IN</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
