import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Hamburger = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: 16,
          height: 2,
          backgroundColor: "#43BE79",
          borderRadius: 20,
        }}
      />
      <View
        style={{
          width: 11.25,
          height: 2,
          backgroundColor: "#43BE79",
          borderRadius: 20,
        }}
      />
      <View
        style={{
          width: 16,
          height: 2,
          backgroundColor: "#43BE79",
          borderRadius: 20,
        }}
      />
    </View>
  );
};

export default Hamburger;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    height: 24,
  },
});
