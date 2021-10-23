import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ArrowRight } from "react-native-iconly";

const PageBtn = ({ scrollNext }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={scrollNext}
    >
      <ArrowRight set="bold" primaryColor="white" size={28} />
    </TouchableOpacity>
  );
};

export default PageBtn;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3CBF77",
    height: 64,
    width: 64,
    borderRadius: 32,
  },
});
