import React from 'react'
import { View, Text, SafeAreaView, Dimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileUser from './ProfileUser'
import HomePage from './Home/HomePage'
import ScanPage from './ScanPage'
import NotificationPage from './NotificationPage'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIndicator } from 'react-native-tab-view'

export default function DetailPage() {

    const Tab = createMaterialTopTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#0794B5',
                    paddingTop:60,
                },
                tabBarShowLabel: true,
                tabBarLabelStyle:{
                    fontSize:13,
                    width:100,
                    fontWeight:'bold',
                    flex:1,
                },
                tabBarIconStyle:{
                    marginTop:40,
                    width:'100%',
                    alignItems:'center',
                    flex:1,
                    justifyContent:'center',
                }
            }}
        >
            <Tab.Screen
                name='ScanPage'
                component={ScanPage}
                options={{
                    tabBarIcon: ({ focused }) => <MaterialIcons name="qr-code-scanner" size={35} color={focused ? 'white' : 'black'} style={{ height: 60, width: 60, verticalAlign:'middle', textAlign:'center'}} />,
                }}
            />
            <Tab.Screen
                name='Home'
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused }) => <Ionicons name="home" size={35} color={focused ? 'white' : 'black'} style={{ height: 60, width: 60, verticalAlign:'middle', textAlign:'center' }} />
                }}
            />
            <Tab.Screen
                name='Notification'
                component={NotificationPage}
                options={{
                    tabBarIcon: ({ focused }) => <Ionicons name="notifications" size={35} color={focused ? 'white' : 'black'} style={{ height: 60, width: 60, verticalAlign:'middle', textAlign:'center' }} />
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileUser}
                options={{
                    tabBarIcon: ({ focused }) => <FontAwesome name="user" size={35} color={focused ? 'white' : 'black'} style={{ height: 60, width: 60, verticalAlign:'middle', textAlign:'center' }} />
                }}
            />
        </Tab.Navigator>
    )
}