import React from "react";
import { StyleSheet, View } from "react-native";

const BsHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.handle} />
    </View>
  );
};

export default BsHeader;

const styles = StyleSheet.create({
  header: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handle: {
    width: 56,
    height: 5,
    backgroundColor: "#A0DEBB",
    borderRadius: 3,
  },
});
