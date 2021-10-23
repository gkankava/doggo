import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Logout } from "react-native-iconly";
import { userProvider } from "../../../store/user";

const StatusBar = () => {
  const { logOut } = userProvider();
  return (
    <TouchableOpacity
      onPress={logOut}
      style={{
        marginLeft: 20,
        alignSelf: "flex-start",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Logout set={"bold"} color={"#3CBF77"} size={24} />
      <Text
        style={{
          color: "#3CBF77",
          fontSize: 20,
          fontWeight: "600",
          marginLeft: 10,
        }}
      >
        გასვლა
      </Text>
    </TouchableOpacity>
  );
};

export default StatusBar;

const styles = StyleSheet.create({});
