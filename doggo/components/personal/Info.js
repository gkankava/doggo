import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { userProvider } from "../../store/auth";

import Menu from "./Menu";

import img from "../../assets/images/default.jpeg";

const Info = () => {
  const { currentUser } = userProvider();
  return (
    <View style={styles.container}>
      <View style={styles.userPanel}>
        <Image source={img} style={styles.img} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{currentUser.user.name}</Text>
          <Text style={styles.sub}>{currentUser.user.email}</Text>
        </View>
      </View>
      <Menu />
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userPanel: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: { width: 73, height: 73, borderRadius: 20 },
  infoContainer: { marginLeft: 20 },
  name: { marginBottom: 5, fontSize: 22, fontWeight: "600", color: "#4B5E71" },
  sub: { fontSize: 14, fontWeight: "500", color: "#A5AEB8" },
});
