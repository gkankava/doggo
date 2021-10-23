import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { userProvider } from "../../../store/user";

import HeaderCloseButton from "../header/HeaderCloseButton";

const Header = ({ setModalVisible }) => {
  const { currentUser } = userProvider();
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../../../assets/images/default.jpeg")}
      />
      <View style={styles.g}>
        <Text style={styles.h1}>გამარჯობა</Text>
        <Text style={styles.h2}>
          {currentUser.user.name.substr(0, currentUser.user.name.indexOf(" "))}!
        </Text>
      </View>
      <HeaderCloseButton setIsActive={setModalVisible} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    height: 80,
  },
  img: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 18,
  },
  g: {
    marginRight: "auto",
    marginLeft: 20,

    height: "100%",
  },
  h1: {
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 10,
  },
  h2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3CBF77",
  },
});
