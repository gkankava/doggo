import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const BtnOut = ({ title = "", ico, callback, st }) => {
  return (
    <TouchableOpacity onPress={callback} style={[styles.container, st]}>
      {ico}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BtnOut;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "48%",
    minHeight: 45,
    height: sh * 0.069,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#D9F2E4",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 15, color: "#46596C", fontWeight: "600", marginLeft: 10 },
});
