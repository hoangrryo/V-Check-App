import React, { useEffect, useState, useContext } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileUser from "./ProfileUser";
import HomePage from "./HomePage";
import ScanPage from "./ScanPage";
import NotificationPage from "./NotificationPage";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AppContext } from "../Context/AppContext";

const Tab = createMaterialTopTabNavigator();

export default function DetailPage() {
  const { config, fontCustom } = useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarLabelStyle: {
          fontSize: fontCustom.p1_size,
          fontWeight: "bold",
          textAlign: "center",
          alignItems: "center",
          width: "100%"
        },
        tabBarItemStyle: {
        },
        tabBarStyle: {
          backgroundColor: config.colorSetting,
          height: 70, // Thay đổi chiều cao
        },
        tabBarActiveTintColor: "white", // Custom color for active label
        tabBarInactiveTintColor: config.color2, // Custom color for inactive label
      })}
      style={{ marginTop: 30 }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="home"
                size={25}
                color={focused ? "white" : config.color2}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scan Car"
        component={ScanPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MaterialIcons
                name="qr-code-scanner"
                size={25}
                color={focused ? "white" : config.color2}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={NotificationPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="notifications"
                size={25}
                color={focused ? "white" : config.color2}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileUser}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="user"
                size={25}
                color={focused ? "white" : config.color2}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
