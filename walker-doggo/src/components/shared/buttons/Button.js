import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const Button = ({ title = "", disabled, st = {}, ...rest }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, st, disabled && { backgroundColor: "#E2E2E2" }]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 45,
    height: sh * 0.069,
    borderRadius: 18,
    backgroundColor: "#3CBF77",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 18, color: "white", fontWeight: "700" },
});
