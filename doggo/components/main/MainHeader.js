import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Notification } from "react-native-iconly";
import Hamburger from "./Hamburger";

import logo from "../../assets/images/logo/dg-logo.png";

const MainHeader = ({ state, toogle }) => {
  return (
    <View style={styles.bg}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => toogle(!state)}>
            <Hamburger />
          </TouchableOpacity>
          <Image source={logo} style={{ width: 76, height: 21 }} />
          <TouchableOpacity>
            <Notification set="bold" primaryColor="#43BE79" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainHeader;

const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  bg: {
    height: height * 0.12,
    backgroundColor: "#80B918",
    zIndex: 20,
  },
  container: {
    backgroundColor: "white",
    justifyContent: "flex-end",
    width: "100%",
    borderBottomLeftRadius: 45,
    height: "100%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
    paddingHorizontal: 30,
  },
});
