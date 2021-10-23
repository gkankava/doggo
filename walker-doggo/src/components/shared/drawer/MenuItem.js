import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import * as RootNavigation from "../../../RootNavigation";

const MenuItem = ({ uuid, title, icon, setModalVisible }) => {
  let r = RootNavigation.getRoute();
  let color = r.name === uuid ? "white" : "#46596C";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: r.name === uuid ? "#3CBF77" : "white",
        },
      ]}
      onPress={() => {
        setModalVisible(false);
        RootNavigation.navigate(uuid);
      }}
    >
      {icon(color)}
      <Text style={[styles.title, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.069,
    borderRadius: 18,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 20,
  },
});
