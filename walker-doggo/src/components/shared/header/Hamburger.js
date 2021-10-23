import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { appStateProvider } from "../../../store/appState";

const Hamburger = () => {
  const { toogleDrawer, setDrawerIsActive } = appStateProvider();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        toogleDrawer();
      }}
    >
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
    </TouchableOpacity>
  );
};

export default Hamburger;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    height: 24,
  },
});
