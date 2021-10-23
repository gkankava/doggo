import React from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import { Filter } from "react-native-iconly";

const FilterBtn = ({ bs }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => bs.current.snapTo(1)}
    >
      <Filter set="bold" primaryColor="#3CBF77" />
    </TouchableOpacity>
  );
};

export default FilterBtn;

const sh = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  container: {
    minHeight: 45,
    height: sh * 0.069,
    width: sh * 0.069,
    minWidth: 45,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6FBF6",
    borderRadius: 15,
  },
});
