import React, { useState, useEffect, useRef } from "react"
import { Pressable, ScrollView } from "react-native"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";

export default TripCard = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const slideDown = useRef(new Animated.Value(0)).current;
  const cardDetailHeight = slideDown.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 160],
  });

  useEffect(() => {
    Animated.timing(slideDown, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [slideDown, isOpen]);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Pressable style={styles.cardItem} onPress={handlePress}>
      <ScrollView>
        <Animated.View style={{ width: "100%", height: cardDetailHeight }}>
          <View style={styles.cardOverView}>
            <View>
              <Text>{item.header1}</Text>
              <Text>{item.content1}</Text>
            </View>
            <View>
              <Text>----------></Text>
            </View>
            <View>
              <Text>{item.header2}</Text>
              <Text>{item.content2}</Text>
            </View>
            <View>
              <Text>----------></Text>
            </View>
            <View>
              <Text>{item.header3}</Text>
              <Text>{item.content3}</Text>
            </View>
          </View>
          <View style={[styles.cardDetail, styles.center]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("Alert")}
            >
              <Text>Show Alert</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    flex: 1,
    marginVertical: 10,
  },
  cardOverView: {
    width: "100%",
    height: 60,
    backgroundColor: "#ccc",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  cardDetail: {
    width: "100%",
    height: 100,
    backgroundColor: "red",
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
