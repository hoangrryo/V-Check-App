import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, IconButton, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import Language from "../MultiLanguage/Language";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

export default function LoginPage({ navigation }) {
  const [userLogin, setUserLogin] = useState({
    Username: "",
    Password: "",
  });

  let [showPassword, setShowPassword] = useState(false);
  let [lang, setLang] = useState(Language.vi);

  let response = {
    status: 200,
    data: {
      Data: {
        active: true,
        Department_ID: "taixe",
        EMPL_ID: "a30b6e8a-0696-425c-913d-4aed56013be1",
        Full_Name: "Tài Văn Xế",
        Image: null,
        National_ID: null,
        Phone: "1234567890",
        Position_ID: null,
        Username: "1234567890",
        Working_Station: null,
        roles: ["driver"],
        carList: ["99C1 - 6789", "99C1 - 55555", "99C1 - 12341"],
      },
    },
  };

  const handleLogin = () => {
    // if (userLogin.Username.length === 0) {
    //   Alert.alert("Vui lòng nhập Tên đăng nhập.");
    // } else if (userLogin.Password.length === 0) {
    //   Alert.alert("Vui lòng nhập Mật khẩu.");
    // } else {

      
    // }

    // Mô phỏng API Login thành công
    

    // Mô phỏng API Login thành công
   
    if (response.status === 200) {
      AsyncStorage.setItem("UserInfo", JSON.stringify(response.data.Data));
      navigation.reset({
        index: 0,
        routes: [{ name: "CarSelection" }],
      });
    } else {
      Alert.alert("Lỗi", response.data.Error, [{ text: "ok", onPress: () => {} }]);
    }
    navigation.navigate("CarSelection")
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <StatusBar style="auto" />
        <View
          style={{
            flex: 6,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../images/VCheck.png")}
            style={{
              resizeMode: "contain",
              height: 100,
              width: 230,
              marginBottom: 70,
            }}
          />
          <TextInput
            variant="outlined"
            placeholder={lang.username}
            style={{ width: "90%", textAlign: "center", marginBottom: 20 }}
            value={userLogin.Username}
            onChangeText={(e) => {
              setUserLogin((prevState) => ({
                ...prevState,
                Username: e,
              }));
            }}
            leading={(props) => (
              <IconButton
                icon={(props) => (
                  <FontAwesome5
                    style={{ fontSize: 18 }}
                    name="user-alt"
                    size={24}
                    color="black"
                  />
                )}
                {...props}
              />
            )}
          />
          <TextInput
            variant="outlined"
            placeholder={lang.password}
            style={{ width: "90%", textAlign: "center" }}
            inputContainerStyle={{ textAlign: "center" }}
            value={userLogin.Password}
            onChangeText={(e) => {
              setUserLogin((prevState) => ({
                ...prevState,
                Password: e,
              }));
            }}
            leading={(props) => (
              <IconButton
                icon={(props) => (
                  <Icon
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                    style={{ color: "black" }}
                    name={showPassword ? "eye-off" : "eye"}
                    {...props}
                  />
                )}
                {...props}
              />
            )}
            secureTextEntry={showPassword ? false : true}
          />

          <View
            style={{
              flexDirection: "row",
              width: "85%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <TouchableOpacity>
              <Text>{lang.fotget_password}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setLang(Language.vi)}>
                <Image
                  source={require("../images/vietnam.png")}
                  style={{
                    resizeMode: "contain",
                    height: 50,
                    width: 60,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLang(Language.en)}>
                <Image
                  source={require("../images/USA.png")}
                  style={{ resizeMode: "contain", height: 50, width: 60 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <Button
            title={lang.login_button}
            style={{
              marginTop: 30,
              width: "90%",
              paddingVertical: 3,
              borderRadius: 50,
            }}
            tintColor="white"
            color="#0794B5"
            uppercase={true}
            onPress={handleLogin}
            // onPress={() => navigation.navigate("DetailPage")}
          >
            Đăng nhập
          </Button>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
