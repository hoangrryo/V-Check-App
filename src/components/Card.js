import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ text }) => {
  return (
    <View style={styles.card}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default Card;
