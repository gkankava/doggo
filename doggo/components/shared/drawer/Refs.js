import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Refs = () => {
  return (
    <View style={styles.container}>
      <Text>refs</Text>
    </View>
  );
};

export default Refs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
});
