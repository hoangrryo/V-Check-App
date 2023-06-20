import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chooseLicense_plates, setLicense_plates ] = useState(null);
  const [fontCustom] = useState({
    h1_size: 24,
    h2_size: 22,
    h3_size: 18,
    h4_size: 16,
    p1_size: 14,
    p2_size: 12
  });

  const [config] = useState({
    colorSetting: "#0794b5",
    colorDefault:"#3a3a3a",
    color1: "#8ecae6",
    color2: "#023047",
    color3: "#ffb703",
    color4: "#fb8500"
});

  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    try {
      let userStorage = await AsyncStorage.getItem("UserInfo");

      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("UserInfo");
  };

  const handleChooseLicense_plates = (item) =>{
    setLicense_plates(item);
  }


  return (
    <AppContext.Provider
      value={{
        // userData,
        user,
        fontCustom,
        chooseLicense_plates,
        config,

        handleChooseLicense_plates,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
