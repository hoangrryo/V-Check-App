import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert, Touchable, Dimensions, KeyboardAvoidingView } from 'react-native';
import PaperProvider from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, IconButton, Button } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Language from '../MultiLanguage/Language';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

export default function LoginPage({ navigation }) {

    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')
    let [userInfo, setUserInfo] = useState({})
    let [showPassword, setShowPassword] = useState(false)
    let [lang, setLang] = useState(Language.vi)
    let window = Dimensions.get('window')
    let screen = Dimensions.get('screen')

    const handleLogin = () => {
        if (username.length === 0) {
            Alert.alert('Vui lòng nhập Username!')
        }
        else if (password.length === 0) {
            Alert.alert('Vui lòng nhập Password!')
        }
        else {
            axios({
                url: 'https://cpvdev.cp.com.vn/api_vcheck/api/users/login',
                method: 'POST',
                data: {
                    Username: username,
                    Password: password
                }
            })
                .then((res) => {
                    console.log('data:', res.data.Data)
                    setUserInfo(res.data.Data)
                    navigation.navigate('DetailPage')
                    AsyncStorage.setItem('UserInfo', JSON.stringify(res.data.Data))
                    AsyncStorage.setItem('UserName', username)
                    AsyncStorage.setItem('Password', password)
                })
                .catch((err) => {
                    Alert.alert(err.response.data.Error)
                })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <StatusBar style="auto" />
                <View style={{ flex: 6, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../images/VCheck.png')}
                        style={{ resizeMode: 'contain', height: 100, width: 230, marginBottom: 70 }}
                    />
                    <TextInput
                        variant='outlined'
                        placeholder={lang.username}
                        style={{ width: '90%', textAlign: 'center', marginBottom: 20 }}
                        value={username}
                        onChangeText={(input_text) => setUsername(input_text)}
                        leading={props => (
                            <IconButton icon={props => <FontAwesome5 style={{ fontSize: 18 }} name="user-alt" size={24} color="black" />} {...props} />
                        )}
                    />
                    <TextInput
                        variant="outlined"
                        placeholder={lang.password}
                        style={{ width: '90%', textAlign: 'center' }}
                        inputContainerStyle={{ textAlign: 'center' }}
                        value={password}
                        onChangeText={(input_text) => setPassword(input_text)}
                        leading={props => (
                            <IconButton icon={props => <Icon onPress={() => { setShowPassword(!showPassword) }} style={{ color: 'black' }} name={showPassword ? 'eye-off' : 'eye'} {...props} />} {...props} />
                        )}
                        secureTextEntry={showPassword ? false : true}
                    />

                    <View style={{ flexDirection: 'row', width: '85%', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                        <TouchableOpacity>
                            <Text>{lang.fotget_password}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => setLang(Language.vi)}>
                                <Image
                                    source={require('../images/vietnam.png')}
                                    style={{ resizeMode: 'contain', height: 50, width: 60, marginRight: 10 }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setLang(Language.en)}>
                                <Image
                                    source={require('../images/USA.png')}
                                    style={{ resizeMode: 'contain', height: 50, width: 60, }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                    <Button
                        title={lang.login_button}
                        style={{ marginTop: 30, width: '90%', paddingVertical: 3, borderRadius: 50 }}
                        tintColor="white"
                        color='#0794B5'
                        uppercase={true}
                        // onPress={handleLogin}
                        onPress={() => navigation.navigate('DetailPage')}
                    >
                        Đăng nhập
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
