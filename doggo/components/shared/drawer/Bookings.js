import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Bookings = () => {
  return (
    <View style={styles.container}>
      <Text>bookings</Text>
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
