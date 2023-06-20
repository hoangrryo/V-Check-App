import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import Card from "../../components/Card";
import { AppContext } from "../../Context/AppContext";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";

export default function CarSelection({ navigation }) {
  const {  fontCustom, user, handleLogout, handleChooseLicense_plates } = useContext(AppContext);
  const [carList, setCarList] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);

  const a = ["99C1 - 6789", "99C1 - 55555", "99C1 - 12341"];

  useEffect(() => {
    loadDataTheFirst();
    // (async () => {
    //   const { status } = await Camera.requestCameraPermissionsAsync();
    //   setHasPermission(status === "granted");
    // })();
  }, []);

  const loadDataTheFirst = () => {
    setCarList(user?.carList || []);
  };

  const takePhoto = async () => {
    if (hasPermission) {
      const camera = await Camera.getAvailableCameraTypesAsync();
      const { uri } = await camera[0].takePictureAsync();
      // setPhoto(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={{ fontSize: fontCustom.h1_size }}>
          Hãy chọn xe di chuyển
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#ccc",
            width: 100,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={async () => {
            await handleLogout();
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>xóa</Text>
        </TouchableOpacity>
      </View>
      {a.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            // navigation.navigate("DetailPage", { item })
            handleChooseLicense_plates(item);
            navigation.navigate("DetailPage");
            
          }}
        >
          <Card text={item} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
