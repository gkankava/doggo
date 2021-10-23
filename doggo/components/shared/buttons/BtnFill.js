import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const BtnFill = ({ title = "", callback, st, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={callback}
      style={[styles.container, st, disabled && { backgroundColor: "#E2E2E2" }]}
    >
      {disabled ? (
        <ActivityIndicator size="small" color="#3CBF77" />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BtnFill;

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
