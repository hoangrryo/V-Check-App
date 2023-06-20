import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera, BarCodeScanner } from "expo-camera";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import { carViewApi } from "../services/Car";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default ScanPage = ({ navigation }) => {
  const { config, fontCustom } = useContext(AppContext);
  const [openCamera, setOpenCamera] = useState(false);
  const [data, setData] = useState(null);

  const [dataViewCar, setDataViewCar] = useState(null);

  const windowWidth = Dimensions.get("window").width;

  useFocusEffect(
    React.useCallback(() => {
      // Reset các giá trị state về mặc định ở đây
      setOpenCamera(false);
      setData(null);
      setDataViewCar(null);

      return () => {
        // Hủy các tác vụ nếu cần thiết khi rời khỏi màn hình
      };
    }, [])
  );

    useEffect(()=>{

    },[dataViewCar])

  const QRCodeScaner = () => {
    const [cameraPermission, setCameraPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef(null);

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === "granted");
      })();
    }, []);

    const handlePress = () => {
      setCameraType(
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    };

    const handleBarcodeOpenCamera = ({ data }) => {
      if (!scanned) {
        // Hiển thị thông báo
        Alert.alert(
          "Thông báo",
          "Dữ liệu: " + data,
          [
            {
              text: "OK",
              onPress: () => {
                setScanned(false);
                let token =
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjFmZjlkNGUwLTdiMzItNGQ2Yy1hNjcxLTI2N2U2M2MzMmM4ZiIsInJvbGUiOlsiYWRtaW4iLCJmYXJtIiwibWFuYWdlIiwidmV0IiwicGFraW5nIiwic2F0X3RydW5nIiwiZHJpdmVyIl0sIm5iZiI6MTY4NzIyNDI4MSwiZXhwIjoxNjg3MzEwNjgxLCJpYXQiOjE2ODcyMjQyODEsImlzcyI6Im1lYW5IdW5kZXYiLCJhdWQiOiJodHRwczovL21lYW5IdW4ubWUifQ.9-ctic1pUpJQ3TIe9gedStlEwpFiUkKCRFdHlDwSlsI";
                carViewApi(data, token, (res) => {

                  if (res.status === 200) {
                    setDataViewCar(res.data.Data);
                  } else if (res.status === 401) {
                    Alert.alert("Thông báo", "Đã hết phiên đăng nhập, vui lòng Đăng nhập lại");
                    navigation.navigate("Login");
                  } else {
                    Alert.alert("Thông báo", "Lỗi QR không phù hợp.");
                  }
                });
              },
            },
          ],
          { cancelable: false }
        );

        // Đánh dấu đã quét
        setScanned(true);
      }
    };
    return (
      <View style={{ flex: 1 }}>
        {cameraPermission ? (
          <View style={{ width: 200, height: 200 }}>
            <Camera
              style={{ flex: 1 }}
              type={cameraType}
              ref={cameraRef}
              onBarCodeScanned={handleBarcodeOpenCamera}
            ></Camera>
          </View>
        ) : (
          <Text>No access to camera</Text>
        )}
        <TouchableOpacity onPress={handlePress}>
          <Feather
            style={{ textAlign: "right", marginTop: 5 }}
            name="rotate-ccw"
            size={24}
            color={config.color2}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleCheckIn = () => {
    setOpenCamera(!openCamera);
  };

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <View
          style={{
            width: 200,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {openCamera ? (
            <QRCodeScaner />
          ) : (
            <MaterialIcons
              name="qr-code-scanner"
              size={200}
              color={config.colorSetting}
            />
          )}
        </View>
      </View>

      <View style={{ marginTop: "5%", marginLeft: "2%" }}>
        <TouchableOpacity
          style={{
            backgroundColor: config.color2,
            width: windowWidth * 0.3,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            shadowColor: "black",
            elevation: 5,
          }}
          activeOpacity={0.7}
          onPress={handleCheckIn}
        >
          <Text
            style={{
              color: "white",
              fontSize: fontCustom.h4_size,
              fontWeight: "bold",
            }}
          >
            {openCamera ? "Tắt Camera" : "Bật Camera"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", padding: "5%" }}>
        <View style={{ flex: 30 }}>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>Biển số xe</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: config.color3,
              elevation: 4,
              shadowColor: config.color2,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>Chủ xe</Text>
          </View>

          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>Loại xe</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: config.color3,
              elevation: 4,
              shadowColor: config.color2,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>Tài xế</Text>
          </View>

          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>Số điện thoại</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: config.color3,
              elevation: 4,
              shadowColor: config.color2,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>Phụ xe</Text>
          </View>

          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>Số điện thoại</Text>
          </View>
        </View>
        <View style={{ flex: 70, marginLeft: "2%" }}>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>
            {dataViewCar && dataViewCar.License_Plate ? dataViewCar.License_Plate : ""}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: config.color3,
              elevation: 4,
              shadowColor: config.color2,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>
              {dataViewCar && dataViewCar.Owner ? dataViewCar.Owner : ""}
            </Text>
          </View>

          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>
              {dataViewCar && dataViewCar.Truck_Type_Name
                ? dataViewCar.Truck_Type_Name
                : ""}{" "}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: config.color3,
              elevation: 4,
              shadowColor: config.color2,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>
              {dataViewCar && dataViewCar.Full_Name1
                ? dataViewCar.Full_Name1
                : ""}
            </Text>
          </View>

          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>
              {dataViewCar && dataViewCar.phone1 ? dataViewCar.phone1 : ""}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: config.color3,
              elevation: 4,
              shadowColor: config.color2,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>
              {dataViewCar && dataViewCar.Full_Name2
                ? dataViewCar.Full_Name2
                : ""}
            </Text>
          </View>

          <View
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              elevation: 4,
              shadowColor: config.color4,
              shadowOpacity: 0.3,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              marginBottom: 5,
              paddingLeft: "2%",
            }}
          >
            <Text style={{ fontSize: fontCustom.h4_size }}>
              {dataViewCar && dataViewCar.phone2 ? dataViewCar.phone2 : ""}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
