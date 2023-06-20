import React, { useEffect } from "react";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/views/LoginPage";
import DetailPage from "./src/views/DetailPage";
import QRCodeScanner from "./src/views/QRCodeScaner";
import PhotoPage from "./src/views/PhotoPage";
import PhotoView from "./src/views/PhotoView";
import { AppProvider } from "./src/Context/AppContext";
import CarSelection from "./src/views/screen_car_selection/CarSelection";

const Stack = createNativeStackNavigator();
export default function App() {
  useEffect(() => {}, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
              title: "",
              backgroundColor: "transparent",
              border: "none",
              height: 0,

              // header:()=>(
              // 	<HeaderApp type={1} title={'Đăng Nhập'}></HeaderApp>
              // )
            }}
            component={LoginPage}
          />
          <Stack.Screen
            name="CarSelection"
            options={{
              headerShown: false,
              title: "",
              backgroundColor: "transparent",
              border: "none",
              height: 0,
            }}
            component={CarSelection}
          />
          <Stack.Screen
            name="DetailPage"
            options={{
              headerShown: false,
              title: "",
              backgroundColor: "transparent",
              border: "none",
              height: 0,
            }}
            component={DetailPage}
          />
          <Stack.Screen
            name="QRScanner"
            options={{
              headerShown: false,
              title: "",
              backgroundColor: "transparent",
              border: "none",
              height: 0,
            }}
            component={QRCodeScanner}
          />
          <Stack.Screen
            name="PhotoPage"
            options={{
              headerShown: false,
              title: "",
              backgroundColor: "transparent",
              border: "none",
              height: 0,
            }}
            component={PhotoPage}
          />
          <Stack.Screen
            name="PhotoView"
            options={{
              headerShown: false,
              title: "",
              backgroundColor: "transparent",
              border: "none",
              height: 0,
            }}
            component={PhotoView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
